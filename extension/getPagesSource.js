async function DOMtoString(document_root) {
    let tag = "p"
    // if (document.URL.toLowerCase().includes("mail.google.com")) {
    //     tag = "span"

    // } else{
    //     tag = "p"
    // }
    var checkExist = document_root.getElementsByClassName('summ')
    if (checkExist[0] != undefined) {
        checkExist[0].remove()
    }


    if (document.URL.includes("mail.google.com") && document.URL.includes("inbox/")) {
        var list = document.querySelectorAll('[role="listitem"]');
        if (list.length > 0) {
            let funcs = []
            for (var j = 0; j < list.length; j++) {
                const item = list[j];
                var pElements = item.getElementsByTagName("div")
                var str = ""
                if (pElements != undefined) {
                    for (var i = 0; i < pElements.length; i++) {
                        if (!pElements[i].id) {
                            str = str + pElements[i].innerHTML
                        }
                    }
                }
                funcs.push(summarizer(str))
            }
            let rets = Promise.all(funcs)
            let retStr = ""
            for (var i = 0; i < rets.length; i++) {
                retStr += rets[i];
                retStr += "\n" + "-------------------------------------------" + "\n"
            }
            return { found: true, val: retStr };
        }
    } else {
        var paragraphs = document_root.getElementsByTagName(tag);
        if (typeof paragraphs != undefined) {
            var blob = ''
            for (var i = 0; i < paragraphs.length; i++) {
                blob = blob + paragraphs[i].innerHTML
            }
            const res = await summarizer(blob)
            res0 = res.substr(0, 2);
            console.log(res0)
            if (res0 === "b'") {
                res1 = res.substr(2, res.length - 3)
            } else {
                res1 = res
            }
            res1 = res1.replaceAll('\\n', '')
            res1 = res1.replaceAll('\\', '')
            console.log(res1)
            var div = document.createElement('div')
            div.classList.add('summ')
            var header = document.createElement("h1");
            header.classList.add('summHeader')
            var headnode = document.createTextNode("Here's a summarized version of this page!");
            header.appendChild(headnode);
            var p = document.createElement("p");
            p.innerHTML = res1
            var butClose = document.createElement("button")
            var bnode = document.createTextNode("close")
            console.log(document_root.getElementsByClassName("summ"))
            butClose.onclick = function () { document.getElementsByClassName("summ")[0].remove() }
            butClose.appendChild(bnode)
            div.appendChild(header)
            div.appendChild(p)
            div.appendChild(butClose)
            document_root.body.insertBefore(div, document_root.body.firstChild);
            return { found: true, val: paragraphs };
        } else {
            alert('Error: No valid text found')
        }
    }
}



// luhn - https://basic-text-summarizer.azurewebsites.net/api/luhn_summarizer?code=bY17WaICfJUDfbqOWcM0lXcIU2BVWhjT0a1vs7PAqk6Zk11NJggm/A==
// basic - https://basic-text-summarizer.azurewebsites.net/api/basic_textrank_summarizer?code=vTb0P/llWsXcTiqclPcjR6PtN4wbOFMXtiZwUIaj0uUBTJX8i0WxYw==
// lsa - https://basic-text-summarizer.azurewebsites.net/api/lsa_summarizer?code=r/qBCL/Mpf85ZHLgF3htSaZC7IXNdhIUiRye79fILJ/qqoaIh6qQ8g==
// edmundson - https://basic-text-summarizer.azurewebsites.net/api/edmundson_summarizer?code=DiDWZbUFgtEl7SZ0jCPaKWI95JSJY72lIxv53vya7TEDzfHScLfjaw==
async function summarizer(text) {
    // Default options are marked with *
    url = 'https://basic-text-summarizer.azurewebsites.net/api/smart_text_rank_summarizer?code=tNJjuxJXeHz/TtJvXlQ3Vv5qfQC2ZAfwki/XshYwUPI5U4r1wnQIOA=='
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: text
    });
    return response.text(); // parses JSON response into native JavaScript objects
}

chrome.runtime.sendMessage({
    // action: "getSource",
    source: DOMtoString(document)
});
