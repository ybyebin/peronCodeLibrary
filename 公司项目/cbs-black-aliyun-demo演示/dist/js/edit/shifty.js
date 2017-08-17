!function(t){var n=function(){"use strict";function n(){}function e(t,n){var e;for(e in t)Object.hasOwnProperty.call(t,e)&&n(e)}function r(t,n){return e(n,function(e){t[e]=n[e]}),t}function i(t,n){e(n,function(e){void 0===t[e]&&(t[e]=n[e])})}function o(t,n,e,r,i,o,a){var s,c=(t-o)/i;for(s in n)n.hasOwnProperty(s)&&(n[s]=u(e[s],r[s],h[a[s]],c));return n}function u(t,n,e,r){return t+(n-t)*e(r)}function a(t,n){var r=f.prototype.filter,i=t._filterArgs;e(r,function(e){void 0!==r[e][n]&&r[e][n].apply(t,i)})}function s(t,n,e,r,i,u,s,c,f){m=n+e,d=Math.min(g(),m),v=d>=m,t.isPlaying()&&!v?(f(t._timeoutHandler,w),a(t,"beforeTween"),o(d,r,i,u,e,n,s),a(t,"afterTween"),c(r)):v&&(c(u),t.stop(!0))}function c(t,n){var r={};return"string"==typeof n?e(t,function(t){r[t]=n}):e(t,function(t){r[t]||(r[t]=n[t]||l)}),r}function f(t,n){this._currentState=t||{},this._configured=!1,this._scheduleFunction=p,void 0!==n&&this.setConfig(n)}var h,p,l="linear",w=1e3/60,_=Date.now?Date.now:function(){return+new Date},g=_;p="undefined"!=typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||window.mozCancelRequestAnimationFrame&&window.mozRequestAnimationFrame||setTimeout:setTimeout;var m,d,v;return f.prototype.tween=function(t){return this._isTweening?this:(void 0===t&&this._configured||this.setConfig(t),this._start(this.get()),this.resume())},f.prototype.setConfig=function(t){t=t||{},this._configured=!0,this._pausedAtTime=null,this._start=t.start||n,this._step=t.step||n,this._finish=t.finish||n,this._duration=t.duration||500,this._currentState=t.from||this.get(),this._originalState=this.get(),this._targetState=t.to||this.get(),this._timestamp=g();var e=this._currentState,r=this._targetState;return i(r,e),this._easing=c(e,t.easing||l),this._filterArgs=[e,this._originalState,r,this._easing],a(this,"tweenCreated"),this},f.prototype.get=function(){return r({},this._currentState)},f.prototype.set=function(t){this._currentState=t},f.prototype.pause=function(){return this._pausedAtTime=g(),this._isPaused=!0,this},f.prototype.resume=function(){this._isPaused&&(this._timestamp+=g()-this._pausedAtTime),this._isPaused=!1,this._isTweening=!0;var t=this;return this._timeoutHandler=function(){s(t,t._timestamp,t._duration,t._currentState,t._originalState,t._targetState,t._easing,t._step,t._scheduleFunction)},this._timeoutHandler(),this},f.prototype.stop=function(t){return this._isTweening=!1,this._isPaused=!1,this._timeoutHandler=n,t&&(r(this._currentState,this._targetState),a(this,"afterTweenEnd"),this._finish.call(this,this._currentState)),this},f.prototype.isPlaying=function(){return this._isTweening&&!this._isPaused},f.prototype.setScheduleFunction=function(t){this._scheduleFunction=t},f.prototype.dispose=function(){var t;for(t in this)this.hasOwnProperty(t)&&delete this[t]},f.prototype.filter={},f.prototype.formula={linear:function(t){return t}},h=f.prototype.formula,r(f,{now:g,each:e,tweenProps:o,tweenProp:u,applyFilter:a,shallowCopy:r,defaults:i,composeEasingObject:c}),"object"==typeof exports?module.exports=f:"function"==typeof define&&define.amd?define(function(){return f}):void 0===t.Tweenable&&(t.Tweenable=f),f}();(function(){n.shallowCopy(n.prototype.formula,{easeInQuad:function(t){return Math.pow(t,2)},easeOutQuad:function(t){return-(Math.pow(t-1,2)-1)},easeInOutQuad:function(t){return 1>(t/=.5)?.5*Math.pow(t,2):-.5*((t-=2)*t-2)},easeInCubic:function(t){return Math.pow(t,3)},easeOutCubic:function(t){return Math.pow(t-1,3)+1},easeInOutCubic:function(t){return 1>(t/=.5)?.5*Math.pow(t,3):.5*(Math.pow(t-2,3)+2)},easeInQuart:function(t){return Math.pow(t,4)},easeOutQuart:function(t){return-(Math.pow(t-1,4)-1)},easeInOutQuart:function(t){return 1>(t/=.5)?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},easeInQuint:function(t){return Math.pow(t,5)},easeOutQuint:function(t){return Math.pow(t-1,5)+1},easeInOutQuint:function(t){return 1>(t/=.5)?.5*Math.pow(t,5):.5*(Math.pow(t-2,5)+2)},easeInSine:function(t){return 1-Math.cos(t*(Math.PI/2))},easeOutSine:function(t){return Math.sin(t*(Math.PI/2))},easeInOutSine:function(t){return-.5*(Math.cos(Math.PI*t)-1)},easeInExpo:function(t){return 0===t?0:Math.pow(2,10*(t-1))},easeOutExpo:function(t){return 1===t?1:1-Math.pow(2,-10*t)},easeInOutExpo:function(t){return 0===t?0:1===t?1:1>(t/=.5)?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*--t))},easeInCirc:function(t){return-(Math.sqrt(1-t*t)-1)},easeOutCirc:function(t){return Math.sqrt(1-Math.pow(t-1,2))},easeInOutCirc:function(t){return 1>(t/=.5)?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeOutBounce:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},easeInBack:function(t){var n=1.70158;return t*t*((n+1)*t-n)},easeOutBack:function(t){var n=1.70158;return(t-=1)*t*((n+1)*t+n)+1},easeInOutBack:function(t){var n=1.70158;return 1>(t/=.5)?.5*t*t*((1+(n*=1.525))*t-n):.5*((t-=2)*t*((1+(n*=1.525))*t+n)+2)},elastic:function(t){return-1*Math.pow(4,-8*t)*Math.sin(2*(6*t-1)*Math.PI/2)+1},swingFromTo:function(t){var n=1.70158;return 1>(t/=.5)?.5*t*t*((1+(n*=1.525))*t-n):.5*((t-=2)*t*((1+(n*=1.525))*t+n)+2)},swingFrom:function(t){var n=1.70158;return t*t*((n+1)*t-n)},swingTo:function(t){var n=1.70158;return(t-=1)*t*((n+1)*t+n)+1},bounce:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},bouncePast:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?2-(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?2-(7.5625*(t-=2.25/2.75)*t+.9375):2-(7.5625*(t-=2.625/2.75)*t+.984375)},easeFromTo:function(t){return 1>(t/=.5)?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},easeFrom:function(t){return Math.pow(t,4)},easeTo:function(t){return Math.pow(t,.25)}})})(),function(){function t(t,n,e,r,i,o){function u(t){return((h*t+p)*t+l)*t}function a(t){return((w*t+_)*t+g)*t}function s(t){return(3*h*t+2*p)*t+l}function c(t){return t>=0?t:0-t}function f(t,n){var e,r,i,o,a,f;for(i=t,f=0;8>f;f++){if(o=u(i)-t,n>c(o))return i;if(a=s(i),1e-6>c(a))break;i-=o/a}if(e=0,r=1,i=t,e>i)return e;if(i>r)return r;for(;r>e;){if(o=u(i),n>c(o-t))return i;t>o?e=i:r=i,i=.5*(r-e)+e}return i}var h=0,p=0,l=0,w=0,_=0,g=0;return l=3*n,p=3*(r-n)-l,h=1-l-p,g=3*e,_=3*(i-e)-g,w=1-g-_,function(t,n){return a(f(t,n))}(t,function(t){return 1/(200*t)}(o))}function e(n,e,r,i){return function(o){return t(o,n,e,r,i,1)}}n.setBezierFunction=function(t,r,i,o,u){var a=e(r,i,o,u);return a.x1=r,a.y1=i,a.x2=o,a.y2=u,n.prototype.formula[t]=a},n.unsetBezierFunction=function(t){delete n.prototype.formula[t]}}(),function(){function t(t,e,r,i,o){return n.tweenProps(i,e,t,r,1,0,o)}var e=new n;e._filterArgs=[],n.interpolate=function(r,i,o,u){var a=n.shallowCopy({},r),s=n.composeEasingObject(r,u||"linear");e.set({});var c=e._filterArgs;c.length=0,c[0]=a,c[1]=r,c[2]=i,c[3]=s,n.applyFilter(e,"tweenCreated"),n.applyFilter(e,"beforeTween");var f=t(r,a,i,o,s);return n.applyFilter(e,"afterTween"),f}}(),function(t){function n(t,n){k.length=0;var e,r=t.length;for(e=0;r>e;e++)k.push("_"+n+"_"+e);return k}function e(t){var n=t.match(y);return n?1===n.length&&n.unshift(""):n=["",""],n.join(T)}function r(n){t.each(n,function(t){var e=n[t];"string"==typeof e&&e.match(I)&&(n[t]=i(e))})}function i(t){return s(I,t,o)}function o(t){var n=u(t);return"rgb("+n[0]+","+n[1]+","+n[2]+")"}function u(t){return t=t.replace(/#/,""),3===t.length&&(t=t.split(""),t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),F[0]=a(t.substr(0,2)),F[1]=a(t.substr(2,2)),F[2]=a(t.substr(4,2)),F}function a(t){return parseInt(t,16)}function s(t,n,e){var r=n.match(t),i=n.replace(t,T);if(r)for(var o,u=r.length,a=0;u>a;a++)o=r.shift(),i=i.replace(T,e(o));return i}function c(t){return s(O,t,f)}function f(t){for(var n=t.match(M),e=n.length,r=t.match(b)[0],i=0;e>i;i++)r+=parseInt(n[i],10)+",";return r=r.slice(0,-1)+")"}function h(r){var i={};return t.each(r,function(t){var o=r[t];if("string"==typeof o){var u=m(o);i[t]={formatString:e(o),chunkNames:n(u,t)}}}),i}function p(n,e){t.each(e,function(t){for(var r=n[t],i=m(r),o=i.length,u=0;o>u;u++)n[e[t].chunkNames[u]]=+i[u];delete n[t]})}function l(n,e){t.each(e,function(t){var r=n[t],i=w(n,e[t].chunkNames),o=_(i,e[t].chunkNames);r=g(e[t].formatString,o),n[t]=c(r)})}function w(t,n){for(var e,r={},i=n.length,o=0;i>o;o++)e=n[o],r[e]=t[e],delete t[e];return r}function _(t,n){S.length=0;for(var e=n.length,r=0;e>r;r++)S.push(t[n[r]]);return S}function g(t,n){for(var e=t,r=n.length,i=0;r>i;i++)e=e.replace(T,+n[i].toFixed(4));return e}function m(t){return t.match(M)}function d(n,e){t.each(e,function(t){for(var r=e[t],i=r.chunkNames,o=i.length,u=n[t].split(" "),a=u[u.length-1],s=0;o>s;s++)n[i[s]]=u[s]||a;delete n[t]})}function v(n,e){t.each(e,function(t){for(var r=e[t],i=r.chunkNames,o=i.length,u="",a=0;o>a;a++)u+=" "+n[i[a]],delete n[i[a]];n[t]=u.substr(1)})}var y=/([^\-0-9\.]+)/g,M=/[0-9.\-]+/g,O=RegExp("rgb\\("+M.source+/,\s*/.source+M.source+/,\s*/.source+M.source+"\\)","g"),b=/^.*\(/,I=/#([0-9]|[a-f]){3,6}/gi,T="VAL",k=[],F=[],S=[];t.prototype.filter.token={tweenCreated:function(t,n,e){r(t),r(n),r(e),this._tokenData=h(t)},beforeTween:function(t,n,e,r){d(r,this._tokenData),p(t,this._tokenData),p(n,this._tokenData),p(e,this._tokenData)},afterTween:function(t,n,e,r){l(t,this._tokenData),l(n,this._tokenData),l(e,this._tokenData),v(r,this._tokenData)}}}(n)}(this);