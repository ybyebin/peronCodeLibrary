/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 2014-08-29
 *
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs
  // IE 10+ (native saveAs)
  || (typeof navigator !== "undefined" &&
      navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
  // Everyone else
  || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof navigator !== "undefined" &&
	    /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = doc.createEvent("MouseEvents");
			event.initMouseEvent(
				"click", true, false, view, 0, 0, 0, 0, 0
				, false, false, false, false, 0, null
			);
			node.dispatchEvent(event);
		}
		, webkit_req_fs = view.webkitRequestFileSystem
		, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		, fs_min_size = 0
		// See https://code.google.com/p/chromium/issues/detail?id=375297#c7 for
		// the reasoning behind the timeout and revocation flow
		, arbitrary_revoke_timeout = 10
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			if (view.chrome) {
				revoker();
			} else {
				setTimeout(revoker, arbitrary_revoke_timeout);
			}
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, FileSaver = function(blob, name) {
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, blob_changed = false
				, object_url
				, target_view
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					// don't create more object URLs than needed
					if (blob_changed || !object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (target_view) {
						target_view.location.href = object_url;
					} else {
						var new_tab = view.open(object_url, "_blank");
						if (new_tab == undefined && typeof safari !== "undefined") {
							//Apple do not allow window.open, see http://bit.ly/1kZffRI
							view.location.href = object_url
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
				, abortable = function(func) {
					return function() {
						if (filesaver.readyState !== filesaver.DONE) {
							return func.apply(this, arguments);
						}
					};
				}
				, create_if_not_found = {create: true, exclusive: false}
				, slice
			;
			filesaver.readyState = filesaver.INIT;
			if (!name) {
				name = "download";
			}
			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				save_link.href = object_url;
				save_link.download = name;
				click(save_link);
				filesaver.readyState = filesaver.DONE;
				dispatch_all();
				revoke(object_url);
				return;
			}
			// Object and web filesystem URLs have a problem saving in Google Chrome when
			// viewed in a tab, so I force save with application/octet-stream
			// http://code.google.com/p/chromium/issues/detail?id=91158
			// Update: Google errantly closed 91158, I submitted it again:
			// https://code.google.com/p/chromium/issues/detail?id=389642
			if (view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = true;
			}
			// Since I can't be sure that the guessed media type will trigger a download
			// in WebKit, I append .download to the filename.
			// https://bugs.webkit.org/show_bug.cgi?id=65440
			if (webkit_req_fs && name !== "download") {
				name += ".download";
			}
			if (type === force_saveable_type || webkit_req_fs) {
				target_view = view;
			}
			if (!req_fs) {
				fs_error();
				return;
			}
			fs_min_size += blob.size;
			req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
				fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
					var save = function() {
						dir.getFile(name, create_if_not_found, abortable(function(file) {
							file.createWriter(abortable(function(writer) {
								writer.onwriteend = function(event) {
									target_view.location.href = file.toURL();
									filesaver.readyState = filesaver.DONE;
									dispatch(filesaver, "writeend", event);
									revoke(file);
								};
								writer.onerror = function() {
									var error = writer.error;
									if (error.code !== error.ABORT_ERR) {
										fs_error();
									}
								};
								"writestart progress write abort".split(" ").forEach(function(event) {
									writer["on" + event] = filesaver["on" + event];
								});
								writer.write(blob);
								filesaver.abort = function() {
									writer.abort();
									filesaver.readyState = filesaver.DONE;
								};
								filesaver.readyState = filesaver.WRITING;
							}), fs_error);
						}), fs_error);
					};
					dir.getFile(name, {create: false}, abortable(function(file) {
						// delete file if it already exists
						file.remove();
						save();
					}), abortable(function(ex) {
						if (ex.code === ex.NOT_FOUND_ERR) {
							save();
						} else {
							fs_error();
						}
					}));
				}), fs_error);
			}), fs_error);
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name) {
			return new FileSaver(blob, name);
		}
	;
	FS_proto.abort = function() {
		var filesaver = this;
		filesaver.readyState = filesaver.DONE;
		dispatch(filesaver, "abort");
	};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module !== null) {
  module.exports = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
  define([], function() {
    return saveAs;
  });
}


(function(view){
	"use strict";
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var fromCharCode = String.fromCharCode;
	var INVALID_CHARACTER_ERR = ( function() {
        // fabricate a suitable error object
        try {
            document.createElement('$');
        } catch (error) {
            return error;
        }
    }());

	// encoder
	var btoa = function(string) {
	    var a, b, b1, b2, b3, b4, c, i = 0, len = string.length, max = Math.max, result = '';

	    while (i < len) {
	        a = string.charCodeAt(i++) || 0;
	        b = string.charCodeAt(i++) || 0;
	        c = string.charCodeAt(i++) || 0;

	        if (max(a, b, c) > 0xFF) {
	            throw INVALID_CHARACTER_ERR;
	        }

	        b1 = (a >> 2) & 0x3F;
	        b2 = ((a & 0x3) << 4) | ((b >> 4) & 0xF);
	        b3 = ((b & 0xF) << 2) | ((c >> 6) & 0x3);
	        b4 = c & 0x3F;

	        if (!b) {
	            b3 = b4 = 64;
	        } else if (!c) {
	            b4 = 64;
	        }
	        result += characters.charAt(b1) + characters.charAt(b2) + characters.charAt(b3) + characters.charAt(b4);
	    }
	    return result;
	};

	//获取dom文本
	var getText = function( el ){
		var s = el.textContent || el.innerText;
		return s == null ? "" : s.replace( /^\s*(.*?)\s+$/, "$1");
	};
	view.tableExport = function(tableId, filename, type){
		var doc = view.document,
			table = doc.getElementById(tableId),
			charSet = doc.characterSet

		var uri = {
			json: 'application/json;charset='+charSet,
			txt: 'csv/txt;charset='+charSet,
			csv: 'csv/txt;charset='+charSet,
			doc: 'application/vnd.ms-doc', 
			excel: 'application/vnd.ms-excel'
		};

		var base64 = function(s) {
        	return btoa(unescape(encodeURIComponent(s)));
    	};
    	var template = function(s, c) {
        	return s.replace(/{(\w+)}/g, function(m, p) {
            	return c[p];
        	});
    	};

    	var	get_blob = function() {
			return view.Blob;
		}

    	var fixCSVField = function(value) {
	        var fixedValue = value;
	        var addQuotes = (value.indexOf(',') !== -1) || (value.indexOf('\r') !== -1) || (value.indexOf('\n') !== -1);
	        var replaceDoubleQuotes = (value.indexOf('"') !== -1);

	        if (replaceDoubleQuotes) {
	            fixedValue = fixedValue.replace(/"/g, '""');
	        }
	        if (addQuotes || replaceDoubleQuotes) {
	            fixedValue = '"' + fixedValue + '"';
	        }
	        return fixedValue;
	    };

	    var saveData = function(data){
	    	var BB = get_blob();
	        saveAs(new BB([data], {type: uri[type]}), filename + "."+type);
	    };

		var toCSV = function(){
			var data = "\ufeff";
			for (var i = 0, row; row = table.rows[i]; i++) {
	            for (var j = 0, col; col = row.cells[j]; j++) {
	                data = data + (j ? ',' : '') + fixCSVField(getText(col));
	            }
	            data = data + "\r\n";
	        }
	        saveData(data);
		};

		var toJson = function(){
			var jsonHeaderArray = [];

			if(table.tHead){
				for(var i =0,col; col = table.tHead.rows[0].cells[i]; i++){
					jsonHeaderArray.push(getText(col));
				}
			}

			var jsonArray = [];
			if(table.tBodies){
				for(var j=0,tbody; tbody = table.tBodies[j]; j++){
					for(var k =0, rowb; rowb= tbody.rows[k]; k++){
						var len = jsonArray.length;
						jsonArray[len]  = [];
						for (var g = 0, colb; colb = rowb.cells[g]; g++) {
	                		jsonArray[len].push(getText(colb));
	            		}
					}
				}
			}

			var jsonExportArray = {
				header: jsonHeaderArray,
				data: jsonArray
			};
			saveData(JSON.stringify(jsonExportArray));
		};

		var toOffice = function(){
			var tmpl = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:'+type+'" xmlns="http://www.w3.org/TR/REC-html40">';
			tmpl += '<head><meta charset="'+charSet+'" /><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>';
			tmpl += '{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->';
  			tmpl += '</head><body><table>{table}</table></body></html>';
			var office = '',
				maph = [['<thead><tr>', '</tr></thead>'], ['<tbody><tr>', '</tr></tbody>'], ['<tr>', '</tr>']],
				mapb = [['<th>', '</th>'],['<td>', '</td>']],
				flag = +!table.tHead,
				com = 1 - flag;

			for(var i=0, row; row = table.rows[i]; i++){
				flag = i > com ? 2 : flag;
				office += maph[flag][0];
				for(var j =0, col; col = row.cells[j]; j++){
					office += mapb[+!!flag][0]+ getText(col) +mapb[+!!flag][1];
				}
				office += maph[flag][1];
				flag++;
			}
			saveData(template(tmpl, {worksheet: 'Worksheet', table: office}));
		};

		var typeMap = {
			json : toJson,
			txt: toCSV,
			csv: toCSV,
			doc: toOffice,
			docx: toOffice,
			xls: toOffice,
			xlsx: toOffice
		};

		typeMap[type]();
	};

})(window);