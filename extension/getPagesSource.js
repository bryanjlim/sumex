function DOMtoString(document_root) {
    var paragraphs = document_root.getElementsByTagName("p");
    if (typeof paragraphs != undefined) {
    for(var i = 0; i < paragraphs.length; i++)
    {
        paragraphs[i].innerHTML = "Joe Mama" + i
        paragraphs[i].style.color = 'blue'
    }
    var header = document.createElement("p");
    var node = document.createTextNode("This is new.");
    header.appendChild(node);
    document_root.body.insertBefore(header, document_root.body.firstChild);
    return { found: true, val: paragraphs };
    }

}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});
