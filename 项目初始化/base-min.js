String.prototype.getBytes = function() {
	var bytes = 0;
	for (var i = 0, l = this.length; i < l; i++) {
		if (this.charCodeAt(i) > 256) {
			bytes += 2;
		} else {
			bytes += 1;
		}
	}
	return bytes;
};
String.prototype.trim = function() {
	return this.replace(/^\s*|\s*$/g, "");
};
var Kg = Kg || {
	UA: {
		Ie: !!document.all,
		Ie6: !!document.all && !window.XMLHttpRequest,
		Ie7: !!document.all && /msie 7.0/gi.test(window.navigator.appVersion),
		Ie8: !!document.all && /msie 8.0/gi.test(window.navigator.appVersion),
		FF: /firefox/gi.test(window.navigator.userAgent),
		Opera: /opera/gi.test(window.navigator.userAgent),
		Chrom: /Chrom/gi.test(window.navigator.userAgent)
	},
	$: function() {
		var els = [];
		for (var i = 0, l = arguments.length; i < l; i++) {
			var el = arguments[i];
			if (typeof el == "string") el = document.getElementById(el);
			if (l == 1) return el;
			els.push(el);
		}
		return els;
	},
	$T: function(tagName, el) {
		var els = (this.$(el) || document).getElementsByTagName(tagName || "*");
		return this.$A(els);
	},
	$C: function(name, el, tagName) {
		var cEls = [],
			i = 0;
		if (!!document.getElementsByClassName) {
			var arr = this.$(el || document).getElementsByClassName(name);
			arr = this.$A(arr);
			if (tagName && tagName !== "*") {
				for (var l = arr.length; i < l; i++) {
					(arr[i].tagName.toLowerCase() === tagName.toLowerCase()) && cEls.push(arr[i]);
				}
			} else {
				cEls = arr;
			}
		} else {
			for (var arr = this.$T(tagName, el), l = arr.length; i < l; i++) {
				new RegExp("\\b" + name + "\\b", "g").test(arr[i].className) && cEls.push(arr[i]);
			}
		}
		return cEls;
	},
	$A: function(args) {
		var arr = [];
		for (var i = 0, l = args.length; i < l; i++) {
			arr.push(args[i]);
		}
		return arr;
	},
	extend: function(target, souce, rewrite) {
		for (var property in souce) {
			if (rewrite) target[property] = souce[property];
			else if (!target[property]) target[property] = souce[property];
		}
		return target;
	},
	getBodySize: function() {
		if (document.compatMode == "BackCompat") {
			var clientH = document.body.clientHeight;
			var clientW = document.body.clientWidth;
			var scrollH = document.body.scrollHeight;
			var scrollW = document.body.scrollWidth;
			var scrollT = document.body.scrollTop;
			var scrollL = document.body.scrollLeft;
		} else if (document.compatMode == "CSS1Compat") {
			var clientH = document.documentElement.clientHeight;
			var clientW = document.documentElement.clientWidth;
			var scrollH = document.documentElement.scrollHeight;
			var scrollW = document.documentElement.scrollWidth;
			var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
			var scrollL = document.body.scrollLeft || document.documentElement.scrollLeft;
		}
		return {
			cH: clientH,
			cW: clientW,
			sH: scrollH,
			sW: scrollW,
			sT: scrollT,
			sL: scrollL
		};
	},
	getXY: function(el) {
		var bodySize = this.getBodySize();
		var elRect = el.getBoundingClientRect();
		return {
			left: bodySize.sL + elRect.left,
			right: bodySize.sL + elRect.right,
			top: bodySize.sT + elRect.top,
			bottom: bodySize.sT + elRect.bottom
		};
	},
	isFather: function(father, child, bol) {
		father = this.$(father);
		child = this.$(child);
		if (bol && (father == child)) return true;
		if (father.compareDocumentPosition) return father.compareDocumentPosition(child) == 20;
		while (child && child.parentNode) {
			child = child.parentNode;
			if (child == father) return true;
		}
		return false;
	},
	addEvent: function(obj, type, func) {
		if (obj.addEventListener) {
			obj.addEventListener(type, func, true);
		} else if (obj.attachEvent) {
			obj.attachEvent("on" + type, func);
		} else {
			obj["on" + type] = func;
		}
	},
	removeEvent: function(obj, type, func) {
		if (obj.removeEventListener) {
			obj.removeEventListener(type, func, false);
		} else if (obj.detachEvent) {
			obj.detachEvent("on" + type, func);
		} else {
			obj["on" + type] = null;
		}
	},
	bind: function(func, environment) {
		var params = Array.prototype.slice.call(arguments, 2);
		return function() {
			func.apply(environment, params.concat(Array.prototype.slice.call(arguments)));
		}
	},
	inArray: function(arr, compare) {
		for (var i = 0, l = arr.length; i < l; i++) {
			if (arr[i] === compare) return true
		}
		return false;
	},
	indexOf: function(arr, compare) {
		for (var i = 0, l = arr.length; i < l; i++) {
			if (arr[i] === compare) return i;
		}
		return -1;
	},
	setOpacity: function(el, num) {
		document.all ? el.style.filter = "Alpha(Opacity=" + num + ")" : el.style.opacity = num / 100;
		return el;
	},
	fadein: function(el, speed, step, callback) {
		speed = speed || 1;
		step = step || 1;
		var _this = this;
		var num = 0;
		this.fadeInTimer = setInterval(function() {
			_this.setOpacity(el, (num += step));
			if (num >= 100) {
				clearInterval(_this.fadeInTimer);
				callback && callback();
			}
		}, speed);
		return el;
	},
	fadeout: function(el, speed, step, callback) {
		speed = speed || 1;
		step = step || 1;
		var _this = this;
		var num = 100;
		this.fadeOutTimer = setInterval(function() {
			_this.setOpacity(el, (num -= step));
			if (num <= 0) {
				clearInterval(_this.fadeOutTimer);
				callback && callback();
			}
		}, speed);
		return el;
	},
	JSON: function() {
		function f(n) {
			return n < 10 ? '0' + n : n;
		}
		Date.prototype.toJSON = function() {
			return this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z';
		};
		var m = {
			'\b': '\\b',
			'\t': '\\t',
			'\n': '\\n',
			'\f': '\\f',
			'\r': '\\r',
			'"': '\\"',
			'\\': '\\\\'
		};

		function stringify(value, whitelist) {
			var a, i, k, l, r = /["\\\x00-\x1f\x7f-\x9f]/g,
				v;
			switch (typeof value) {
				case 'string':
					return r.test(value) ? '"' + value.replace(r, function(a) {
						var c = m[a];
						if (c) {
							return c;
						}
						c = a.charCodeAt();
						return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
					}) + '"' : '"' + value + '"';
				case 'number':
					return isFinite(value) ? String(value) : 'null';
				case 'boolean':
				case 'null':
					return String(value);
				case 'object':
					if (!value) {
						return 'null';
					}
					if (typeof value.toJSON === 'function') {
						return stringify(value.toJSON());
					}
					a = [];
					if (typeof value.length === 'number' && !(value.propertyIsEnumerable('length'))) {
						l = value.length;
						for (i = 0; i < l; i += 1) {
							a.push(stringify(value[i], whitelist) || 'null');
						}
						return '[' + a.join(',') + ']';
					}
					if (whitelist) {
						l = whitelist.length;
						for (i = 0; i < l; i += 1) {
							k = whitelist[i];
							if (typeof k === 'string') {
								v = stringify(value[k], whitelist);
								if (v) {
									a.push(stringify(k) + ':' + v);
								}
							}
						}
					} else {
						for (k in value) {
							if (typeof k === 'string') {
								v = stringify(value[k], whitelist);
								if (v) {
									a.push(stringify(k) + ':' + v);
								}
							}
						}
					}
					return '{' + a.join(',') + '}';
			}
		}
		return {
			stringify: stringify,
			parse: function(text, filter) {
				var j;

				function walk(k, v) {
					var i, n;
					if (v && typeof v === 'object') {
						for (i in v) {
							if (Object.prototype.hasOwnProperty.apply(v, [i])) {
								n = walk(i, v[i]);
								if (n !== undefined) {
									v[i] = n;
								} else {
									delete v[i];
								}
							}
						}
					}
					return filter(k, v);
				}
				if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
					j = eval('(' + text + ')');
					return typeof filter === 'function' ? walk('', j) : j;
				}
				throw new SyntaxError('parseJSON');
			}
		};
	}(),
	Cookie: {
		write: function(name, value, day, path) {
			var expires = "";
			if (day) {
				var dt = new Date();
				dt.setTime(dt.getTime() + (day * 24 * 60 * 60 * 1000));
				expires = ";expires=" + dt.toGMTString();
			}
			if (path != undefined) {
				document.cookie = name + "=" + value + expires + ";path=" + path + ";";
			} else {
				document.cookie = name + "=" + value + expires + ";path=\;";
			}
		},
		read: function(name) {
			var cookieValue = "";
			var search = name + "=";
			if (document.cookie.length > 0) {
				offset = document.cookie.indexOf(search);
				if (offset != -1) {
					offset += search.length;
					end = document.cookie.indexOf(";", offset);
					if (end == -1) {
						end = document.cookie.length;
					}
					cookieValue = document.cookie.substring(offset, end);
				}
			}
			return cookieValue;
		},
		remove: function(name) {
			this.write(name, "", -1);
		}
	},
	Param: function() {
		var arr = [];
		var o = {};
		this.parse = function(str) {
			var a = str.split("&");
			for (var i = 0, l = a.length; i < l; i++) {
				var k = a[i].split("=");
				o[k[0]] = k[1];
			}
			return o;
		};
		this.toString = function(filter) {
			filter = filter || "&";
			return arr.join(filter);
		};
		this.add = function(key, val) {
			var prm = key + "=" + val;
			arr.push(prm);
			return this;
		}
	},
	Ajax: function(method, url, async, args, callback, docType) {
		method = method ? method.toUpperCase() : "POST";
		async = async == null ? async : true;
		docType = docType ? docType : "text";
		var XMLHttp = null;
		if (window.XMLHttpRequest && !(window.ActiveXObject)) {
			XMLHttp = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			try {
				XMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (otherMSIE) {
				try {
					XMLHttp = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (NoSupport) {
					XMLHttp = null;
				}
			}
		}
		if (method == "GET") {
			XMLHttp.open(method, url + "?n=" + Math.random() + "&" + args, async);
			XMLHttp.send(null);
		} else {
			XMLHttp.open(method, url + "?n=" + Math.random(), async);
			XMLHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			XMLHttp.send(args);
		}
		XMLHttp.onreadystatechange = function() {
			if (XMLHttp.readyState == 4) {
				if (XMLHttp.status == 200) {
					var param = null;
					switch (docType) {
						case "xml":
							param = XMLHttp.responseXML;
							break;
						case "json":
							param = Kg.JSON.parse(XMLHttp.responseText);
							break;
						default:
							param = XMLHttp.responseText;
					}
					callback && callback(param);
					XMLHttp = null;
				}
			}
		};
	}
};