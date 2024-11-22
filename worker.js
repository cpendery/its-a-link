function openNewWindow(target) {
  chrome.windows.create({ url: target, state: "maximized" });
}

function openNewTab(target) {
  chrome.tabs.create({ url: target, active: false });
}

function openLink(mode, target) {
  switch (mode) {
    case "tab":
      openNewTab(target);
      break;
    case "window":
      openNewWindow(target);
      break;
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case "_openlink":
      openLink(request.mode, request.target);
      break;
  }
});
