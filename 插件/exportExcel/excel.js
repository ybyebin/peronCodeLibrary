// 导出excel
function getXlsFromTbl(inTblId, inWindow) {
  try {
    var allStr = "";
    var curStr = "";
    if (inTblId != null && inTblId != "" && inTblId != "null") {
      curStr = getTblData(inTblId, inWindow);
    }
    if (curStr != null) {
      allStr += curStr;
    } else {
      alert("你要导出的表不存在！");
      return;
    }
    var fileName = getExcelFileName();
    doFileExport(fileName, allStr);
  } catch (e) {
    alert("导出发生异常:" + e.name + "->" + e.description + "!");
  }
}

function getTblData(inTbl, inWindow) {
  var rows = 0;
  var tblDocument = document;
  if (!!inWindow && inWindow != "") {
    if (!document.all(inWindow)) {
      return null;
    } else {
      tblDocument = eval(inWindow).document;
    }
  }
  var curTbl = tblDocument.getElementById(inTbl);
  var outStr = "";
  if (curTbl != null) {
    for (var j = 0; j < curTbl.rows.length; j++) {
      for (var i = 0; i < curTbl.rows[j].cells.length; i++) {
        if (i == 0 && rows > 0) {
          outStr += " \t";
          rows -= 1;
        }
        if (i == curTbl.rows[j].cells.length - 1) {
          outStr += curTbl.rows[j].cells[i].innerText + "\t";
        } else {
          outStr += curTbl.rows[j].cells[i].innerText + ",\t";
        }
        if (curTbl.rows[j].cells[i].colSpan > 1) {
          for (var k = 0; k < curTbl.rows[j].cells[i].colSpan - 1; k++) {
            outStr += " \t";
          }
        }
        if (i == 0) {
          if (rows == 0 && curTbl.rows[j].cells[i].rowSpan > 1) {
            rows = curTbl.rows[j].cells[i].rowSpan - 1;
          }
        }
      }
      outStr += "\r\n";
    }
  } else {
    outStr = null;
    alert(inTbl + "不存在!");
  }
  return outStr;
}

function getExcelFileName() {

  var fileName;
  // $("#selectBao button .txt").attr('rel', value);
  // alert(Number($("#selectBao button .txt").attr('rel')))
  switch (Number($("#selectBao button .txt").attr('rel'))) {
    case 1:
      fileName = $("#bao_day").val() + ".csv";
      break;
    case 2:
      fileName = $("#bao_month").val() + ".csv";
      break;
    case 3:
      fileName = $("#bao_year").val() + ".csv";
      break;
  }

  return fileName;
}

function doFileExport(inName, inStr) {
  var a = document.createElement("a");
  var data = "\ufeff" + inStr;
  var blob = new Blob([data], {
    type: 'text/csv,charset=UTF-8'
  });
  a.download = inName;
  var csvUrl = URL.createObjectURL(blob);
  a.href = csvUrl;
  a.click();
  exitFullscreen();
}



// getXlsFromTbl('baoList',null)