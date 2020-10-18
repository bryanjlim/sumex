from __future__ import absolute_import
from __future__ import division, print_function, unicode_literals

from sumy.parsers.html import HtmlParser
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.luhn import LuhnSummarizer as Summarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words
from bs4 import BeautifulSoup

LANGUAGE = "english"
SENTENCES_COUNT = 1

if __name__ == "__main__":
    soup = BeautifulSoup('''Adding and Removing Nodes (HTML Elements)To add a new element to the HTML DOM, you must create the element (element node) first, and then append it to an existing element. This code creates a new <code class="w3-codespan">&lt;p&gt;</code> element:To add text to the <code class="w3-codespan">&lt;p&gt;</code> element, you must create a text node first. This code creates a text node:Then you must append the text node to the <code class="w3-codespan">&lt;p&gt;</code> element:Finally you must append the new element to an existing element.This code finds an existing element:This code appends the new element to the existing element:The <code class="w3-codespan">appendChild()</code> method in the previous example, appended the new element as the last child of the parent.If you don't want that you can use the <code class="w3-codespan">insertBefore()</code> method: To remove an HTML element, use the <code class="w3-codespan">remove()</code> method:The HTML document contains a <code class="w3-codespan">&lt;div&gt;</code> element with two child nodes (two <code class="w3-codespan">&lt;p&gt;</code> elements):Find the element you want to remove:Then execute the remove() method on that element:The <code class="w3-codespan">remove()</code> method does not work in 
older browsers, see the example below on how to use <code class="w3-codespan"> removeChild()</code> instead.For browsers that does not support the <code class="w3-codespan">remove()</code> method, you have to find the 
parent node to remove an element:This HTML document contains a <code class="w3-codespan">&lt;div&gt;</code> element with two child nodes (two <code class="w3-codespan">&lt;p&gt;</code> 
elements):Find the element with <code class="w3-codespan">id="div1"</code>:Find the <code class="w3-codespan">&lt;p&gt;</code> element with <code class="w3-codespan">id="p1"</code>:Remove the child from the parent:Here is a common workaround: Find the child you want to remove, and use its 
<code class="w3-codespan">parentNode</code> property to find the parent:To replace an element to the HTML DOM, use the <code class="w3-codespan">replaceChild()</code> method:If you want to report an error, or if you want to make a suggestion, do not hesitate to send us an e-mail:help@w3schools.comYour message has been sent to W3Schools.''', features="lxml")
    text = soup.get_text()
    print(text)
    parser = PlaintextParser.from_string(text, Tokenizer(LANGUAGE))
    stemmer = Stemmer(LANGUAGE)

    summarizer = Summarizer(stemmer)
    summarizer.stop_words = get_stop_words(LANGUAGE)

    for sentence in summarizer(parser.document, SENTENCES_COUNT):
        print(sentence)