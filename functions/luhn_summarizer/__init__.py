import azure.functions as func
import os
from subprocess import Popen, PIPE

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    text = str(req.get_body())
    cmd = "sumy luhn --language=english --stopwords=stopwords.txt --text="+ "\""+text+"\""
    stdout = Popen(cmd, shell=True, stdout=PIPE).stdout
    ret = stdout.read().decode("utf-8")
    return func.HttpResponse(ret)

