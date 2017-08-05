import ujson as json
import requests
from functools import wraps, update_wrapper
from typing import List, Dict, Union
from flask import Response, make_response, request, current_app
from datetime import timedelta


def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, str):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, str):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)

    return decorator


def ssfunc_gen(app):
    def ssfunc(path):
        def outer(func):
            @wraps(func)
            def inner(*args, **kwargs):
                return Response(json.encode(func(*args, **kwargs)), mimetype='application/json')

            return app.route(path)(crossdomain(origin="*")(inner))

        return outer

    return ssfunc


def get_json(request: requests.Response) -> Union[List, Dict, int, str]:
    try:
        return request.json()
    except json.decoder.JSONDecodeError:
        if request.content == b'[]':
            # special case
            return []
        else:
            raise


def estimate_worth(symbol: str):
    quote = get_json(requests.get("https://api.robinhood.com/quotes/{}/".format(symbol.upper())))
    if not quote['last_extended_hours_trade_price'] is None:
        return quote['last_extended_hours_trade_price']
    else:
        return quote['last_trade_price']


def fetch_orders(symbol: str) -> List[Dict]:
    return get_json(requests.get("http://api.stockstream.live/v1/orders/symbol/{}/".format(symbol.upper())))


def stock_stats_raw(ticker):
    orders = fetch_orders(ticker)
    balance, buys, sells, total_trades = 0, 0, 0, 0

    for order in orders:
        if order['state'] == 'filled':
            price = order['price']
            shares = int(order['quantity'])
            total_trades += 1

            if order['side'] == 'sell':
                balance += price * shares
                sells += shares
            elif order['side'] == 'buy':
                balance -= price * shares
                buys += shares
            else:
                raise ValueError()

    shares = buys - sells
    worth = shares * float(estimate_worth(ticker))
    net = balance + worth
    return {
        'total_trades': total_trades,
        'buys': buys,
        'sells': sells,
        'net': net,
    }
