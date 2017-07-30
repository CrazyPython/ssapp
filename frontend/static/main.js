setInterval(function () {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      JSON.parse(xhttp.responseText)['orders']
    }
  }
  xhttp.open("GET", "http://stockstream-data.s3-website-us-west-2.amazonaws.com/portfolio", true)
  xhttp.send()
}, 1000)

$(function () {
  setTimeout(function () {
    $("#tbl2").tablesorter(
      {
        widgets: ['stickyHeaders'],
        widgetOptions: {
          stickyHeaders: 'sticky',
          stickyHeaders_offset: 0,
          stickyHeaders_cloneId: '-sticky',
          stickyHeaders_zIndex: 2,
          stickyHeaders_attachTo: null,
          stickyHeaders_xScroll: null,
          stickyHeaders_yScroll: null,
          stickyHeaders_filteredToTop: true
        }
      })
  }, 1000)
})

alertify.parent(document.body)
if (localStorage.wikiNotificationShown === null) {
  setTimeout(function () {
    alertify.log('There\'s more than just SSApp. Check out <a href="wiki.stockstream.live/">the StockStream wiki</a>.')
    localStorage.wikiNotificationShown = true
  }, 20000)
}

export default {
  data() {
    return {
      assets: null,
      quotes: null,
      transactionHistory: null,
      connected: false,
      cashTotal: 0,
      portfolioTotal: 0,
      referralTotal: 0,
      minChangePercent: 0,
      maxChangePercent: 0,
      diversity: 0,
      marketOpen: true,
      tradesRemaining: 0,
      totalTrades: 78,
      trollStocks: ['SEB', 'CAKE', 'GF', 'DOG'],
      symbolToAsset: {},
      daysBack: 60,
      roi: 0,
    }
  },
  methods: {
    assetChangePercentToColor(asset) {
      if (asset.averageCost <= 0) {
        return "#ffffff"
      } else if (asset.change < 0) {
        return `hsl(1,70%,${100 - 35 * asset.changePercent / this.minChangePercent}%)`
      } else {
        return `hsl(151,69.2%,${96.8 - Math.min(25 * (asset.changePercent), 50)}%)`
      }
    },
    formatChange(change) {
      if (change === null) {
        return "------"
      } else if (change < 0) {
        return `-$${Math.abs(change).toFixed(2)}`
      } else {
        return `+$${change.toFixed(2)}`
      }
    },
    formatChangePercent(change) {
      if (change === null) {
        return "------"
      } else if (change < 0) {
        return `-${Math.abs(change).toFixed(2)}%`
      } else {
        return `+${change.toFixed(2)}%`
      }
    },
    formatFinanceLink(symbol) {
      return `https://www.google.com/finance?q=${symbol}`
    },

    formatTipRanksLink(symbol) {
      return `https://www.tipranks.com/stocks/${symbol}/`
    },
    formatPercent(percent) {
      if (percent === null) {
        return "------"
      } else {
        return `${percent.toFixed(2)}%`
      }
    },
    formatPrice(price) {
      if (price === null) {
        return "------"
      } else {
        return `$${price.toFixed(2)}`
      }
    },
    formatPricePadding(price) {
      function pad(n, width, z) {
        z = z || "0"
        n = n + ""
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
      }

      if (price === null) {
        return "------"
      } else { // dirtyhack
        return `$${pad(price.toFixed(2), 8, "\xa0")}`
      }
    },
    formatPricePadding2(price) {
      function pad(n, width, z) {
        z = z || "0"
        n = n + ""
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
      }

      if (price === null) {
        return "------"
      } else { // dirtyhack
        return `$${pad(price.toFixed(2), 7, "\xa0")}`
      }
    },
    formatPricePadding3(price) {
      function pad(n, width, z) {
        z = z || "0"
        n = n + ""
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
      }

      if (price === null) {
        return "------"
      } else { // dirtyhack
        return pad(price.toFixed(2), 5, "\xa0") + "%"
      }
    },
    portfolioToBG: function (asset) {
      if (asset.percentPortfolio > 1 && !this.isRainbow(asset)) {
        return `#009688`
      }
    }, portfolioPercentToTextColor: function (percent) {
      if (percent > 1 && percent <= 5) {
        return `white`
      }
    },
    portfolioIsRainbow: function (percent) {
      if (percent > 6 && percent !== undefined) {
        return true
      }
    },
    isBlacklist: function (asset) {
      if (asset.paidTotal === 0 || asset.currentCost < 10) {
        return true
      }
    },
    isRainbow: function (asset) {
      if (asset.percentPortfolio > 5) {
        return true
      }
    },
    isPurplelist: function (asset) {
      if (asset.percentPortfolio > 1 && !this.isRainbow(asset) && !this.isTrollStock(asset)) {
        return true
      }
    },
    formatSymbol(symbol) {
      return symbol
    },
    padSymbol(symbol) {
      return "\xa0".repeat(6 - symbol.length)
    },
    formatType(type) {
      if (type.toUpperCase() === 'BUY') {
        return "BUY\xa0"
      } else {
        return type
      }
    },
    isTrollStock(asset) {
      return this.trollStocks.includes(asset.symbol.toUpperCase())
    }
    , iFrameMouseOver(event) {
      var stock = event.target.getAttribute('data-symbol')
      var toset = 'https://crazypython.github.io/stckstrm-static/chart3.html?stock=' + event.target.getAttribute('data-symbol') + '&daysback=' + this.daysBack.toString()

      var ele = document.getElementsByClassName("tooltip-hidden")[0]
      ele.style.height = "30vh"

      ele.style.display = "block"
      ele.style.bottom = 0
      ele.style.right = 0
      ele.style.position = "fixed"
      //ele.children[0].contentWindow.postMessage(stock, "https://crazypython.github.io/stckstrm-static/chart.html")


      if (ele.children[0].getAttribute('src') !== toset) {
        ele.children[0].setAttribute('src', toset)
      }
    }, iFrameMouseOut(event) {
      var ele = document.getElementsByClassName("tooltip-hidden")[0]
      ele.style.display = "none"
    }, aM(event) {
      var toset = 'https://grafana.avertly.co/dashboard-solo/db/ssapp-embed-2?orgId=2&panelId=1&from=now-14d&to=now'
      var ele = document.getElementById("abb")

      ele.style.height = "40vh"
      ele.style.display = "block"
      ele.style.top = "100%"
      ele.style.left = 0
      ele.style.position = "absolute"

      if (ele.getAttribute('src') !== toset) {
        ele.setAttribute('src', toset)
      }
    }, iFrameMouseOut2(event) {
      var ele = document.getElementById("abb")
      ele.style.display = "none"
    }
  },
  socket: {
    events: {
      connect() {
        console.log("Connected")
        this.connected = true
      },
      disconnect() {
        alertify.error("Connection to server lost.")
        this.connected = false
      },
      assets(msg) {
        this.cashTotal = msg.cashTotal
        this.diversity = 0
        this.portfolioTotal = msg.portfolioTotal
        this.referralTotal = 500
        this.assets = msg.assets
        this.roi = 1 - ((this.portfolioTotal + this.cashTotal - this.referralTotal - 50000) / 50000)
        this.minChangePercent = 0
        this.maxChangePercent = 0
        this.totalProfit = 0
        this.symbolToAsset = {}
        msg.assets.forEach((asset) => {
            this.symbolToAsset[asset.symbol] = asset
            if (asset.totalChange > 0) {
              this.totalProfit += asset.totalChange
            }
            this.diversity += (asset.currentTotal / msg.portfolioTotal) ** 2
            this.isrothree = asset.shares < 3 && !this.isRainbow(asset) && !this.isTrollStock(asset)
            asset.isrothree = this.isrothree
            if (asset.averageCost > 0 && asset.changePercent < this.minChangePercent) {
              this.minChangePercent = asset.changePercent
            }
            if (asset.averageCost > 0 && asset.changePercent > this.maxChangePercent) {
              this.maxChangePercent = asset.changePercent
            }
          }
        )
      },
      quotes(msg) {
        this.quotes = msg.quotes
      },
      transactionHistory(msg) {
        console.log(this.transactionHistory)
        this.transactionHistory = msg.transactionHistory
      },
      marketStateUpdate(msg) {
        this.marketOpen = msg.marketOpen
        this.tradesRemaining = msg.tradesRemaining
      }
    }
  },
  options: {
    customSorting: {
      shares: function (ascending) {
        return function (a, b) {
          var lastA = a.name[a.name.length - 1].toLowerCase()
          var lastB = b.name[b.name.length - 1].toLowerCase()

          if (ascending)
            return lastA <= lastB ? 1 : -1

          return lastA >= lastB ? 1 : -1
        }
      }
    }
  }
}
