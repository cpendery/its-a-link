let recentAction = { ctrl: false, shift: false };

const RESET_ACTION_TIMEOUT = 300;
const URL_REFRESH_TIMEOUT = 100;

function setAction(ctrl, shift) {
  recentAction = { ctrl, shift };
}

function resetAction() {
  recentAction = { ctrl: false, shift: false };
}

function getAction() {
  return recentAction;
}

function patchAddEventListener() {
  var addEventListener = Element.prototype.addEventListener;
  Element.prototype.addEventListener = function (...args) {
    const [eventType] = args;
    if (eventType == "click") {
      addEventListener.call(this, "click", (e) => {
        setAction(e.ctrlKey, e.shiftKey);
        setTimeout(() => resetAction(), RESET_ACTION_TIMEOUT);
      });
    }
    return addEventListener.call(this, ...arguments);
  };
}

function patchHistoryPushState(history) {
  var pushState = history.pushState;
  history.pushState = function (_, _, url) {
    handleUrlChange(url);
    return pushState.apply(history, arguments);
  };
}

function openLink(target, newTab, newWindow) {
  if (target == null) return;
  if (newTab == false && newWindow == false) return;

  const mode = newTab ? "tab" : "window";
  window.dispatchEvent(
    new CustomEvent("_openlink", { detail: { target, mode } })
  );
}

function handleUrlChange(url) {
  const { ctrl, shift } = getAction();
  const currentTarget = window.location.href;
  const newTarget =
    url != null ? new URL(url, window.location.href).href : undefined;

  const emulateLink = ctrl || shift;
  if (emulateLink) {
    openLink(newTarget, ctrl, shift);
    setTimeout(
      () => (window.location.href = currentTarget),
      URL_REFRESH_TIMEOUT
    );
  }

  return false;
}

patchHistoryPushState(history);
patchAddEventListener();

window.addEventListener("keypress", () => resetAction());
window.addEventListener("popstate", ({ url }) => handleUrlChange(url));
