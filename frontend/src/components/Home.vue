<template>
  <div class="container" id="container">
    <h3>SSApp</h3>
    <p>Unofficial live viewer for <a href="https://www.twitch.tv/stockstream">StockStream</a>'s portfolio. (by crazypyth/&.)
    </p>
    <p>Color legend @ <a href="https://ssapp.glitch.me/static/legend.html" target="_blank">https://ssapp.glitch.me/static/legend.html</a>
    </p>
    <p>Quick Links: <a href="https://grafana.avertly.co/dashboard/db/return-explorer"
                       target="_blank">Return Explorer</a> by SSApp, <a href="https://svba.null.ist" target="_blank">svba.∅</a>
      by johannesn</p>
    <br/>

    <div v-if="!connected"></div>

    <div class="row full-width">
      <div class="col text-center tr">
        <div>
          <h4>Trades Completed</h4>
        </div>
        <p class="trades-remaining">{{ (totalTrades - tradesRemaining) }} / {{ totalTrades }}</p>
      </div>
      <div v-if="marketOpen" class="col">
        <div>
          <h4 class="text-center">Latest Transactions</h4>
        </div>
        <div v-if="transactionHistory && transactionHistory.length > 0" class="card transactions">
          <p v-for="transaction in transactionHistory" style="text-align: center;">
            <span v-bind:data-symbol="transaction.symbol" v-on:mouseout="iFrameMouseOut"
                  v-on:mouseover="iFrameMouseOver">
            <span v-text="formatType(transaction.type.toUpperCase())"
                  v-bind:data-symbol="transaction.symbol"
                  v-bind:class="{ sellTransaction: transaction.type.toUpperCase() == 'SELL',
                                buyTransaction: transaction.type.toUpperCase() == 'BUY' }"></span>
            <span v-bind:class="{ sellTransactionRight: transaction.type.toUpperCase() == 'SELL',
                                buyTransactionRight: transaction.type.toUpperCase() == 'BUY' }"
                  v-bind:data-symbol="transaction.symbol">
            {{ padSymbol(transaction.symbol) }}
              <a v-bind:href="formatFinanceLink(transaction.symbol)" class="transactionsP"
                 v-bind:data-symbol="transaction.symbol">{{ formatSymbol(transaction.symbol) }}</a>
              <span v-bind:data-symbol="transaction.symbol"> @ {{ formatPricePadding2(transaction.price) }}</span>
  </span>
  </span>
          </p>
        </div>
        <div v-else-if="!connected" class="card">

          <div class="loader">
            <svg class="circular" viewox="25 25 50 50">
              <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle>
            </svg>
          </div>
        </div>
        <div v-else class="card">
          <div class="loader">
            <svg class="circular" viewox="25 25 50 50">
              <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle>
            </svg>
          </div>
        </div>
      </div>
      <div v-else class="col text-center closed badclassname">
        <h3>Market Closed</h3>
      </div>
      <div class="col" v-on:mouseout="iFrameMouseOut2" v-on:mouseover="aM">
        <div>
          <h4 class="text-center">Portfolio Status</h4>
        </div>
        <div class="row" style="position: relative;">

          <div class="col value">
            <p class="compact">Stocks:
              <span class="pad">{{ formatPricePadding(portfolioTotal - referralTotal) }}</span></p>
            <p class="compact">Cash:
              <span class="pad">{{ formatPricePadding(cashTotal) }}</span></p>
            <p class="compact">Referrals:
              <span class="pad">{{ formatPricePadding(referralTotal) }}</span></p>
          </div>
          <div class="col dollars">
            <p class="compact">Total:
              <span class="pad"
                    id="totalvalue">{{ formatPricePadding(portfolioTotal + cashTotal - referralTotal)}}</span></p>
            <p class="compact">ROI $:
              <span class="pad">{{ formatPricePadding(portfolioTotal + cashTotal - 50000 - referralTotal) }}</span></p>
            <p class="compact">ROI %:
              <span class="pad" style="padding-right: 1.5em;">{{ formatPricePadding3((1 - this.roi) * 100)}}</span></p>
          </div>

          <iframe id="abb" scrolling="no" frameborder="0" v-on:mouseout="iFrameMouseOut2" v-on:mouseover="aM"
                  style="width: 100% !important;height: 100% !important;overflow: hidden;text-align: center;display: none;">
          </iframe>
        </div>
      </div>
    </div>
    <br/>

    <span class="tooltip-hidden">
      <iframe scrolling="no" frameborder="0" v-on:mouseout="iFrameMouseOut2"
              style="width: 60vh !important;height: 30vh !important;overflow: hidden;text-align: center;display: block;overflow:hidden;">
      </iframe>
    </span>

    <div v-if="assets">
      <br/>
      <table class="bordered tablesorter" id="tbl2">
        <thead class="sticky-header">
        <tr>
          <th class="symbol symhead">Symbol</th>
          <th>Shares</th>
          <th>Paid</th>
          <th>Current Price</th>
          <th>Change ($)</th>
          <th>Change (%)</th>
          <th>Total Paid</th>
          <th>Current Value</th>
          <th>Total Return</th>
          <th class="lasth">% of Portfolio</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="asset in assets"
        >
          <td class="symbol text-left"
              v-bind:class="{ rothree: asset.isrothree, black: isBlacklist(asset), purple: isPurplelist(asset), rainbow: isRainbow(asset), trollSymbol: isTrollStock(asset) }">
            <a :href="formatFinanceLink(asset.symbol)"
               v-bind:class="{ rothree: asset.isrothree, black: isBlacklist(asset), purple: isPurplelist(asset),
                                 whiteRainbow: isRainbow(asset), trollSymbol: isTrollStock(asset) }"
               v-on:mouseover="iFrameMouseOver"
               v-on:mouseout="iFrameMouseOut"
               v-bind:data-symbol="asset.symbol"
               class="tooltip"
               target="_blank">{{ asset.symbol }}    </a>
          </td>
          <td class="text-center" v-bind:class="{ rothree: asset.isrothree, rainbow: isRainbow(asset)  }">
            <a :href="formatTipRanksLink(asset.symbol)"
               v-on:mouseover="iFrameMouseOver"
               v-on:mouseout="iFrameMouseOut"
               v-bind:data-symbol="asset.symbol"
               class="tooltip"
               target="_blank">
              {{ asset.shares }}
            </a>
          </td>
          <td class="text-right" v-on:mouseover="iFrameMouseOver"
              v-on:mouseout="iFrameMouseOut" v-bind:data-symbol="asset.symbol"
              v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset)  }">
            {{ formatPrice(asset.averageCost) }}
          </td>
          <td class="text-right" v-on:mouseover="iFrameMouseOver"
              v-on:mouseout="iFrameMouseOut" v-bind:data-symbol="asset.symbol"
              v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset)  }">
            {{ formatPrice(asset.currentCost) }}
          </td>
          <td class="text-right" v-on:mouseover="iFrameMouseOver"
              v-on:mouseout="iFrameMouseOut" v-bind:data-symbol="asset.symbol"
              v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset)  }">
            {{ formatChange(asset.change) }}
          </td>
          <td class="text-right pchange" v-bind:data-symbol="asset.symbol"
              v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset) }"
              v-on:mouseover="iFrameMouseOver"
              v-on:mouseout="iFrameMouseOut" v-bind:style="{ backgroundColor: assetChangePercentToColor(asset) }">
            {{ formatChangePercent(asset.changePercent) }}
          </td>
          <td class="text-right" v-on:mouseover="iFrameMouseOver"
              v-on:mouseout="iFrameMouseOut" v-bind:data-symbol="asset.symbol"
              v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset), tPaid: true  }">
            {{ formatPrice(asset.paidTotal) }}
          </td>
          <td class="text-right" v-bind:data-symbol="asset.symbol">{{ formatPrice(asset.currentTotal) }}</td>
          <td class="text-right" v-bind:data-symbol="asset.symbol"
              v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset)  }">
            {{ formatChange(asset.totalChange) }}
          </td>
          <td class="text-right" v-bind:data-symbol="asset.symbol"
              v-bind:class="{ rothree: asset.isrothree, rainbow: isRainbow(asset) }"
              v-bind:style="{ backgroundColor: portfolioToBG(asset), color: portfolioPercentToTextColor(asset.percentPortfolio)}">
            {{ formatPercent(asset.percentPortfolio) }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <footer>
      All numbers are after referrals, excluding cash, are subtracted.<br/>
      Forked by <a href="https://github.com/CrazyPython">@CrazyPython</a> from
      <a href="https://github.com/abalabahaha">@abalabahaha</a>'s
      <a href="https://stockstream.abal.moe/">original.</a>
      (<a href="https://github.com/CrazyPython/ssapp">source</a>) <br/>
      License: GPLv3<br/>

      <a href="https://crazypython.github.io/stckstrm-static/shhh.html">
        <img height="15px"
             src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Illuminati_triangle_eye.png"
             style="
  padding-top: 1em;"/>
      </a>
    </footer>
  </div>
</template>
<script defer src="../../static/main.js"></script>
