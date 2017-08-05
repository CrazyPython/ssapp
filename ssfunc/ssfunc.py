import collections
from .utils import *
import requests
from flask import Flask

app = Flask(__name__)
ssfunc = ssfunc_gen(app)
route = app.route


@ssfunc('/')
def index():
    return '** No function name provided.'


@ssfunc("/is-troll/<string:username>")
def is_troll(username):
    data = requests.get("http://api.stockstream.live/v1/votes/player/twitch:{}".format(username.lower())).json()
    # noinspection PyArgumentList
    stocks = collections.Counter(((i['parameter'], i['action']) for i in data))
    trollstocks = 'DOG', 'SEB', 'GF'
    return any(ticker in trollstocks and action == 'BUY' for (ticker, action), count in stocks.most_common(3))


@ssfunc('/stock-stats/<string:ticker>')
def stock_stats(ticker):
    return stock_stats_raw(ticker)


@ssfunc('/troll-loss')
def troll_loss():
    return stock_stats_raw('SEB')['net'] + stock_stats_raw('DOG')['net']
