
from __future__ import absolute_import
from __future__ import division, print_function, unicode_literals

from sumy.parsers.html import HtmlParser
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.edmundson import EdmundsonSummarizer as Summarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words

from bs4 import BeautifulSoup

import azure.functions as func
import logging
import nltk
nltk.download('punkt', download_dir='')

LANGUAGE = "english"

ret = ""

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    text = str(req.get_body())

    soup = BeautifulSoup(text, features="lxml")
    souped = soup.get_text()

    SENTENCES_COUNT = math.log2(souped.count('.'))
    
    parser = PlaintextParser.from_string(souped, Tokenizer(LANGUAGE))
    stemmer = Stemmer(LANGUAGE)

    summarizer = Summarizer(stemmer)
    summarizer.stop_words = get_stop_words(LANGUAGE)

    for sentence in summarizer(parser.document, SENTENCES_COUNT):
        ret+=str(sentence)
    
    return func.HttpResponse(ret)

