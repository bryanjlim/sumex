async function DOMtoString(document_root) {
    var checkExist = document_root.getElementsByClassName('summ')
    if(checkExist[0] != undefined){
        checkExist[0].remove()
        var checkPageButton = document.getElementById("summ");
        checkPageButton.innerHTML="Close"
    } else{
        var paragraphs = document_root.getElementsByTagName("p");
        if (typeof paragraphs != undefined) {
            var blob = ''
            for(var i = 0; i < paragraphs.length; i++)
            {
                blob = blob + paragraphs[i].innerHTML
            }
            console.log(blob)
            const res = await summarizer(blob)
            console.log(res)
            var div = document.createElement('div')
            div.classList.add('summ')
            var header = document.createElement("h1");
            header.classList.add('summHeader')
            var headnode = document.createTextNode("Here's a summarized version of this page!");
            header.appendChild(headnode);
            var p = document.createElement("p");
            var pnode = document.createTextNode(res)
            p.appendChild(pnode)
            var butClose = document.createElement("button")
            var bnode = document.createTextNode("x")
            console.log(document_root.getElementsByClassName("summ"))
            butClose.onclick = function(){document.getElementsByClassName("summ")[0].remove()}
            butClose.appendChild(bnode)
            div.appendChild(header)
            div.appendChild(p)
            div.appendChild(butClose)
            document_root.body.insertBefore(div, document_root.body.firstChild);
            return { found: true, val: paragraphs };
            
        } else{
            alert('oopsies no p tag')
        }

    }
    

}

async function summarizer(text) {
    // Default options are marked with *
    url = 'https://basic-text-summarizer.azurewebsites.net/api/basic_textrank_summarizer?code=vTb0P/llWsXcTiqclPcjR6PtN4wbOFMXtiZwUIaj0uUBTJX8i0WxYw=='
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: text
    });
    return response.text(); // parses JSON response into native JavaScript objects
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});


