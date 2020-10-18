
from __future__ import absolute_import
from __future__ import division, print_function, unicode_literals

import nltk
nltk.download('punkt', download_dir='.')

from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.text_rank import TextRankSummarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words

from bs4 import BeautifulSoup

import azure.functions as func
import logging
import re
import math


LANGUAGE = "english"


def main(req: func.HttpRequest) -> func.HttpResponse:
    ret = ""
    logging.info('Python HTTP trigger function processed a request.')
    text = str(req.get_body())

    soup = BeautifulSoup(text, features="lxml")
    souped = soup.get_text()

    SENTENCES_COUNT = int(math.log(souped.count('.'), 4))
    
    parser = PlaintextParser.from_string(souped, Tokenizer(LANGUAGE))
    stemmer = Stemmer(LANGUAGE)

    summarizer = TextRankSummarizer(stemmer)
    summarizer.stop_words = get_stop_words(LANGUAGE)

    for sentence in summarizer(parser.document, max(SENTENCES_COUNT, 2)):
        ret += str(sentence)
    
    return func.HttpResponse(re.sub(r'\\\w{3}','',ret))

