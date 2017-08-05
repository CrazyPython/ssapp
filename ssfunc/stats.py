from typing import List, Dict, Union
import sys
import requests


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
    return get_json(requests.get("http://api.stockstream.live/v1/orders/symbol/{}".format(symbol.upper())))


def stats(symbol):
    orders = fetch_orders(symbol)
    print(orders)
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
    worth = shares * float(estimate_worth(symbol))
    net = balance + worth
    return {
        'total_trades': total_trades,
        'buys': buys,
        'sells': sells,
        'net': net,
    }

stats(sys.argv[1])
