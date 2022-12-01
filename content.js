function SendUrlToBackgroundPage() {
  console.log("hello from contetn.js")
    chrome.runtime.sendMessage({
        message: "fetch",
        url: window.location.href
      });
}
console.log("hello from contetn.js")

SendUrlToBackgroundPage();
