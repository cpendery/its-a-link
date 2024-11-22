window.addEventListener("_openlink", (e) => {
  chrome.runtime.sendMessage({
    type: "_openlink",
    target: e.detail.target,
    mode: e.detail.mode,
  });
});
