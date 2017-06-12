<template>
  <div class="container" id="container">
    <h3>StockStream Live (Alpha)</h3>
    <p>Alpha site for a live-updating view of <a href="https://www.twitch.tv/stockstream">StockStream</a>'s portfolio</p>
    <p>Historical data @ <a href="https://stockstream.abal.moe/data">https://stockstream.abal.moe/data</a></p>
    <p>Color legend @ <a href="https://ssapp.glitch.me/static/legend.html">https://ssapp.glitch.me/static/legend.html</a></p>
    <hr />
    
    <div v-if="!connected">
      <h4>Connecting...</h4>
    </div>
    <div class="row full-width">
      <div class="col text-center tr">
        <div>
          <h4>Trades Completed</h4>
        </div>
        <p class="trades-remaining">{{ (totalTrades-tradesRemaining) }} / {{ totalTrades }}</p>
      </div>
      <div v-if="marketOpen" class="col">
        <div>
          <h4 class="text-center">Transaction History</h4>
        </div>
        <div v-if="transactionHistory && transactionHistory.length > 0" class="card transactions">
          <p v-for="transaction in transactionHistory" style="text-align: center;">
            <span v-bind:data-symbol="transaction.symbol"                    v-on:mouseout="iFrameMouseOut"
  v-on:mouseover= "iFrameMouseOver" >
            <span v-text="formatType(transaction.type.toUpperCase())" 
                  v-bind:data-symbol="transaction.symbol"
                  v-bind:class="{ sellTransaction: transaction.type.toUpperCase() == 'SELL',
                                buyTransaction: transaction.type.toUpperCase() == 'BUY' }"></span> 
            <span v-bind:class="{ sellTransactionRight: transaction.type.toUpperCase() == 'SELL',
                          
                                buyTransactionRight: transaction.type.toUpperCase() == 'BUY' }"
                  v-bind:data-symbol="transaction.symbol">
            {{ padSymbol(transaction.symbol) }}
              <a v-bind:href="formatFinanceLink(transaction.symbol)" class="transactionsP"  v-bind:data-symbol="transaction.symbol" >{{ formatSymbol(transaction.symbol) }}</a><span v-bind:data-symbol="transaction.symbol"> @ {{ formatPricePadding2(transaction.price) }}</span>
  </span>
  </span>
          </p>
        </div>
        <div v-else class="card">
          <p>No data yet</p>
        </div>
      </div>
      <div v-else class="col text-center closed">
        <h3>Market Closed</h3>
      </div>
      <div class="col">
        <div>
          <h4 class="text-center">Portfolio Status</h4>
        </div>
        <div class="row">
          
          <div class="col value">
            <p class="compact">Stocks: <span class="pad">{{ formatPricePadding(portfolioTotal - referralTotal) }}</span></p>
                        <p class="compact">Cash: <span class="pad">{{ formatPricePadding(cashTotal) }}</span></p>

            <p class="compact">Referrals: <span class="pad">{{ formatPricePadding(referralTotal) }}</span></p>
          </div>
          <div class="col dollars">
                         <p class="compact">Total: <span class="pad">{{ formatPricePadding(portfolioTotal + cashTotal - referralTotal) }}</span></p>

            <p class="compact">Profit/Loss: <span class="pad">{{ formatPricePadding(portfolioTotal + cashTotal - 50000 - referralTotal) }}</span></p>

  </div>
        </div>
      </div>
    </div>
    <br/>
    <span class="tooltip-hidden">
        <iframe scrolling="no" frameborder="0" style="width: 60vh !important;height: 30vh !important;overflow: hidden;text-align: center;display: block;overflow:hidden;">
  </iframe>

    </span>
    <div v-if="assets">
      <div>
        <h4 class="text-center">Composition</h4>
      </div>
      <table class="bordered" columns="['symbol', 'shares' ,'paid', 'current price', 'change $']" id="tbl2">
        <thead>
          <tr>
            <th class="symbol symhead">Symbol</th>
            <th>Shares</th>
            <th v-on:click="sortTable(2)">Paid</th>
            <th v-on:click="sortTable(3)">Current Price</th>
            <th v-on:click="sortTable(4)">Change ($)</th>
            <th v-on:click="sortTable(5)">Change (%)</th>
            <th v-on:click="sortTable(6)" >Paid Total</th>
            <th v-on:click="sortTable(7)">Current Total</th>
            <th v-on:click="sortTable(8)">Total Change</th>
            <th v-on:click="sortTable(9)" class="lasth">% of Portfolio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="asset in assets">
              <td class="symbol text-left" 
                  v-bind:class="{ rothree: asset.isrothree, black: isBlacklist(asset), purple: isPurplelist(asset), rainbow: isRainbow(asset), trollSymbol: isTrollStock(asset) }">
                <a :href="formatFinanceLink(asset.symbol)"  
                   v-bind:class="{ rothree: asset.isrothree, black: isBlacklist(asset), purple: isPurplelist(asset), 
                                 whiteRainbow: isRainbow(asset), trollSymbol: isTrollStock(asset) }" 
                   v-on:mouseover= "iFrameMouseOver"
                   v-on:mouseout="iFrameMouseOut"
                   v-bind:data-symbol="asset.symbol"
                   class="tooltip"
                   target="_blank">{{ asset.symbol }}    </a>
              </td>
              <td class="text-center" v-bind:class="{ rothree: asset.isrothree, rainbow: isRainbow(asset)  }">{{ asset.shares }}
</td>
              <td class="text-right" v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset)  }">{{ formatPrice(asset.averageCost) }}</td>
              <td class="text-right" v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset)  }">{{ formatPrice(asset.currentCost) }}</td>
              <td class="text-right" v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset)  }">{{ formatChange(asset.change) }}</td>
              <td class="text-right pchange" v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset) }" v-bind:style="{ backgroundColor: assetChangePercentToColor(asset) }">{{ formatChangePercent(asset.changePercent) }}</td>
              <td class="text-right" v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset)  }">{{ formatPrice(asset.paidTotal) }}</td>
              <td class="text-right" v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset)  }">{{ formatPrice(asset.currentTotal) }}</td>
              <td class="text-right" v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset)  }">{{ formatChange(asset.totalChange) }}</td>
              <td class="text-right" v-bind:class="{ rothree: asset.isrothree, rainbow: isRainbow(asset) }" v-bind:style="{ backgroundColor: portfolioToBG(asset), color: portfolioPercentToTextColor(asset.percentPortfolio)}">{{ formatPercent(asset.percentPortfolio) }}</td>

          </tr>
        </tbody>
      </table>
    </div>
    <div style="
    padding-top: 2vmin;
    font-size: small;
    text-align: center;
">All numbers are after referrals, excluding cash, are subtracted.<br/>
      Forked by <a href="https://github.com/CrazyPython">@CrazyPython</a> from 
      <a href="https://github.com/abalabahaha">@abalabahaha</a>'s 
      <a href="https://stockstream.abal.moe/">original.</a>
      (<a href="https://glitch.com/edit/#!/ssapp">source</a>) <br/>
      If you can find a way to get the donation amount, 
      lease ping me (@&.) on <a href="https://discord.gg/w7Vv9g6">the 
      StockStream Discord.</a><br/>
        Other tools: <a href="https://svba.null.ist/">https://svba.null.ist/</a>

  </div>
    
  </div>
</template>
<script>
  

      export default {
  data() {
    return {
    sortKey: 'name',

    reverse: false,

    search: '',

    columns: ['symbol', 'shares'],
      assets: null,
      quotes: null,
      transactionHistory: null,
      connected: false,
      cashTotal: 0,
      portfolioTotal: 0,
      referralTotal: 0,
      minChangePercent: 0,
      maxChangePercent: 0,
      marketOpen: true,
      tradesRemaining: 0,
      totalTrades: 78,
      trollStocks: ['SEB', 'CAKE', 'GF'],
      symbolToAsset: {}
    }
  },
  methods: {
    assetChangePercentToColor(asset) {
      if(asset.averageCost <= 0) {
        return "#ffffff"
      } else if(asset.change < 0) {
        return `hsl(1,70%,${100 - 35 * asset.changePercent / this.minChangePercent}%)`
      } else {
        return `hsl(151,69.2%,${96.8 - Math.min(25 * (asset.changePercent), 50)}%)`
      }
    },
    formatChange(change) {
      if(change == null) {
        return "------"
      } else if(change < 0) {
        return `-$${Math.abs(change).toFixed(2)}`
      } else {
        return `+$${change.toFixed(2)}`
      }
    },
    formatChangePercent(change) {
      if(change == null) {
        return "------"
      } else if(change < 0) {
        return `-${Math.abs(change).toFixed(2)}%`
      } else {
        return `+${change.toFixed(2)}%`
      }
    },
    formatFinanceLink(symbol) {
      return `https://finance.yahoo.com/quote/${symbol}/`
    },
    formatPercent(percent) {
      if(percent == null) {
        return "------"
      } else {
        return `${percent.toFixed(2)}%`
      }
    },
    formatPrice(price) {
      if(price == null) {
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
      if(price == null) {
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
      if(price == null) {
        return "------"
      } else { // dirtyhack
        return `$${pad(price.toFixed(2), 6, "\xa0")}`
      }
    },sortTable() {
        var table, rows, switching, i, x, y, shouldSwitch
        table = document.getElementById("tbl2")
        switching = true
        while (switching) {
          switching = false
          rows = table.getElementsByTagName("TR")
          for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false
            x = rows[i].getElementsByTagName("TD")[0]
            y = rows[i + 1].getElementsByTagName("TD")[0]
            if(x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true
              break
            }
          }
          if(shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
            switching = true
          }
        }
      },
    sortBy: function(sortKey) {
      this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false
      this.sortKey = sortKey
    },
    portfolioToBG : function(asset) {
      if (asset.percentPortfolio > 1 && !this.isRainbow(asset)) {
        return `#009688`
      }
    },portfolioPercentToTextColor: function(percent) {
      if (percent > 1 && percent <= 5) {
        return `white`
      }
    },
    portfolioIsRainbow: function(percent) {
      if (percent > 6 && percent !== undefined) {
        return true
      }
    },
    isBlacklist: function(asset) {
      if (asset.paidTotal == 0 | asset.currentCost < 10) {
        return true
      }
    },
    isRainbow: function(asset) {
      if (asset.percentPortfolio > 5) {
        return true
      }
    },
    isPurplelist: function(asset) {
      if (asset.percentPortfolio > 1 && !this.isRainbow(asset) && !this.isTrollStock(asset)){
        return true
      }
    },
    formatSymbol(symbol){
      return symbol
    },
    padSymbol(symbol) {
      return "\xa0".repeat(6 - symbol.length)
    },
      formatType(type) {
        if (type.toUpperCase() == 'BUY') {
          return "BUY\xa0"
        } else {
          return type
        }
      },
    isTrollStock(asset) {
      if (this.trollStocks.includes(asset.symbol.toUpperCase())) {
        return true
      } else {
      return false
      }
    }
    ,iFrameMouseOver(event) {
      var stock = event.target.getAttribute('data-symbol')
      var toset = 'https://crazypython.github.io/stckstrm-static/chart.html?stock='+event.target.getAttribute('data-symbol')+'&daysback=50'
      
      var ele = document.getElementsByClassName("tooltip-hidden")[0]
      ele.style.display = "block"
      ele.style.bottom = 0
      ele.style.right = 0
      ele.style.position = "fixed"
      //ele.children[0].contentWindow.postMessage(stock, "https://crazypython.github.io/stckstrm-static/chart.html")
      
      
      if (ele.children[0].getAttribute('src') != toset) {
        ele.children[0].setAttribute('src', toset)
      }
    },iFrameMouseOut(event) {
      var ele = document.getElementsByClassName("tooltip-hidden")[0]
      ele.style.display="none"
    }
    
  },
  socket: {
    events: {
      connect() {
        console.log("Connected")
        this.connected = true
      },
      disconnect() {
        console.log("Disconnected")
        this.connected = false
      },
      assets(msg) {
        this.cashTotal = msg.cashTotal
        this.portfolioTotal = msg.portfolioTotal
        this.referralTotal = msg.referralTotal
        this.assets = msg.assets
        this.minChangePercent = 0
        this.maxChangePercent = 0
        this.totalProfit = 0
        this.symbolToAsset = {}
        msg.assets.forEach((asset) => {
          this.symbolToAsset[asset.symbol] = asset
          if (asset.totalChange > 0) {
          this.totalProfit += asset.totalChange
          }
          this.isrothree = asset.shares < 3 && !this.isRainbow(asset) && !this.isTrollStock(asset)
          asset.isrothree = this.isrothree
          if(asset.averageCost > 0 && asset.changePercent < this.minChangePercent) {
            this.minChangePercent = asset.changePercent
          }
          if(asset.averageCost > 0 && asset.changePercent > this.maxChangePercent) {
            this.maxChangePercent = asset.changePercent
          }
        })
      },
      quotes(msg) {
        this.quotes = msg.quotes
      },
      transactionHistory(msg) {
        this.transactionHistory = msg.transactionHistory
      },
      marketStateUpdate(msg) {
        this.marketOpen = msg.marketOpen
        this.tradesRemaining = msg.tradesRemaining
      }
    }
  },
  options:{
  customSorting:{
    shares: function(ascending) {
    return function(a, b) {
        var lastA = a.name[a.name.length-1].toLowerCase();
        var lastB = b.name[b.name.length-1].toLowerCase();

         if (ascending)
            return lastA <= lastB?1:-1;

        return lastA >= lastB?1:-1;
    }
}
  }}
}
</script>

<style>
h1, h2, h3, h4, h5, h6 {
  margin: 0.5em 0;
}
p {
  margin: 0.2em 0;
}
.container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.col {
  display: flex;
  flex-direction: column;
  flex: 12;
  padding: 8px;
  justify-content: center;
}
.col-1 {
  flex: 1;
}
.col-2 {
  flex: 2;
}
.col-4 {
  flex: 4;
}
.col-6 {
  flex: 6;
}
.full-width {
  width: 100%;
}
table {
  border-collapse: collapse;
}
td, th {
  padding: 1px 4px;
}
table.bordered td {
  border: 1px solid #aaa;
}
table.bordered th {
  border-bottom: 1px solid #16161d;
  border-right: 1px solid #16161d;
}
table.bordered td.symbol, th.symbol {
  border-left: 0;
  border-right: 1px solid #16161d;
}
  .symhead{
  }
  .lasth {
      border-right: 0 !important;

  }
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.card {
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 8px;
}
.trades-remaining {
  font-size: 24px;
}
 
</style>