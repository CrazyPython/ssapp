<template>
  <div class="container" id="container">
    
  <a href="#" class="floating-button floating-button-to-popover open-popover color-purple">
    <i class="icon icon-plus"></i>
  </a>
    <h3>SSApp</h3>
    <p>Unofficial live viewer for <a href="https://www.twitch.tv/stockstream">StockStream</a>'s portfolio. (by crazypyth/&.)</p>
    <p>Color legend @ <a href="https://ssapp.glitch.me/static/legend.html" target="_blank">https://ssapp.glitch.me/static/legend.html</a></p>
    <p>Quick Links: <a href="https://grafana.avertly.co/dashboard/db/return-explorer" target="_blank">Return Explorer</a> by SSApp, <a href="https://svba.null.ist" target="_blank">svba.∅</a> by johannesn</p>
    <br />
    
    <div v-if="!connected"></div>
    <div class="row full-width">
      <div class="col text-center tr">
        <div>
          <h4>Trades Completed</h4>
        </div>
        <p class="trades-remaining">{{ (totalTrades-tradesRemaining) }} / {{ totalTrades }}</p>
      </div>
      <div v-if="marketOpen" class="col">
        <div>
          <h4 class="text-center">Latest Transactions</h4>
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
              <a v-bind:href="formatFinanceLink(transaction.symbol)" class="transactionsP"  v-bind:data-symbol="transaction.symbol" >{{ formatSymbol(transaction.symbol) }}</a>
              <span v-bind:data-symbol="transaction.symbol"> @ {{ formatPricePadding2(transaction.price) }}</span>
  </span>
  </span>
          </p>
        </div>
        <div v-else-if="!connected" class="card">
                  
  <div class="loader">
    <svg class="circular" viewox="25 25 50 50">
      <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
    </svg>
</div>
  </div>
        <div v-else class="card">
  <div class="loader">
    <svg class="circular" viewox="25 25 50 50">
      <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
    </svg>
</div>
      </div>
  </div>
      <div v-else class="col text-center closed badclassname">
        <h3>Market Closed</h3>
      </div>
      <div class="col" v-on:mouseout="iFrameMouseOut2" v-on:mouseover="aM" >
        <div>
          <h4 class="text-center" >Portfolio Status</h4>
        </div>
        <div class="row" style="position: relative;">
          
          <div class="col value">
            <p class="compact">Stocks: <span class="pad">{{ formatPricePadding(portfolioTotal - referralTotal) }}</span></p>
                        <p class="compact">Cash: <span class="pad">{{ formatPricePadding(cashTotal) }}</span></p>

            <p class="compact">Referrals: <span class="pad">{{ formatPricePadding(referralTotal) }}</span></p>
          </div>
          <div class="col dollars">
                         <p class="compact">Total: <span class="pad" id="totalvalue">{{ formatPricePadding(portfolioTotal + cashTotal - referralTotal) }}</span></p>

            <p class="compact">ROI $: <span class="pad">{{ formatPricePadding(portfolioTotal + cashTotal - 50000 - referralTotal) }}</span></p>
            <p class="compact">ROI %: <span class="pad" style="padding-right: 1.5em;">{{ formatPricePadding3( (1 - this.roi)*100) }}</span></p>
  </div>
          
        <iframe id= "abb" scrolling="no" frameborder="0" v-on:mouseout="iFrameMouseOut2" v-on:mouseover="aM"
                style="width: 100% !important;height: 100% !important;overflow: hidden;text-align: center;display: none;">
  </iframe>
        </div>
      </div>
    </div>
    <br/>

    <span class="tooltip-hidden">
        <iframe scrolling="no" frameborder="0"  v-on:mouseout="iFrameMouseOut2" v-on:mouseover="aM"
                style="width: 60vh !important;height: 30vh !important;overflow: hidden;text-align: center;display: block;overflow:hidden;">
  </iframe>

    </span>
    <div v-if="assets">
      <br/>
      <table class="bordered tablesorter" columns="['symbol', 'shares' ,'paid', 'current price', 'change $']" id="tbl2">
        <thead class="sticky-header" >
          <tr>
            <th class="symbol symhead">Symbol</th>
            <th>Shares</th>
            <th >Paid</th>
            <th >Current Price</th>
            <th >Change ($)</th>
            <th >Change (%)</th>
            <th >Total Paid</th>
            <th >Current Value</th>
            <th >Total Return</th>
            <th  class="lasth">% of Portfolio</th>
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
v-on:mouseover= "iFrameMouseOver"
                   v-on:mouseout="iFrameMouseOut"
                   v-bind:data-symbol="asset.symbol"
                   class="tooltip"
                   target="_blank">{{ asset.symbol }}    </a>
              </td>
              <td class="text-center" v-bind:class="{ rothree: asset.isrothree, rainbow: isRainbow(asset)  }">
                <a :href="formatTipRanksLink(asset.symbol)"  
v-on:mouseover= "iFrameMouseOver"
                   v-on:mouseout="iFrameMouseOut"
                   v-bind:data-symbol="asset.symbol"
                   class="tooltip"
                   target="_blank">
                {{ asset.shares }}
  </a>
</td>
              <td class="text-right"                   v-on:mouseover= "iFrameMouseOver"
                   v-on:mouseout="iFrameMouseOut" v-bind:data-symbol="asset.symbol"
v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset)  }">{{ formatPrice(asset.averageCost) }}</td>
              <td class="text-right"                   v-on:mouseover= "iFrameMouseOver"
                   v-on:mouseout="iFrameMouseOut"       v-bind:data-symbol="asset.symbol"
v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset)  }">{{ formatPrice(asset.currentCost) }}</td>
              <td class="text-right"                     v-on:mouseover= "iFrameMouseOver"
                   v-on:mouseout="iFrameMouseOut"     v-bind:data-symbol="asset.symbol"
v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset)  }">{{ formatChange(asset.change) }}</td>
              <td class="text-right pchange"                    v-bind:data-symbol="asset.symbol"
v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset) }"      v-on:mouseover= "iFrameMouseOver"
                   v-on:mouseout="iFrameMouseOut" v-bind:style="{ backgroundColor: assetChangePercentToColor(asset) }">{{ formatChangePercent(asset.changePercent) }}</td>
              <td class="text-right"                      v-on:mouseover= "iFrameMouseOver"
                   v-on:mouseout="iFrameMouseOut"    v-bind:data-symbol="asset.symbol" 
v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset), tPaid: true  }">{{ formatPrice(asset.paidTotal) }}</td>
              <td class="text-right"                    v-bind:data-symbol="asset.symbol">{{ formatPrice(asset.currentTotal) }}</td>
              <td class="text-right"                    v-bind:data-symbol="asset.symbol"
v-bind:class="{ rothree: asset.isrothree, rainbow: (asset.totalChange > 0.2*totalProfit) && !isBlacklist(asset)  }">{{ formatChange(asset.totalChange) }}</td>
              <td class="text-right"                    v-bind:data-symbol="asset.symbol"
v-bind:class="{ rothree: asset.isrothree, rainbow: isRainbow(asset) }" v-bind:style="{ backgroundColor: portfolioToBG(asset), color: portfolioPercentToTextColor(asset.percentPortfolio)}">{{ formatPercent(asset.percentPortfolio) }}</td>

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
License: GPLv3<br/>

<a href="https://crazypython.github.io/stckstrm-static/shhh.html"><img height="15px" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Illuminati_triangle_eye.png" style="
  padding-top: 1em;"/></a>  </div>
    
  </div>
</template>
<script>
  $(function () {;
    
$(function(){
  setTimeout(function(){
  $("#tbl2").tablesorter(
{
  
    widgets: [ 'stickyHeaders'],

    widgetOptions: {

      // extra class name added to the sticky header row
      stickyHeaders : 'sticky',
      // number or jquery selector targeting the position:fixed element
      stickyHeaders_offset : 0,
      // added to table ID, if it exists
      stickyHeaders_cloneId : '-sticky',
      // trigger "resize" event on headers
      stickyHeaders_addResizeEvent : true,
      // if false and a caption exist, it won't be included in the sticky header
      stickyHeaders_includeCaption : true,
      // The zIndex of the stickyHeaders, allows the user to adjust this to their needs
      stickyHeaders_zIndex : 2,
      // jQuery selector or object to attach sticky header to
      stickyHeaders_attachTo : null,
      // jQuery selector or object to monitor horizontal scroll position (defaults: xScroll > attachTo > window)
      stickyHeaders_xScroll : null,
      // jQuery selector or object to monitor vertical scroll position (defaults: yScroll > attachTo > window)
      stickyHeaders_yScroll : null,

      // scroll table top into view after filtering
      stickyHeaders_filteredToTop: true

      // *** REMOVED jQuery UI theme due to adding an accordion on this demo page ***
      // adding zebra striping, using content and default styles - the ui css removes the background from default
      // even and odd class names included for this demo to allow switching themes
      // , zebra   : ["ui-widget-content even", "ui-state-default odd"]
      // use uitheme widget to apply defauly jquery ui (jui) class names
      // see the uitheme demo for more details on how to change the class names
      // , uitheme : 'jui'
    }
  
});
    
  }, 1000);
  $('#table1, .nested, #table3').tablesorter({
    widthFixed : true,
    showProcessing: true,
    headerTemplate : '{content} {icon}', // Add icon for various themes


    widgetOptions: {

      // extra class name added to the sticky header row
      stickyHeaders : '',
      // number or jquery selector targeting the position:fixed element
      stickyHeaders_offset : 0,
      // added to table ID, if it exists
      stickyHeaders_cloneId : '-sticky',
      // trigger "resize" event on headers
      stickyHeaders_addResizeEvent : true,
      // if false and a caption exist, it won't be included in the sticky header
      stickyHeaders_includeCaption : true,
      // The zIndex of the stickyHeaders, allows the user to adjust this to their needs
      stickyHeaders_zIndex : 2,
      // jQuery selector or object to attach sticky header to
      stickyHeaders_attachTo : null,
      // jQuery selector or object to monitor horizontal scroll position (defaults: xScroll > attachTo > window)
      stickyHeaders_xScroll : null,
      // jQuery selector or object to monitor vertical scroll position (defaults: yScroll > attachTo > window)
      stickyHeaders_yScroll : null,

      // scroll table top into view after filtering
      stickyHeaders_filteredToTop: true

      // *** REMOVED jQuery UI theme due to adding an accordion on this demo page ***
      // adding zebra striping, using content and default styles - the ui css removes the background from default
      // even and odd class names included for this demo to allow switching themes
      // , zebra   : ["ui-widget-content even", "ui-state-default odd"]
      // use uitheme widget to apply defauly jquery ui (jui) class names
      // see the uitheme demo for more details on how to change the class names
      // , uitheme : 'jui'
    }
  });

  /* make second table scroll within its wrapper */
  $('#tbl2').tablesorter({
    widthFixed : true,
    headerTemplate : '{content} {icon}', // Add icon for various themes

    widgets: [ 'zebra', 'stickyHeaders',  ],

    widgetOptions: {
      // jQuery selector or object to attach sticky header to
      stickyHeaders_attachTo : '.wrapper' // or $('.wrapper')
    }
  });

});
  });
  alertify.parent(document.body) 
  // @preserve jQuery.floatThead 1.2.9 - http://mkoryak.github.io/floatThead/ - Copyright (c) 2012 - 2014 Misha Koryak
// @license MIT
! function (a) {
    function b(a, b, c) {
        if (8 == g) {
            var d = j.width(),
                e = f.debounce(function () {
                    var a = j.width();
                    d != a && (d = a, c())
                }, a);
            j.on(b, e)
        } else j.on(b, f.debounce(c, a))
    }

    function c(a) {
        window.console && window.console && window.console.log && window.console.log(a)
    }

    function d() {
        var b = a('<div style="width:50px;height:50px;overflow-y:scroll;position:absolute;top:-200px;left:-200px;"><div style="height:100px;width:100%"></div>');
        a("body").append(b);
        var c = b.innerWidth(),
            d = a("div", b).innerWidth();
        return b.remove(), c - d
    }

    function e(a) {
        if (a.dataTableSettings) for (var b = 0; b < a.dataTableSettings.length; b++) {
            var c = a.dataTableSettings[b].nTable;
            if (a[0] == c) return !0
        }
        return !1
    }
    a.floatThead = a.floatThead || {}, a.floatThead.defaults = {
        cellTag: null,
        headerCellSelector: "tr:first>th:visible",
        zIndex: 1001,
        debounceResizeMs: 10,
        useAbsolutePositioning: !0,
        scrollingTop: 0,
        scrollingBottom: 0,
        scrollContainer: function () {
            return a([])
        },
        getSizingRow: function (a) {
            return a.find("tbody tr:visible:first>*")
        },
        floatTableClass: "floatThead-table",
        floatWrapperClass: "floatThead-wrapper",
        floatContainerClass: "floatThead-container",
        copyTableClass: !0,
        debug: !1
    };
    var f = window._,
        g = function () {
            for (var a = 3, b = document.createElement("b"), c = b.all || []; a = 1 + a, b.innerHTML = "<\!--[if gt IE " + a + "]><i><![endif]-->", c[0];);
            return a > 4 ? a : document.documentMode
        }(),
        h = null,
        i = function () {
            if (g) return !1;
            var b = a("<table><colgroup><col></colgroup><tbody><tr><td style='width:10px'></td></tbody></table>");
            a("body").append(b);
            var c = b.find("col").width();
            return b.remove(), 0 == c
        }, j = a(window),
        k = 0;
    a.fn.floatThead = function (l) {
        if (l = l || {}, !f && (f = window._ || a.floatThead._, !f)) throw new Error("jquery.floatThead-slim.js requires underscore. You should use the non-lite version since you do not have underscore.");
        if (8 > g) return this;
        if (null == h && (h = i(), h && (document.createElement("fthtr"), document.createElement("fthtd"), document.createElement("fthfoot"))), f.isString(l)) {
            var m = l,
                n = this;
            return this.filter("table").each(function () {
                var b = a(this).data("floatThead-attached");
                if (b && f.isFunction(b[m])) {
                    var c = b[m]();
                    "undefined" != typeof c && (n = c)
                }
            }), n
        }
        var o = a.extend({}, a.floatThead.defaults || {}, l);
        return a.each(l, function (b) {
            b in a.floatThead.defaults || !o.debug || c("jQuery.floatThead: used [" + b + "] key to init plugin, but that param is not an option for the plugin. Valid options are: " + f.keys(a.floatThead.defaults).join(", "))
        }), this.filter(":not(." + o.floatTableClass + ")").each(function () {
            function c(a) {
                return a + ".fth-" + y + ".floatTHead"
            }

            function i() {
                var b = 0;
                A.find("tr:visible").each(function () {
                    b += a(this).outerHeight(!0)
                }), Z.outerHeight(b), $.outerHeight(b)
            }

            function l() {
                var a = z.outerWidth(),
                    b = I.width() || a;
                if (X.width(b - F.vertical), O) {
                    var c = 100 * a / (b - F.vertical);
                    S.css("width", c + "%")
                } else S.outerWidth(a)
            }

            function m() {
                C = (f.isFunction(o.scrollingTop) ? o.scrollingTop(z) : o.scrollingTop) || 0, D = (f.isFunction(o.scrollingBottom) ? o.scrollingBottom(z) : o.scrollingBottom) || 0
            }

            function n() {
                var b, c;
                if (V) b = U.find("col").length;
                else {
                    var d;
                    d = null == o.cellTag && o.headerCellSelector ? o.headerCellSelector : "tr:first>" + o.cellTag, c = A.find(d), b = 0, c.each(function () {
                        b += parseInt(a(this).attr("colspan") || 1, 10)
                    })
                }
                if (b != H) {
                    H = b;
                    for (var e = [], f = [], g = [], i = 0; b > i; i++) e.push('<th class="floatThead-col"/>'), f.push("<col/>"), g.push("<fthtd style='display:table-cell;height:0;width:auto;'/>");
                    f = f.join(""), e = e.join(""), h && (g = g.join(""), W.html(g), bb = W.find("fthtd")), Z.html(e), $ = Z.find("th"), V || U.html(f), _ = U.find("col"), T.html(f), ab = T.find("col")
                }
                return b
            }

            function p() {
                if (!E) {
                    if (E = !0, J) {
                        var a = z.width(),
                            b = Q.width();
                        a > b && z.css("minWidth", a)
                    }
                    z.css(db), S.css(db), S.append(A), B.before(Y), i()
                }
            }

            function q() {
                E && (E = !1, J && z.width(fb), Y.detach(), z.prepend(A), z.css(eb), S.css(eb))
            }

            function r(a) {
                J != a && (J = a, X.css({
                    position: J ? "absolute" : "fixed"
                }))
            }

            function s(a, b, c, d) {
                return h ? c : d ? o.getSizingRow(a, b, c) : b
            }

            function t() {
                var a, b = n();
                return function () {
                    var c = s(z, _, bb, g);
                    if (c.length == b && b > 0) {
                        if (!V) for (a = 0; b > a; a++) _.eq(a).css("width", "");
                        q();
                        var d = [];
                        for (a = 0; b > a; a++) d[a] = c.get(a).offsetWidth;
                        for (a = 0; b > a; a++) ab.eq(a).width(d[a]), _.eq(a).width(d[a]);
                        p()
                    } else S.append(A), z.css(eb), S.css(eb), i()
                }
            }

            function u(a) {
                var b = I.css("border-" + a + "-width"),
                    c = 0;
                return b && ~b.indexOf("px") && (c = parseInt(b, 10)), c
            }

            function v() {
                var a, b = I.scrollTop(),
                    c = 0,
                    d = L ? K.outerHeight(!0) : 0,
                    e = M ? d : -d,
                    f = X.height(),
                    g = z.offset(),
                    i = 0;
                if (O) {
                    var k = I.offset();
                    c = g.top - k.top + b, L && M && (c += d), c -= u("top"), i = u("left")
                } else a = g.top - C - f + D + F.horizontal;
                var l = j.scrollTop(),
                    m = j.scrollLeft(),
                    n = I.scrollLeft();
                return b = I.scrollTop(),

                function (k) {
                    if ("windowScroll" == k ? (l = j.scrollTop(), m = j.scrollLeft()) : "containerScroll" == k ? (b = I.scrollTop(), n = I.scrollLeft()) : "init" != k && (l = j.scrollTop(), m = j.scrollLeft(), b = I.scrollTop(), n = I.scrollLeft()), !h || !(0 > l || 0 > m)) {
                        if (R) r("windowScrollDone" == k ? !0 : !1);
                        else if ("windowScrollDone" == k) return null;
                        g = z.offset(), L && M && (g.top += d);
                        var o, s, t = z.outerHeight();
                        if (O && J) {
                            if (c >= b) {
                                var u = c - b;
                                o = u > 0 ? u : 0
                            } else o = P ? 0 : b;
                            s = i
                        } else !O && J ? (l > a + t + e ? o = t - f + e : g.top > l + C ? (o = 0, q()) : (o = C + l - g.top + c + (M ? d : 0), p()), s = 0) : O && !J ? (c > b || b - c > t ? (o = g.top - l, q()) : (o = g.top + b - l - c, p()), s = g.left + n - m) : O || J || (l > a + t + e ? o = t + C - l + a + e : g.top > l + C ? (o = g.top - l, p()) : o = C, s = g.left - m);
                        return {
                            top: o,
                            left: s
                        }
                    }
                }
            }

            function w() {
                var a = null,
                    b = null,
                    c = null;
                return function (d, e, f) {
                    null == d || a == d.top && b == d.left || (X.css({
                        top: d.top,
                        left: d.left
                    }), a = d.top, b = d.left), e && l(), f && i();
                    var g = I.scrollLeft();
                    J && c == g || (X.scrollLeft(g), c = g)
                }
            }

            function x() {
                if (I.length) {
                    var a = I.width(),
                        b = I.height(),
                        c = z.height(),
                        d = z.width(),
                        e = d > a ? G : 0,
                        f = c > b ? G : 0;
                    F.horizontal = d > a - f ? G : 0, F.vertical = c > b - e ? G : 0
                }
            }
            var y = k,
                z = a(this);
            if (z.data("floatThead-attached")) return !0;
            if (!z.is("table")) throw new Error('jQuery.floatThead must be run on a table element. ex: $("table").floatThead();');
            var A = z.find("thead:first"),
                B = z.find("tbody:first");
            if (0 == A.length) throw new Error("jQuery.floatThead must be run on a table that contains a <thead> element");
            var C, D, E = !1,
                F = {
                    vertical: 0,
                    horizontal: 0
                }, G = d(),
                H = 0,
                I = o.scrollContainer(z) || a([]),
                J = o.useAbsolutePositioning;
            null == J && (J = o.scrollContainer(z).length);
            var K = z.find("caption"),
                L = 1 == K.length;
            if (L) var M = "top" === (K.css("caption-side") || K.attr("align") || "top");
            var N = a('<fthfoot style="display:table-footer-group;"/>'),
                O = I.length > 0,
                P = !1,
                Q = a([]),
                R = 9 >= g && !O && J,
                S = a("<table/>"),
                T = a("<colgroup/>"),
                U = z.find("colgroup:first"),
                V = !0;
            0 == U.length && (U = a("<colgroup/>"), V = !1);
            var W = a('<fthrow style="display:table-row;height:0;"/>'),
                X = a('<div style="overflow: hidden;"></div>'),
                Y = a("<thead/>"),
                Z = a('<tr class="size-row"/>'),
                $ = a([]),
                _ = a([]),
                ab = a([]),
                bb = a([]);
            if (Y.append(Z), z.prepend(U), h && (N.append(W), z.append(N)), S.append(T), X.append(S), o.copyTableClass && S.attr("class", z.attr("class")), S.attr({
                cellpadding: z.attr("cellpadding"),
                cellspacing: z.attr("cellspacing"),
                border: z.attr("border")
            }), S.css({
                borderCollapse: z.css("borderCollapse"),
                border: z.css("border")
            }), S.addClass(o.floatTableClass).css("margin", 0), J) {
                var cb = function (a, b) {
                    var c = a.css("position"),
                        d = "relative" == c || "absolute" == c;
                    if (!d || b) {
                        var e = {
                            paddingLeft: a.css("paddingLeft"),
                            paddingRight: a.css("paddingRight")
                        };
                        X.css(e), a = a.wrap("<div class='" + o.floatWrapperClass + "' style='position: relative; clear:both;'></div>").parent(), P = !0
                    }
                    return a
                };
                O ? (Q = cb(I, !0), Q.append(X)) : (Q = cb(z), z.after(X))
            } else z.after(X);
            X.css({
                position: J ? "absolute" : "fixed",
                marginTop: 0,
                top: J ? 0 : "auto",
                zIndex: o.zIndex
            }), X.addClass(o.floatContainerClass), m();
            var db = {
                "table-layout": "fixed"
            }, eb = {
                "table-layout": z.css("tableLayout") || "auto"
            }, fb = z[0].style.width || "";
            x();
            var gb, hb = function () {
                (gb = t())()
            };
            hb();
            var ib = v(),
                jb = w();
            jb(ib("init"), !0);
            var kb = f.debounce(function () {
                jb(ib("windowScrollDone"), !1)
            }, 300),
                lb = function () {
                    jb(ib("windowScroll"), !1), kb()
                }, mb = function () {
                    jb(ib("containerScroll"), !1)
                }, nb = function () {
                    m(), x(), hb(), ib = v(), (jb = w())(ib("resize"), !0, !0)
                }, ob = f.debounce(function () {
                    x(), m(), hb(), ib = v(), jb(ib("reflow"), !0)
                }, 1);
            O ? J ? I.on(c("scroll"), mb) : (I.on(c("scroll"), mb), j.on(c("scroll"), lb)) : j.on(c("scroll"), lb), j.on(c("load"), ob), b(o.debounceResizeMs, c("resize"), nb), z.on("reflow", ob), e(z) && z.on("filter", ob).on("sort", ob).on("page", ob), z.data("floatThead-attached", {
                destroy: function () {
                    var a = ".fth-" + y;
                    q(), z.css(eb), U.remove(), h && N.remove(), Y.parent().length && Y.replaceWith(A), z.off("reflow"), I.off(a), P && (I.length ? I.unwrap() : z.unwrap()), J && z.css("minWidth", ""), X.remove(), z.data("floatThead-attached", !1), j.off(a)
                },
                reflow: function () {
                    ob()
                },
                setHeaderHeight: function () {
                    i()
                },
                getFloatContainer: function () {
                    return X
                },
                getRowGroups: function () {
                    return E ? X.find("thead").add(z.find("tbody,tfoot")) : z.find("thead,tbody,tfoot")
                }
            }), k++
        }), this
    }
}(jQuery),

function (a) {
    a.floatThead = a.floatThead || {}, a.floatThead._ = window._ || function () {
        var b = {}, c = Object.prototype.hasOwnProperty,
            d = ["Arguments", "Function", "String", "Number", "Date", "RegExp"];
        return b.has = function (a, b) {
            return c.call(a, b)
        }, b.keys = function (a) {
            if (a !== Object(a)) throw new TypeError("Invalid object");
            var c = [];
            for (var d in a) b.has(a, d) && c.push(d);
            return c
        }, a.each(d, function () {
            var a = this;
            b["is" + a] = function (b) {
                return Object.prototype.toString.call(b) == "[object " + a + "]"
            }
        }), b.debounce = function (a, b, c) {
            var d, e, f, g, h;
            return function () {
                f = this, e = arguments, g = new Date;
                var i = function () {
                    var j = new Date - g;
                    b > j ? d = setTimeout(i, b - j) : (d = null, c || (h = a.apply(f, e)))
                }, j = c && !d;
                return d || (d = setTimeout(i, b)), j && (h = a.apply(f, e)), h
            }
        }, b
    }()
}(jQuery);



$(document).ready(function () {
var myApp = new Framework7();

    $(".sticky-header").floatThead({
        scrollingTop: 50
    });

});
    

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
      return `https://www.google.com/finance?q=${symbol}`
    },
    
    formatTipRanksLink(symbol){
            return `https://www.tipranks.com/stocks/${symbol}/`

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
        return `$${pad(price.toFixed(2), 7, "\xa0")}`
      }
    },
    formatPricePadding3(price) {
      function pad(n, width, z) {
        z = z || "0"
        n = n + ""
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
      }
      if(price == null) {
        return "------"
      } else { // dirtyhack
        return pad(price.toFixed(2), 5, "\xa0") + "%"
      }
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
      var toset = 'https://crazypython.github.io/stckstrm-static/chart3.html?stock='+event.target.getAttribute('data-symbol')+'&daysback=' + this.daysBack.toString()
      
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
    },aM(event) {
      var toset = 'https://grafana.avertly.co/dashboard-solo/db/ssapp-embed?editview=settings&orgId=2&panelId=1&from=now-2d&to=now'
          var ele = document.getElementById("abb")
          
          ele.style.height = "30vh"
      ele.style.display = "block"
      ele.style.top = "100%"
      ele.style.left = 0
      ele.style.position = "absolute"
      //ele.children[0].contentWindow.postMessage(stock, "https://crazypython.github.io/stckstrm-static/chart.html")
      
      
      if (ele.getAttribute('src') != toset) {
        ele.setAttribute('src', toset)
      }
      },iFrameMouseOut2(event) {
      var ele = document.getElementById("abb")
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
        alertify.error("Connection to server lost.")
        this.connected = false
      },
      assets(msg) {
        this.cashTotal = msg.cashTotal
        this.diversity = 0
        this.portfolioTotal = msg.portfolioTotal
        this.referralTotal = 500
        this.assets = msg.assets
        this.roi = 1-((this.portfolioTotal+this.cashTotal-this.referralTotal-50000)/50000)
        this.minChangePercent = 0
        this.maxChangePercent = 0
        this.totalProfit = 0
        this.symbolToAsset = {}
        msg.assets.forEach((asset) => {
          this.symbolToAsset[asset.symbol] = asset
          if (asset.totalChange > 0) {
          this.totalProfit += asset.totalChange
          }
          this.diversity += (asset.currentTotal/msg.portfolioTotal)**2
          this.isrothree = asset.shares < 3 && !this.isRainbow(asset) && !this.isTrollStock(asset)
          asset.isrothree = this.isrothree
          if(asset.averageCost > 0 && asset.changePercent < this.minChangePercent) {
            this.minChangePercent = asset.changePercent
          }
          if(asset.averageCost > 0 && asset.changePercent > this.maxChangePercent) {
            this.maxChangePercent = asset.changePercent
          }
        }
                          )
        var xhttp2 = new XMLHttpRequest();

        //var profitloss= this.portfolioTotal + this.cashTotal - 50000 - this.referralTotal //
//var url = "https://crossorigin.me/"+ "https://maker.ifttt.com/trigger/profit_loss/with/key/dmkejin-z5ERxg5gIR-JdURFnBi-ruRh37HbT8IkfBw?=" + profitloss
  //      xhttp2.open("GET", url, true);
//xhttp2.send();
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
  padding: 3px 4px;
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
 table.floatThead-table {
    border-top: none;
    border-bottom: none;
    background-color: #fff;
}
</style>