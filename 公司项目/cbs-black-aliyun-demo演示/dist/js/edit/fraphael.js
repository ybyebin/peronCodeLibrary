!function(t){var e="http://www.w3.org/2000/svg",i=0,r={Filter:function(t){if(void 0==t)for(t="filter-"+i++;void 0!=r.filters[t];)t="filter-"+i++;if(void 0!=r.filters[t])throw"A filter with id "+t+" already exists";this.element=document.createElementNS(e,"filter"),this.element.setAttribute("id",t),this.element.setAttribute("x","-25%"),this.element.setAttribute("y","-25%"),this.element.setAttribute("width","150%"),this.element.setAttribute("height","150%"),this.lastFEResult=null,r.filters[t]=this,this.id=t},FilterEffect:function(t,i){this.element=document.createElementNS(e,t);for(var r in i)this.element.setAttribute(r,i[r])},getFilter:function(t){var e=t.data("filterId"),i=null;return void 0==e?(e="element-filter-"+t.id,i=t.paper.createFilter(e),t.filter(e)):i=r.filters[e],i},filters:{}};r.Filter.prototype={addEffect:function(t,e,i){var a=new r.FilterEffect(t,e);if(i)if(i instanceof Array)for(var o in i)i.hasOwnProperty(o)&&a.element.appendChild(i[o].element);else a.element.appendChild(i.element);return this.element.appendChild(a.element),this},chainEffect:function(t,e,r){void 0==e&&(e={});var a,o;return a=void 0==e.in?this.getLastResult():e.in,o=void 0==e.result?i++:e.result,this.lastFEResult=o,e.in=a,e.result=o,this.addEffect(t,e,r),this},getLastResult:function(){return void 0==this.lastFEResult?"SourceGraphic":this.lastFEResult},merge:function(t,e,i){var a=new r.FilterEffect("feMergeNode",{in:t}),o=new r.FilterEffect("feMergeNode",{in:e});return this.chainEffect("feMerge",i,[a,o]),this},compose:function(t,e,i,r){return void 0==r&&(r={}),void 0==i&&(i="over"),r.in=t,r.in2=e,r.operator=i,this.chainEffect("feComposite",r),this},arithmeticCompose:function(t,e,i,r,a,o){return void 0==i&&(i=0),void 0==r&&(r=0),void 0==a&&(a=0),void 0==o&&(o=0),this.compose(t,e,"arithmetic",{k1:i,k2:r,k3:a,k4:o}),this},addBlur:function(t,e){if(!t)throw"Standard deviation is required to perform a blur filter";return void 0==e&&(e={}),e.stdDeviation=t,this.chainEffect("feGaussianBlur",e),this},addOffset:function(t,e,i){if(void 0==t|void 0==e)throw"dx and dy values are required to perform an offset FE";return void 0==i&&(i={}),i.dx=t,i.dy=e,this.chainEffect("feOffset",i),this},addLighting:function(t,e,a,o,s,n){if(void 0==t|void 0==e|void 0==a)throw"Three co-ordinates are required to create a light source";var l=this.getLastResult(),h=i++;void 0==n&&(n={}),n.result=h,void 0!=o&&(n["lighting-color"]=o),void 0==s||"diffuse"==s?s="feDiffuseLighting":"specular"==s&&(s="feSpecularLighting");var f=new r.FilterEffect("fePointLight",{x:t,y:e,z:a});return this.chainEffect(s,n,f).arithmeticCompose(l,h,3,.2,0,0),this},addShiftToColor:function(t,e,i){if(void 0==t)throw"A colour string is a required argument to create a colorMatrix";void 0==e&&(e=.5);var r=1-e,a=r;void 0==i&&(i={});var o=Raphael.color(t),s=o.r*e/255,n=o.g*e/255,l=o.b*e/255;return i.values=a+" 0 0 0 "+s+" 0 "+a+" 0 0 "+n+" 0 0 "+a+" 0 "+l+" 0 0 0 1 0 ",this.chainEffect("feColorMatrix",i),this},addRecolor:function(t,e,i){if(void 0==t)throw"A colour string is a required argument to create a colorMatrix";void 0==e&&(e=1),void 0==i&&(i={});var r=Raphael.color(t),a=r.r/255,o=r.g/255,s=r.b/255;return i.values="0 0 0 0 "+a+" 0 0 0 0 "+o+" 0 0 0 0 "+s+" 0 0 0 "+e+" 0 ",this.chainEffect("feColorMatrix",i),this},addDesaturate:function(t,e){return void 0==t&&(saturnation=0),void 0==e&&(e={}),e.values=t,e.type="saturate",this.chainEffect("feColorMatrix",e),this},addConvolveMatrix:function(t,e){if(void 0==t)throw"A matrix (usually 9 numbers) must be provided to apply a convolve matrix transform";return void 0==e&&(e={}),e.kernelMatrix=t,this.chainEffect("feConvolveMatrix",e),this},createShadow:function(t,e,i,r,a){if(void 0==t)throw"dx is required for the shadow effect";if(void 0==e)throw"dy is required for the shadow effect";if(void 0==i)throw"blur (stdDeviation) is required for the shadow effect";void 0==r&&(r=.6);var o=this.getLastResult();return void 0==a&&(a="#000000"),this.addOffset(t,e,{in:"SourceAlpha"}),this.addRecolor(a,r),this.addBlur(i),this.merge(this.getLastResult(),o),this},createEmboss:function(t,e,i,a){void 0==t&&(t=2),void 0==e&&(e=-1e3),void 0==i&&(i=-5e3),void 0==a&&(a=300),this.addOffset(t*e/(e+i),t*i/(e+i),{in:"SourceAlpha"}),this.addBlur(.5*t);var o=new r.FilterEffect("fePointLight",{x:e,y:i,z:a});this.chainEffect("feSpecularLighting",{surfaceScale:t,specularConstant:.8,specularExponent:15},o),this.compose(this.getLastResult(),"SourceAlpha","in");var s=this.getLastResult();this.addOffset(-1*t*e/(e+i),-1*t*i/(e+i),{in:"SourceAlpha"}),this.addBlur(.5*t);var n=new r.FilterEffect("fePointLight",{x:-1*e,y:-1*i,z:a});this.chainEffect("feSpecularLighting",{surfaceScale:t,specularConstant:1.8,specularExponent:6},n),this.compose(this.getLastResult(),"SourceAlpha","in"),this.chainEffect("feColorMatrix",{values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"});var l=this.getLastResult();return this.arithmeticCompose(s,l,0,.8,.5,0),this.merge("SourceGraphic",this.getLastResult()),this}},t.FRaphael=r}(this),Raphael.fn.createFilter=function(t){var e=this,i=new FRaphael.Filter(t);return e.defs.appendChild(i.element),i},Raphael.el.filter=function(t){var e=t instanceof FRaphael.Filter?t.id:t;return this.node.setAttribute("filter","url(#"+e+")"),this.data("filterId",e),this},Raphael.el.getFilter=function(){return FRaphael.getFilter(this)},Raphael.el.blur=function(t){return void 0==t&&(t=3),this.getFilter().addBlur(t),this},Raphael.el.shadow=function(t,e,i,r,a){return void 0==t&&(t=3),void 0==e&&(e=3),void 0==i&&(i=3),this.getFilter().createShadow(t,e,i,r,a),this},Raphael.el.light=function(t,e,i,r,a){return void 0==t&&(t=this.paper.width),void 0==e&&(e=0),void 0==i&&(i=20),this.getFilter().addLighting(t,e,i,r,a),this},Raphael.el.colorShift=function(t,e){return void 0==t&&(t="black"),void 0==e&&(e=.5),this.getFilter().addShiftToColor(t,e),this},Raphael.el.emboss=function(t){return this.getFilter().createEmboss(t),this},Raphael.el.desaturate=function(t){return this.getFilter().addDesaturate(t),this},Raphael.el.greyScale=function(){return this.getFilter().addDesaturate(0),this};