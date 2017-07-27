

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  try {
(function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);
mixpanel.init("a699a7410761a2335119fc713a952f9c");
  } catch (err){
    
  }
  export default {
  name: "app"
}</script>

  <style>/* vietnamese */
    /* wrapper of table 2 */
   
.wrapper {
  position: relative;
  padding: 0 5px;
  height: 250px;
  overflow-y: auto;
}

/* Magnific popup */
#popup {
  position: relative;
  background: #FFF;
  padding: 20px;
  width: auto;
  max-width: 500px;
  margin: 20px auto;
}
/* Since the popup has a 20px margin, we need to adjust the wrapper position
Note:
 this is only required because we aren't actually attaching the sticky header
 to the #popup, instead we're attaching it to the .mfp-wrap because that
 element scrolls instead of the window
*/
#popup .tablesorter-sticky-wrapper {
  margin-left: 20px;
  margin-top: -20px;
}
@font-face {
  font-family: 'Inconsolata';
  font-style: normal;
  font-weight: 400;
  src: local('Inconsolata Regular'), local('Inconsolata-Regular'), url(https://fonts.gstatic.com/s/inconsolata/v15/BjAYBlHtW3CJxDcjzrnZCL6up8jxqWt8HVA3mDhkV_0.woff2) format('woff2');
  unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Inconsolata';
  font-style: normal;
  font-weight: 400;
  src: local('Inconsolata Regular'), local('Inconsolata-Regular'), url(https://fonts.gstatic.com/s/inconsolata/v15/BjAYBlHtW3CJxDcjzrnZCCYE0-AqJ3nfInTTiDXDjU4.woff2) format('woff2');
  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Inconsolata';
  font-style: normal;
  font-weight: 400;
  src: local('Inconsolata Regular'), local('Inconsolata-Regular'), url(https://fonts.gstatic.com/s/inconsolata/v15/BjAYBlHtW3CJxDcjzrnZCI4P5ICox8Kq3LLUNMylGO4.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  src: local('Roboto Light'), local('Roboto-Light'), url(https://fonts.gstatic.com/s/roboto/v16/0eC6fl06luXEYWpBSJvXCBJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');
  unicode-range: U+0460-052F, U+20B4, U+2DE0-2DFF, U+A640-A69F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  src: local('Roboto Light'), local('Roboto-Light'), url(https://fonts.gstatic.com/s/roboto/v16/Fl4y0QdOxyyTHEGMXX8kcRJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  src: local('Roboto Light'), local('Roboto-Light'), url(https://fonts.gstatic.com/s/roboto/v16/-L14Jk06m6pUHB-5mXQQnRJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  src: local('Roboto Light'), local('Roboto-Light'), url(https://fonts.gstatic.com/s/roboto/v16/I3S1wsgSg9YCurV6PUkTORJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  src: local('Roboto Light'), local('Roboto-Light'), url(https://fonts.gstatic.com/s/roboto/v16/NYDWBdD4gIq26G5XYbHsFBJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');
  unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  src: local('Roboto Light'), local('Roboto-Light'), url(https://fonts.gstatic.com/s/roboto/v16/Pru33qjShpZSmG3z6VYwnRJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');
  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  src: local('Roboto Light'), local('Roboto-Light'), url(https://fonts.gstatic.com/s/roboto/v16/Hgo13k-tfSpn0qi1SFdUfVtXRa8TVwTICgirnJhmVJw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v16/ek4gzZ-GeXAPcSbHtCeQI_esZW2xOQ-xsNqO47m55DA.woff2) format('woff2');
  unicode-range: U+0460-052F, U+20B4, U+2DE0-2DFF, U+A640-A69F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v16/mErvLBYg_cXG3rLvUsKT_fesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v16/-2n2p-_Y08sg57CNWQfKNvesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v16/u0TOpm082MNkS5K0Q4rhqvesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v16/NdF9MtnOpLzo-noMoG0miPesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');
  unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v16/Fcx7Wwv8OzT71A3E1XOAjvesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');
  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v16/CWB0XYA8bzo0kSThX0UTuA.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}/* fallback */
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: local('Material Icons'), local('MaterialIcons-Regular'), url(https://fonts.gstatic.com/s/materialicons/v22/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2) format('woff2');
}
/* cyrillic */
@font-face {
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 400;
  src: local('Playfair Display'), local('PlayfairDisplay-Regular'), url(https://fonts.gstatic.com/s/playfairdisplay/v10/2NBgzUtEeyB-Xtpr9bm1CRw5vVFbIG7DatP53f3SWfE.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* latin-ext */
@font-face {
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 400;
  src: local('Playfair Display'), local('PlayfairDisplay-Regular'), url(https://fonts.gstatic.com/s/playfairdisplay/v10/2NBgzUtEeyB-Xtpr9bm1CSVudZg2I_9CBJalMPResNk.woff2) format('woff2');
  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 400;
  src: local('Playfair Display'), local('PlayfairDisplay-Regular'), url(https://fonts.gstatic.com/s/playfairdisplay/v10/2NBgzUtEeyB-Xtpr9bm1CRD8Ne_KjP89kA3_zOrHj8E.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}</style>
<style>
  
#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 color: #16161d;
}
  .closed {
   color: white;
    background-color: #F44336;
  }
  h1, h2, h3, h4, h5, h6,th {
  font-weight: 400;
}
  .dollars {
    background-color: #16161d;
    color: white;
  
  }
  .pad {
    padding-right:2em;
    float: right;
      font-family: "Inconsolata";
  }
  .value {
    background-color: #3F51B5;
    color: white;
  }
  table {
    font-size: 1.4vw;
  }
  .rainbow { 
background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
background-size: 1800% 1800%;

-webkit-animation: rainbow 18s ease infinite;
-z-animation: rainbow 18s ease infinite;
-o-animation: rainbow 18s ease infinite;
  animation: rainbow 18s ease infinite;}

@-webkit-keyframes rainbow {
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
}
@-moz-keyframes rainbow {
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
}
@-o-keyframes rainbow {
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
}
@keyframes rainbow { 
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
}
  
    .rainbow, a.rainbow { 
background: linear-gradient(124deg, #16161d, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
background-size: 1800% 1800%;
color: white !important;
      border: white !important;
      
-webkit-animation: rainbow 18s ease infinite;
-z-animation: rainbow 18s ease infinite;
-o-animation: rainbow 18s ease infinite;
  animation: rainbow 18s ease infinite;}

@-webkit-keyframes rainbow {
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
}
@-moz-keyframes rainbow {
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
}
@-o-keyframes rainbow {
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
}
@keyframes rainbow { 
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
}
  
      .bluebow { 
background: linear-gradient(124deg, #304FFE, #000000);
background-size: 1800% 1800%;

-webkit-animation: rainbow 5s ease infinite;
-z-animation: rainbow 5s ease infinite;
-o-animation: rainbow 5s ease infinite;
  animation: rainbow 5s ease infinite;}

@-webkit-keyframes rainbow {
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
}
@-moz-keyframes rainbow {
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
}
@-o-keyframes rainbow {
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
}
@keyframes rainbow { 
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
}
  
  .symbol.rothree, a.rothree {
        background-color: #3F51B5;
    color: white !important;
        border-bottom: none !important;
        border-top: none !important;

}
  .symbol.black, a.black {
    background-color: #16161d !important;
    color: white !important;
        border-bottom: none !important;
        border-top: none !important;

  }
  .symbol.purple, a.purple {
        background-color: #009688 !important;
    color: white !important;
        border-bottom: none !important;
        border-top: none !important;


  }
  .sticky-wrap {
	overflow-x: auto;
	overflow-y: hidden;
	position: relative;
	margin: 3em 0;
	width: 100%;
}
.sticky-wrap div[class^='sticky'] {
	overflow: hidden;
}
.sticky-wrap tfoot {
	display: none;
}
.sticky-wrap div table {
	margin: 0;
	position: relative;
	width: auto; /* Prevent table from stretching to full size */
}
.sticky-wrap .sticky-thead,
.sticky-wrap .sticky-col,
.sticky-wrap .sticky-intersect {
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 50;
	transition: opacity .25s ease-in-out;
}
	.sticky-wrap .sticky-thead {
		box-shadow: 0 0.25em 0.1em -0.1em rgba(0,0,0,.125);
		z-index: 100;
		width: 100%; /* Force stretch */
	}
	.sticky-wrap .sticky-intersect {
		opacity: 1;
		z-index: 150;
	}
		.sticky-wrap .sticky-intersect th {
			background-color: #666;
			color: #eee;
		}
.sticky-wrap td,
.sticky-wrap th {
	box-sizing: border-box;
}
.sticky-wrap thead th {
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
}
.sticky-enabled {
	margin: 0;
	width: 100%;
}

/* Sort handlers */
.sticky-wrap.sortable thead {
	cursor: pointer;
}
.sticky-wrap.sortable thead th {
	padding-right: 3em;
	position: relative;
}
.sort-handle {
	display: block;
	position: absolute;
	top: 50%;
	right: -2em;
	width: 1em;
	height: 1em;
	margin-top: -.5em;
}
	.sort-handle:before,
	.sort-handle:after {
		content: '';
		position: absolute;
		left: 0;
		width: 0;
		height: 0;
		transition: .125s ease-in-out;
	}
		.sort-handle:before {
			border-top: .4em solid transparent;
			border-right: .5em solid transparent;
			border-bottom: .4em solid rgba(0,0,0,.25);
			border-left: .5em solid transparent;		
		}
		.sort-handle:after {
			border-top: .4em solid rgba(0,0,0,.25);
			border-right: .5em solid transparent;
			border-bottom: .4em solid transparent;
			border-left: .5em solid transparent;			
		}
			.sticky-intersect .sort-handle:before { border-bottom-color: rgba(255,255,255,.5); }
			.sticky-intersect .sort-handle:after  { border-top-color: rgba(255,255,255,.5); }

		.sort-default .sort-handle:before {
			opacity: 1;
			top: -0.4em;
		}
		.sort-default .sort-handle:after {
			opacity: 1;
			bottom: -0.4em;
		}
		.sort-asc .sort-handle:before {
			top: -0.1em;
		}
		.sort-asc .sort-handle:after {
			opacity: 0;
		}
		.sort-desc .sort-handle:before {
			opacity: 0;
		}
		.sort-desc .sort-handle:after {
			bottom: -0.1em;
		}

/* To hide sticky column and intersect when screen gets too narrow */
@media only screen and (max-width: 768px) {
	html {
		font-size: 14px;
	}
	header,
	#final .sticky-wrap {
		max-height: 25rem;
	}
	.sticky-col, .sticky-intersect {
		display: none;
	}
}
  .whiteRainbow {
    color: white !important;
  }
  .pchange {
    font-family: 'Inconsolata';
  }
  .transactions {
    font-family: 'Inconsolata';
  }
  .trollSymbol {
    background-color: #795548;
        border-bottom: none !important;
        border-top: none !important;

    color: white;
  }
        .tealSym {
  background-color: #009688;
              border-bottom: none !important;
        border-top: none !important;

}

.ro3Sym {
  background-color: #3F51B5;
      border-bottom: none !important;
        border-top: none !important;

}

.blackSym {
  background-color: #16161d;
      border-bottom: none !important;
        border-top: none !important;

}

.trollSym {
  background-color: #795548;
      border-bottom: none !important;
        border-top: none !important;

}

.stockInline {
  font-family: 'Inconsolata';
  background-color: #eff0f1;
  padding-left: 0.36em;
  padding-right: 0.36em;
  font-size: 0.87em;
}

.sym {
  height: 1em;
  width: 1em;
  display: inline-block;
      border-bottom: none !important;

}

  a {
    color: #3F51B5;
  }
  iframe {
      overflow-x:hidden;
  overflow-Y:hidden;
    background-color: white;
  }

.tooltip span, .tooltip-hidden {
    display:none;
}
.tooltip:hover span, .tooltip-hidden:hover span {
    display:block;
    position:fixed;
  bottom: 0;
    right: 0;
    overflow:hidden;
}
  
  
  .showbox {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 5%;
}

.loader {
  position: relative;
  margin: 0 auto;
  width: 100px;
}
.loader:before {
  content: '';
  display: block;
  padding-top: 100%;
}

.circular {
  -webkit-animation: rotate 2s linear infinite;
          animation: rotate 2s linear infinite;
  height: 100%;
  -webkit-transform-origin: center center;
          transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  -webkit-animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
          animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
}

@-webkit-keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

@keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@-webkit-keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
@-webkit-keyframes color {
  100%,
  0% {
    stroke: #d62d20;
  }
  40% {
    stroke: #0057e7;
  }
  66% {
    stroke: #008744;
  }
  80%,
  90% {
    stroke: #ffa700;
  }
}
@keyframes color {
  100%,
  0% {
    stroke: #d62d20;
  }
  40% {
    stroke: #0057e7;
  }
  66% {
    stroke: #008744;
  }
  80%,
  90% {
    stroke: #ffa700;
  }
}
  h3 {
    font-family: 'Playfair Display';
    font-size:200%;
    margin: 0.2em 0 !important;
  }
  .badclassname {
        display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
  }
  i {
  font-family: 'Material Icons';
  font-feature-settings: 'liga';
  font-weight: normal;
  font-style: normal;
  font-size:inherit;
  line-height:inherit;
  vertical-align: top;
  display: inline-block;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
}
  html {
  text-rendering: optimizeLegibility !important;
    
  }
  
  thead {
    cursor: pointer;
    background-color: white;
  }
  #tbl2-sticky > thead > th {
    border-bottom: 0px solid white !important;
  }
   iframe.dragging {pointer-events: none;}
  #chat_embed2 {height:200px;width:400px;position:absolute; top:0;left:0;

  }
  .pchange {
    border-bottom: none !important;
    border-top: none !important;
        border-right: none !important;

  }
  .tPaid {

  }
  .wrapper {
  position: relative;
  padding: 0 5px;
  height: 250px;
  overflow-y: auto;
}

/* Magnific popup */
#popup {
  position: relative;
  background: #FFF;
  padding: 20px;
  width: auto;
  max-width: 500px;
  margin: 20px auto;
}
/* Since the popup has a 20px margin, we need to adjust the wrapper position
Note:
 this is only required because we aren't actually attaching the sticky header
 to the #popup, instead we're attaching it to the .mfp-wrap because that
 element scrolls instead of the window
*/
#popup .tablesorter-sticky-wrapper {
  margin-left: 20px;
  margin-top: -20px;
}
</style>