(function(e){function t(e,n){if(!(this instanceof t))return new t(e,n);if(e instanceof t)return e;var i=t.require("Util");"string"==typeof e?(this.selector=e,this.elements=this.qsa(n,e)):this.elements=e instanceof Array?i.unique(e.filter(i.isElement)):i.isNodeList(e)?Array.prototype.slice.call(e).filter(i.isElement):i.isElement(e)?[e]:[],this._update()}t.version="0.1.0";var n={};t.require=function(e){return n[e]},t.define=function(e,i){n[e]=i.call(t.prototype)},e.Rye=t})(window),Rye.define("Util",function(){function e(e,t,n){if(e){if(e.forEach===g)return e.forEach(t,n);if(e.length===+e.length)for(var i=0;e.length>i;i++)t.call(n||e,e[i],i,e);else for(var r=Object.keys(e),i=0;r.length>i;i++){var s=r[i];t.call(n||e,e[s],s,e)}}}function t(t){return e(y.call(arguments,1),function(n){e(n,function(e,n){t[n]=e})}),t}function n(e,n){function i(){this.constructor=e}return t(e,n),i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e}function i(e){return e&&(1===e.nodeType||9===e.nodeType)}function r(e){return e&&m(["nodelist","htmlcollection","htmlformcontrolscollection"],e)}function s(e){return e.filter(function(t,n){return e.indexOf(t)==n})}function o(e,t){return e.map(function(e){return e[t]})}function u(e,t,n){return e.forEach(function(i,r){e[r][t]=n})}function c(e,t){var n,i=e[0].toUpperCase()+e.substring(1),r=["moz","webkit","ms","o"];if(t=t||window,n=t[e])return n;for(;(c=r.shift())&&!(n=t[c+i]););return n}function a(e,t,n,i,r){return"string"==typeof t&&(t=e[t]),function(){var s=y.call(arguments,0,i||1/0);return n&&(s=r?n.concat(s):s.concat(n)),"number"==typeof e&&(e=s[e]),t.apply(e||this,s)}}function l(e,t,n,i){return a(e,t,n,i)}function h(e,t,n,i){return a(e,t,n,i,!0)}function f(e){return h(this,e,y.call(arguments,1))}function p(e){return e.rye_id||(e.rye_id=x.next())}function d(e){var t=v.call(e).match(/\s(\w+)\]$/);return t&&t[1].toLowerCase()}function m(e,t){return e.indexOf(d(t))>=0}var y=Array.prototype.slice,g=Array.prototype.forEach,v=Object.prototype.toString,x={current:0,next:function(){return++this.current}};return{each:e,extend:t,inherits:n,isElement:i,isNodeList:r,unique:s,pluck:o,put:u,prefix:c,applyRight:l,applyLeft:h,curry:f,getUid:p,type:d,is:m}}),Rye.define("Data",function(){function e(e,t,r){var s=n.getUid(e),o=i[s]||(i[s]={});o[t]=r}function t(e,t){var r=i[n.getUid(e)];return null==t?r:r&&r[t]}var n=Rye.require("Util"),i={};return this.data=function(n,i){return void 0!==i?(this.each(function(t){e(t,n,i)}),this):1===this.elements.length?t(this.elements[0],n):this.elements.map(function(e){return t(e,n)})},{set:e,get:t}}),Rye.define("Query",function(){function e(n,i){var s,o;return n&&r.isElement(n)&&i?i.nodeType?n===i:i instanceof Rye?i.elements.some(function(t){return e(n,t)}):n===document?!1:(s=r.prefix("matchesSelector",c))?s.call(n,i):(n.parentNode||c.appendChild(n),o=t(n.parentNode,i).indexOf(n)>=0,n.parentNode===c&&c.removeChild(n),o):!1}function t(e,t){var n;e=e||document,!t.match(o)||"#"===RegExp.$1&&e!==document?n=u._:(n=u[RegExp.$1],t=RegExp.$2);var i=e[n](t);return r.isNodeList(i)?s.call(i):r.isElement(i)?[i]:[]}function n(t,n,i){do t=t[n];while(t&&(i&&!e(t,i)||!r.isElement(t)));return t}function i(e,t){return null==t?new Rye(e):new Rye(e).filter(t)}var r=Rye.require("Util"),s=Array.prototype.slice,o=/^([.#]?)([\w\-]+)$/,u={".":"getElementsByClassName","#":"getElementById","":"getElementsByTagName",_:"querySelectorAll"},c=document.createElement("div");return this.qsa=t,this.find=function(e){var n;return n=1===this.length?t(this.elements[0],e):this.elements.reduce(function(n,i){return n.concat(t(i,e))},[]),i(n)},this.filter=function(t,n){if("function"==typeof t){var r=t;return i(this.elements.filter(function(e,t){return r.call(e,e,t)!=(n||!1)}))}return t&&"!"===t[0]&&(t=t.substr(1),n=!0),i(this.elements.filter(function(i){return e(i,t)!=(n||!1)}))},this.contains=function(e){var n;return i(this.elements.reduce(function(i,r){return n=t(r,e),i.concat(n.length?r:null)},[]))},this.is=function(e){return this.length>0&&this.filter(e).length>0},this.not=function(e){return this.filter(e,!0)},this.index=function(e){return null==e?this.parent().children().indexOf(this.elements[0]):this.indexOf(new Rye(e).elements[0])},this.add=function(e,t){var n=e;return"string"==typeof e&&(n=new Rye(e,t).elements),this.concat(n)},this.pluckNode=function(e){return this.map(function(t){return n(t,e)})},this.next=function(){return i(this.pluckNode("nextSibling"))},this.prev=function(){return i(this.pluckNode("previousSibling"))},this.first=function(){return i(this.get(0))},this.last=function(){return i(this.get(-1))},this.siblings=function(e){var t=[];return this.each(function(e){s.call(e.parentNode.childNodes).forEach(function(n){r.isElement(n)&&n!==e&&t.push(n)})}),i(t,e)},this.parent=function(e){return i(this.pluck("parentNode"),e)},this.parents=function(e){for(var t=[],n=this.elements,r=function(e){return(e=e.parentNode)&&e!==document&&0>t.indexOf(e)?(t.push(e),e):void 0};n.length>0&&void 0!==n[0];)n=n.map(r);return i(t,e)},this.closest=function(t){return this.map(function(i){return e(i,t)?i:n(i,"parentNode",t)})},this.children=function(e){return i(this.elements.reduce(function(e,t){var n=s.call(t.children);return e.concat(n)},[]),e)},{matches:e,qsa:t,getClosestNode:n}}),Rye.define("Collection",function(){var e=Rye.require("Util"),t=Array.prototype.slice,n=Array.prototype.concat;this.get=function(e){return null==e?this.elements.slice():this.elements[0>e?this.elements.length+e:e]},this.eq=function(e){return null==e?new Rye:new Rye(this.get(e))},["forEach","reduce","reduceRight","indexOf"].forEach(function(e){this[e]=function(t,n,i,r){return this.elements[e](t,n,i,r)}}.bind(this)),["map","sort"].forEach(function(e){this[e]=function(t,n,i,r){return new Rye(this.elements[e](t,n,i,r))}}.bind(this)),this.each=function(e){return this.elements.forEach(e),this},this.iterate=function(e,t){return function(n,i,r,s){return this.each(function(o){e.call(t,o,n,i,r,s)})}},this.push=function(t){return e.isElement(t)?(this.elements.push(t),this._update(),this.length-1):-1},this.slice=function(e,n){return new Rye(t.call(this.elements,e,n))},this.concat=function(){var e=t.call(arguments).map(function(e){return e instanceof Rye?e.elements:e});return new Rye(n.apply(this.elements,e))},this.pluck=function(t){return e.pluck(this.elements,t)},this.put=function(t,n){return e.put(this.elements,t,n),this},this._update=function(){this.length=this.elements.length}}),Rye.define("Manipulation",function(){function e(e){return e.multiple?new Rye(e).find("option").filter(function(e){return e.selected&&!e.disabled}).pluck("value"):e.value}function t(t,n){return"value"===n&&"INPUT"==t.nodeName?e(t):t.getAttribute(n)}function n(e,t){"string"==typeof t?e.insertAdjacentHTML("beforeend",t):e.appendChild(t)}function i(e,t){var n;"string"==typeof t?e.insertAdjacentHTML("afterbegin",t):(n=e.childNodes[0])?e.insertBefore(t,n):e.appendChild(t)}function r(e,t){var n;"string"==typeof t?e.insertAdjacentHTML("afterend",t):(n=c.getClosestNode(e,"nextSibling"))?e.parentNode.insertBefore(t,n):e.parentNode.appendChild(t)}function s(e,t){"string"==typeof t?e.insertAdjacentHTML("beforebegin",t):e.parentNode.insertBefore(t,e)}function o(e,t){this[t]=function(n){return"string"!=typeof n&&(n instanceof Rye?n=n.elements:u.isNodeList(n)&&(n=a.call(n)),Array.isArray(n))?(/prepend|before/.test(t)&&(n=a.call(n,0).reverse()),n.forEach(this[t].bind(this))):(1===this.length?e(this.elements[0],n):this.each(function(t,i){var r=i>0?n.cloneNode(!0):n;e(t,r)}),this)}}var u=Rye.require("Util"),c=Rye.require("Query"),a=Array.prototype.slice;return u.each({append:n,prepend:i,after:r,before:s},o.bind(this)),this.text=function(e){return null==e?this.elements[0]&&this.elements[0].textContent:this.each(function(t){t.textContent=e})},this.html=function(e){return null==e?this.elements[0]&&this.elements[0].innerHTML:this.each(function(t){t.innerHTML=e})},this.empty=function(){return this.put("innerHTML","")},this.clone=function(){return this.map(function(e){return e.cloneNode(!0)})},this.remove=function(){return this.each(function(e){e.parentNode&&e.parentNode.removeChild(e)})},this.val=function(t){return null==t?this.elements[0]&&e(this.elements[0]):this.each(function(e){e.value=t})},this.attr=function(e,n){return"object"==typeof e?this.each(function(t){u.each(e,function(e,n){t.setAttribute(n,e)})}):n===void 0?this.elements[0]&&t(this.elements[0],e):this.each(function(t){t.setAttribute(e,n)})},this.prop=function(e,t){return"object"==typeof e?this.each(function(t){u.each(e,function(e,n){t[n]=e})}):t===void 0?this.elements[0]&&this.elements[0][e]:this.put(e,t)},Rye.create=function(e){var t,n=document.createElement("div");return n.innerHTML=e,t=a.call(n.childNodes),t.forEach(function(e){n.removeChild(e)}),new Rye(t)},{getValue:e,getAttribute:t,append:n,prepend:i,after:r,before:s}}),Rye.define("Events",function(){function e(){this.events={},this.context=null}function t(e){var t=c.getUid(e);return h[t]||(h[t]=new s(e))}function n(e){var t=e.indexOf(" ");return t>0?e.substr(0,t):e}function i(e){var t=e.indexOf(" ");return t>0?e.substr(t):""}function r(e,t){"string"!=typeof e&&(e=e.type);var n=-1!=["click","mousedown","mouseup","mousemove"].indexOf(e),i=document.createEvent(n?"MouseEvent":"Event");return t&&c.extend(i,t),i.initEvent(e,!0,!0),i}function s(t){e.call(this),this.element=t,this.proxied={}}function o(e){var t=s.prototype[e];s.prototype[e]=function(e,n){var i=this;return"string"!=typeof e?c.each(e,function(e,n){t.call(i,n,e)}):t.call(i,e,n),i}}function u(e,n,i,r){t(n)[e](i,r)}var c=Rye.require("Util"),a=Rye.require("Query"),l=Array.prototype.slice;e.prototype.addListener=function(e,t){var n=this.events[e]||(this.events[e]=[]);return n.push(t),this},e.prototype.once=function(e,t){function n(){t.apply(this,arguments),i.removeListener(e,n)}var i=this;return this.addListener(e,n)},e.prototype.removeListener=function(e,t){var n=this,i=this.events[e];return"*"===e?t?c.each(this.events,function(e,i){n.removeListener(i,t)}):this.events={}:t&&i?(i.splice(i.indexOf(t),1),0===i.length&&delete this.events[e]):delete this.events[e],this},e.prototype.emit=function(e){var t=this.events[e],n=l.call(arguments,1),i=this.context||this;return t&&c.each(t,function(e){e.apply(i,n)}),this},e.prototype.proxy=function(e){return c.applyLeft(this,this.emit,[e])};var h={};c.inherits(s,e),s.prototype._proxy=function(e){return function(t){var n=i(e),r=this.element;if(n){for(r=t.target;r&&!a.matches(r,n);)r=r!==this.element&&r.parentNode;if(!r||r==this.element)return}this.context=r,this.emit(e,t,this.element)}.bind(this)},s.prototype.proxy=function(e){return this.proxied[e]||(this.proxied[e]=this._proxy(e))},s.prototype.addListener=function(t,i){return e.prototype.addListener.call(this,t,i),this.proxied[t]||this.element.addEventListener(n(t),this.proxy(t),!1),this},s.prototype.removeListener=function(t,i){if(t.indexOf("*")>=0){var r=this,s=RegExp("^"+t.replace("*","\\b"));c.each(this.events,function(e,t){s.test(t)&&r.removeListener(t,i)})}else{var o=this.proxied[t];e.prototype.removeListener.call(this,t,i),!this.events[t]&&o&&(this.element.removeEventListener(n(t),o,!1),delete this.proxied[t])}return this},["addListener","once","removeListener"].forEach(o),s.prototype.destroy=function(){return this.removeListener("*")},s.prototype.trigger=function(e,t){return e instanceof window.Event||(e=r(e)),e.data=t,this.element.dispatchEvent(e),this};var f={};["addListener","removeListener","once","trigger"].forEach(function(e){var t=c.curry(u,e);f[e]=t,this[e]=this.iterate(t)}.bind(this)),[e.prototype,s.prototype,this].forEach(function(e){e.on=e.addListener});var p=new e;return Rye.subscribe=p.addListener.bind(p),Rye.unsubscribe=p.removeListener.bind(p),Rye.publish=p.emit.bind(p),{EventEmitter:e,DOMEventEmitter:s,getEmitter:t,createEvent:r,addListener:f.addListener,once:f.once,removeListener:f.removeListener,trigger:f.trigger}}),Rye.define("Style",function(){function e(e,t){return e.style.getPropertyValue(t)||window.getComputedStyle(e,null).getPropertyValue(t)}function t(e,t,n){"number"==typeof n&&-1===u.indexOf(t)&&(n+="px");var i=null===n||""===n?"remove":"set";return e.style[i+"Property"](t,""+n),e}function n(e,t){return t=t.trim(),e.classList?e.classList.contains(t):-1!==(" "+e.className+" ").indexOf(" "+t+" ")}function i(e,t){if(e.classList)t.replace(/\S+/g,function(t){e.classList.add(t)});else{var n,i=" "+e.className+" ";for(t=t.trim().split(/\s+/);n=t.shift();)-1===i.indexOf(" "+n+" ")&&(i+=n+" ");e.className=i.trim()}return e}function r(e,t){if("*"===t)e.className="";else{if(t instanceof RegExp)t=[t];else{if(e.classList&&-1===t.indexOf("*"))return t.replace(/\S+/g,function(t){e.classList.remove(t)}),void 0;t=t.trim().split(/\s+/)}for(var n,i=" "+e.className+" ";n=t.shift();)if(n.indexOf&&-1!==n.indexOf("*")&&(n=RegExp("\\s*\\b"+n.replace("*","\\S*")+"\\b\\s*","g")),n instanceof RegExp)i=i.replace(n," ");else for(;-1!==i.indexOf(" "+n+" ");)i=i.replace(" "+n+" "," ");e.className=i.trim()}return e}var s=Rye.require("Util"),o=Rye.require("Data"),u="fill-opacity font-weight line-height opacity orphans widows z-index zoom".split(" ");return this.show=this.iterate(function(e){t(e,"display",o.get(e,"_display")||"block")}),this.hide=this.iterate(function(n){var i=e(n,"display");"none"!==i&&o.set(n,"_display",i),t(n,"display","none")}),this.css=function(n,i){return null==i?"string"==typeof n?this.elements[0]&&e(this.elements[0],n):this.each(function(e){s.each(n,function(n,i){t(e,i,n)})}):this.each(function(e){t(e,n,i)})},this.hasClass=function(e){var t=!1;return this.each(function(i){t=t||n(i,e)}),!!t},this.addClass=this.iterate(i),this.removeClass=this.iterate(r),this.toggleClass=this.iterate(function(e,t,s){null==s&&(s=!n(e,t)),(s?i:r)(e,t)}),{getCSS:e,setCSS:t,hasClass:n,addClass:i,removeClass:r}}),Rye.define("TouchEvents",function(){function e(e){return"tagName"in e?e:e.parentNode}function t(e){n.extend(this,e),t.all.push(this)}var n=Rye.require("Util"),i=Rye.require("Events"),r={};if(t.all=[],t.cancelAll=function(){t.all.forEach(function(e){e.cancel()}),r={}},t.prototype.schedule=function(){this.timeout=setTimeout(this._trigger.bind(this),this.delay)},t.prototype._trigger=function(){this.timeout=null,this.trigger()},t.prototype.cancel=function(){this.timeout&&clearTimeout(this.timeout),this.timeout=null},i&&("ontouchstart"in window||window.mocha)){var s=new t({delay:0,trigger:function(){var e=i.createEvent("tap");e.cancelTouch=t.cancelAll,i.trigger(r.element,e),r.isDoubleTap?(i.trigger(r.element,"doubletap"),r={}):o.schedule()}}),o=new t({delay:250,trigger:function(){i.trigger(r.element,"singletap"),r={}}}),u=new t({delay:750,trigger:function(){r.last&&(i.trigger(r.element,"longtap"),r={})}}),c=new t({delay:0,trigger:function(){i.trigger(r.element,"swipe"),i.trigger(r.element,"swipe"+this.direction()),r={}},direction:function(){return Math.abs(r.x1-r.x2)>=Math.abs(r.y1-r.y2)?r.x1-r.x2>0?"left":"right":r.y1-r.y2>0?"up":"down"}});i.addListener(document.body,"touchstart",function(t){var n=Date.now();o.cancel(),r.element=e(t.touches[0].target),r.x1=t.touches[0].pageX,r.y1=t.touches[0].pageY,r.last&&250>=n-r.last&&(r.isDoubleTap=!0),r.last=n,u.schedule()}),i.addListener(document.body,"touchmove",function(e){u.cancel(),r.x2=e.touches[0].pageX,r.y2=e.touches[0].pageY}),i.addListener(document.body,"touchend",function(){u.cancel(),Math.abs(r.x1-r.x2)>30||Math.abs(r.y1-r.y2)>30?c.schedule():"last"in r&&s.schedule()}),i.addListener(document.body,"touchcancel",t.cancelAll),i.addListener(window,"scroll",t.cancelAll)}}),Rye.define("Request",function(){function e(e){var t=[];return function n(e,i){c.each(e,function(r,s){r=e[s],i&&(s=i+"["+(Array.isArray(e)?"":s)+"]"),c.is(["array","object"],r)?n(r,s):t.push(h(s)+"="+h(r))})}(e),t.join("&").replace(/%20/g,"+")}function t(e,t){return(e+"&"+t).replace(/[&?]+/,"?")}function n(n){n.data&&"string"!=typeof n.data&&(n.data=e(n.data)),n.data&&"GET"===n.method&&(n.url=t(n.url,n.data))}function i(e){return e&&(e.split("/")[1]||e)}function r(e){var t=e.response;if(null===t)return Error("Parser Error");if("object"!=typeof t)try{t=JSON.parse(e.responseText)}catch(n){return n}return t}function s(e){var t=e.responseXML;if(t.xml&&window.DOMParser)try{var n=new window.DOMParser;t=n.parseFromString(t.xml,"text/xml")}catch(i){return i}return t}function o(e,t){"string"==typeof e&&(e={url:e}),t||(t=e.callback||l);var o=c.extend({},p,e),u=new window.XMLHttpRequest,a=o.accepts[o.responseType],h=null,d={};return o.method=o.method.toUpperCase(),n(o),a&&(d.Accept=a,u.overrideMimeType&&u.overrideMimeType(a.split(",")[0])),(o.contentType||["POST","PUT"].indexOf(o.method)>=0)&&(d["Content-Type"]=o.contentType||"application/x-www-form-urlencoded"),c.extend(d,o.headers||{}),u.onreadystatechange=function(){var e,n;if(4==u.readyState&&u.status){if(u.onreadystatechange=l,clearTimeout(h),u.status>=200&&300>u.status||304==u.status){switch(u.type=o.responseType||u.responseType||i(u.getResponseHeader("content-type")),u.type){case"json":n=r(u);break;case"xml":n=s(u);break;default:n=u.responseText}n instanceof Error&&(e=n,n=void 0)}else e=Error("Request failed");t.call(u,e,n,u)}},u.ontimeout=function(){t.call(u,Error("Timeout"),null,u)},u.open(o.method,o.url,o.async),!("timeout"in u)&&o.timeout>0&&(h=setTimeout(function(){u.onreadystatechange=l,u.abort(),u.ontimeout()},o.timeout)),c.each(o,function(e,t){if("responseType"!==t||f.types.indexOf(e)>=0)try{u[t]=e}catch(n){}}),c.each(d,function(e,t){u.setRequestHeader(t,e)}),u.send(o.data),u}function u(e,t,n){return"string"==typeof t&&(t={url:t}),t.method=e,o(t,n)}var c=Rye.require("Util"),a=Rye.require("Manipulation"),l=function(){},h=encodeURIComponent,f={types:["arraybuffer","blob","document","json","text"],json:"application/json",xml:"application/xml, text/xml",html:"text/html, application/xhtml+xml",text:"text/plain"},p={method:"GET",url:""+window.location,async:!0,accepts:f,callback:l,timeout:0},d="fieldset submit reset button image radio checkbox".split(" ");this.serialize=function(){var t=this.get(0),n={};return new Rye(t&&t.elements).forEach(function(e){!e.disabled&&(e.checked||e.type&&0>d.indexOf(e.type))&&(n[e.name]=a.getValue(e))}),e(n)},Rye.request=o,Rye.get=c.curry(u,"GET"),Rye.post=c.curry(u,"POST");var m=o.bind({});return c.extend(m,{serialize:e,appendQuery:t,defaults:p,get:c.curry(u,"GET"),post:c.curry(u,"POST")}),m});
;(function(global){

	var library   = {}
	var instances = {}

	function define (name, factory) {
		if (library[name]) {
			throw new Error('Module '+ name +' already registered.')
		}
		library[name] = factory
	}

	function require ( name ) {
		if ( !library[ name ] ) {
			throw new Error('Module '+ name +' not registered.')
		}
		return instances[name] || (instances[name] = library[name].call(global))
	}

	global.define = define
	global.require = require

})(this);

define('components', function () {

	var jQuery = window.jQuery
	var _each  = Array.prototype.forEach
	var _slice = Array.prototype.slice
	var _extend = Rye.require('Util').extend;

	function init (context) {
		var elements = (context || document).querySelectorAll('[data-component]')
		_each.call(elements, loadComponent)
	}

	function create (name, def) {
		var Constructor = function (element) {
			this.el  = element
			this.$el = Rye(element)
			this.initialize.apply(this, _slice.call(arguments, 1))
		}
		Constructor.name = name
		_extend(Constructor.prototype, def)
		define('components/' + name, function () {
			return Constructor
		})
	}

	function loadComponent (element) {
		var name      = element.getAttribute('data-component')
		var Component = require('components/' + name)
		var instance  = new Component(element)
		Rye(element).data('component-' + name, instance)
	}

	function getComponent (element, name) {
		return Rye(element).data('component-' + name)
	}

	return {
		init   : init,
	    get    : getComponent,
	    create : create
	}

})

/** smooth-scroll v5.2.0, by Chris Ferdinandi | http://github.com/cferdinandi/smooth-scroll | Licensed under MIT: http://gomakethings.com/mit/ */
!function(t,e){"function"==typeof define&&define.amd?define("smoothScroll",e(t)):"object"==typeof exports?module.exports=e(t):t.smoothScroll=e(t)}(window||this,function(t){"use strict";var e,n={},o=!!document.querySelector&&!!t.addEventListener,r={speed:500,easing:"easeInOutCubic",offset:0,updateURL:!0,callbackBefore:function(){},callbackAfter:function(){}},a=function(t,e,n){if("[object Object]"===Object.prototype.toString.call(t))for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.call(n,t[o],o,t);else for(var r=0,a=t.length;a>r;r++)e.call(n,t[r],r,t)},c=function(t,e){var n={};return a(t,function(e,o){n[o]=t[o]}),a(e,function(t,o){n[o]=e[o]}),n},u=function(t,e){for(var n=e.charAt(0);t&&t!==document;t=t.parentNode)if("."===n){if(t.classList.contains(e.substr(1)))return t}else if("#"===n){if(t.id===e.substr(1))return t}else if("["===n&&t.hasAttribute(e.substr(1,e.length-2)))return t;return!1},i=function(t){for(var e,n=String(t),o=n.length,r=-1,a="",c=n.charCodeAt(0);++r<o;){if(e=n.charCodeAt(r),0===e)throw new InvalidCharacterError("Invalid character: the input contains U+0000.");a+=e>=1&&31>=e||127==e||0===r&&e>=48&&57>=e||1===r&&e>=48&&57>=e&&45===c?"\\"+e.toString(16)+" ":e>=128||45===e||95===e||e>=48&&57>=e||e>=65&&90>=e||e>=97&&122>=e?n.charAt(r):"\\"+n.charAt(r)}return a},s=function(t,e){var n;return"easeInQuad"===t&&(n=e*e),"easeOutQuad"===t&&(n=e*(2-e)),"easeInOutQuad"===t&&(n=.5>e?2*e*e:-1+(4-2*e)*e),"easeInCubic"===t&&(n=e*e*e),"easeOutCubic"===t&&(n=--e*e*e+1),"easeInOutCubic"===t&&(n=.5>e?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1),"easeInQuart"===t&&(n=e*e*e*e),"easeOutQuart"===t&&(n=1- --e*e*e*e),"easeInOutQuart"===t&&(n=.5>e?8*e*e*e*e:1-8*--e*e*e*e),"easeInQuint"===t&&(n=e*e*e*e*e),"easeOutQuint"===t&&(n=1+--e*e*e*e*e),"easeInOutQuint"===t&&(n=.5>e?16*e*e*e*e*e:1+16*--e*e*e*e*e),n||e},f=function(t,e,n){var o=0;if(t.offsetParent)do o+=t.offsetTop,t=t.offsetParent;while(t);return o=o-e-n,o>=0?o:0},l=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},d=function(t){return t&&"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(t):{}},h=function(t,e){history.pushState&&(e||"true"===e)&&history.pushState({pos:t.id},"",window.location.pathname+t)};n.animateScroll=function(e,n,o){var a=c(a||r,o||{}),u=d(e?e.getAttribute("data-options"):null);a=c(a,u),n="#"+i(n.substr(1));var p,m,b,v=document.querySelector(n),g=document.querySelector("[data-scroll-header]"),O=null===g?0:g.offsetHeight+g.offsetTop,y=t.pageYOffset,I=f(v,O,parseInt(a.offset,10)),S=I-y,w=l(),A=0;h(n,a.updateURL);var Q=function(o,r,c){var u=t.pageYOffset;(o==r||u==r||t.innerHeight+u>=w)&&(clearInterval(c),v.focus(),a.callbackAfter(e,n))},C=function(){A+=16,m=A/parseInt(a.speed,10),m=m>1?1:m,b=y+S*s(a.easing,m),t.scrollTo(0,Math.floor(b)),Q(b,I,p)},H=function(){a.callbackBefore(e,n),p=setInterval(C,16)};0===t.pageYOffset&&t.scrollTo(0,0),H()};var p=function(t){var o=u(t.target,"[data-scroll]");o&&"a"===o.tagName.toLowerCase()&&(t.preventDefault(),n.animateScroll(o,o.hash,e,t))};return n.destroy=function(){e&&(document.removeEventListener("click",p,!1),e=null)},n.init=function(t){o&&(n.destroy(),e=c(r,t||{}),document.addEventListener("click",p,!1))},n});
define('smoothScroll',function(){return smoothScroll})
require('components').create('form-label-dynamic', {
	initialize: function ( ) {
		this.$label = this.$el.find( '.form-label' );
		this.$field = this.$el.find( '.form-input' );

		this.$field.on( 'keydown', this.pressed.bind( this ) );
		this.$field.on( 'keyup', this.pressed.bind( this ) );

		this.pressed();
	},

	pressed: function ( event ) {
		setTimeout( function ( ) {
			if ( !this.hasContent && this.$field.val().length ) {
				this.$el.addClass( '-has-content' );
				this.hasContent = true;
			}
			else if ( this.hasContent && !this.$field.val().length ) {
				this.$el.removeClass( '-has-content' );
				this.hasContent = false;
			}
		}.bind( this ), 4 );
	}
} );
require( 'components' ).create( 'navigation-mobile', {
	initialize: function ( ) {
		this.$el.on( 'click', this.menuToggle.bind( this ) )
	},

	menuToggle: function ( event ) {
		event.preventDefault();
		event.stopPropagation();
		Rye( '.nav' ).toggleClass( '-opened' );
		this.$el.toggleClass( '-opened' );
	}
} );
require( 'components' ).create( 'navigation', {
	initialize: function ( ) {
		window.addEventListener( 'scroll', this.scrolled.bind( this ) );
		window.addEventListener( 'resize', this.calculatePositions.bind( this ) );

		this.$el.find( 'a' ).on( 'click', this.menuClose.bind( this ) )

		setTimeout( this.calculatePositions.bind( this ), 100 );
	},

	calculatePositions: function ( ) {
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

		if ( this.navFixed ) {
			this.$el.removeClass( '-fixed' );
			this.navFixed = false;
		}

		this.navTop = this.el.getBoundingClientRect().top + scrollTop;
		this.navHeight = this.el.offsetHeight;

		this.scrolled();
	},

	scrolled: function ( ) {
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		if ( scrollTop > this.navTop && !this.navFixed ) {
			this.$el.addClass( '-fixed' );
			this.navFixed = true;
		}
		else if ( scrollTop <= this.navTop && this.navFixed ) {
			this.$el.removeClass( '-fixed' );
			this.navFixed = false;
		}
	},

	menuClose: function ( event ) {
		this.$el.removeClass( '-opened' );
		Rye( '.nav-open' ).removeClass( '-opened' );
	}
} );
require('components').init();

require('smoothScroll').init( {
	offset: 50
} );