document.addEventListener(
  "DOMContentLoaded",
  function() {
    var checkPageButton = document.getElementById("summ");
    checkPageButton.addEventListener(
      "click",
      function() {
        chrome.tabs.executeScript(
          null,
          {
            file: "getPagesSource.js"
          },
          function() {
            // If you try and inject into an extensions page or the webstore/NTP you'll get an error
            if (chrome.runtime.lastError) {
              message.innerText =
                "There was an error injecting script : \n" +
                chrome.runtime.lastError.message;
            }
          }
        );
      },
      false
    );
  },
  false
);

chrome.contextMenus.create({
  title: "Summarize with Sumex",
  contexts:["selection"],  // ContextType
  onclick: summarizer // A callback function
});



async function summarizer(word) {
  alert('TESTTESTTESTTES');
  // Default options are marked with *
  var query = word.selectionText;
  url = 'https://basic-text-summarizer.azurewebsites.net/api/basic_textrank_summarizer?code=vTb0P/llWsXcTiqclPcjR6PtN4wbOFMXtiZwUIaj0uUBTJX8i0WxYw=='
  const response = await fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      },
      body: query
  });
  alert(response.text()); // parses JSON response into native JavaScript objects
}
