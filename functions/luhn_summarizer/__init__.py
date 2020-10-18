
from __future__ import absolute_import
from __future__ import division, print_function, unicode_literals

import nltk
nltk.download('punkt', download_dir='')

from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.luhn import LuhnSummarizer as Summarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words

from bs4 import BeautifulSoup

import azure.functions as func
import logging


LANGUAGE = "english"
SENTENCES_COUNT = 1

def main(req: func.HttpRequest) -> func.HttpResponse:
    ret = ""
    logging.info('Python HTTP trigger function processed a request.')
    text = str(req.get_body())

    soup = BeautifulSoup(text, features="lxml")
    souped = soup.get_text()
    
    parser = PlaintextParser.from_string(souped, Tokenizer(LANGUAGE))
    stemmer = Stemmer(LANGUAGE)

    summarizer = Summarizer(stemmer)
    summarizer.stop_words = get_stop_words(LANGUAGE)

    for sentence in summarizer(parser.document, SENTENCES_COUNT):
        ret += str(sentence)
    
    return func.HttpResponse(ret)

