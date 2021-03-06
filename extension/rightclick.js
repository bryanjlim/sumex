async function summarizer(word) {
    // Default options are marked with *
    const query = word.selectionText;
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

    var str = (await response.text()).substring(1).replaceAll("\\", "")
    alert(str)
}

chrome.contextMenus.create({
    title: "Summarize with Sumex",
    contexts: ["selection"],  // ContextType
    onclick: summarizer // A callback function
});

