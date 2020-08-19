# 記帳

## 安裝教學

 

 - 試算表id

 前往google試算表建立新試算表。並將【共用】開啟至【知道連結的使用者均能查看】

![enter image description here](https://github.com/andyjjrt/money/blob/master/t1.png?raw=true)

 
接著新增第二張試算表，並且將兩張表依圖片順序擺放命名。

![enter image description here](https://github.com/andyjjrt/money/blob/master/%E6%93%B7%E5%8F%96.PNG?raw=true)

最後複製下圖區域文字，並保留該段文字於【試算表id】

![enter image description here](https://github.com/andyjjrt/money/blob/master/t2.png?raw=true)

 - AppScript

至AppScript首頁按【新專案】新增新專案。
 ![enter image description here](https://github.com/andyjjrt/money/blob/master/a1.PNG?raw=true)

將以下程式碼貼至【程式碼. gs】的框框內

    function doGet(e) {
      var params = e.parameter;
      var id = params.uid
      var month = params.month
      var emonth = params.emonth
      var SpreadSheet = SpreadsheetApp.openById(id);
      var Sheet = SpreadSheet.getSheets()[0];
      var Sheet2 = SpreadSheet.getSheets()[1];
      var LastRow = Sheet2.getLastRow();
      var LastColumn = Sheet2.getLastColumn()
      var LastColumn2 = Sheet.getLastRow()
      var test = Sheet2.getSheetValues(1,LastColumn,1,1);
      var total = Sheet.getSheetValues(1,4,LastColumn2,1);
      var num = 0
      for (var i in total) {
        num += parseInt(total[i])
      }
      if(LastColumn == 0){
        var text = [["no data"]]
        var JSONString = JSON.stringify(text);
        return ContentService.createTextOutput(JSONString).setMimeType(ContentService.MimeType.JSON);
      }else if(test[0][0] == "#N/A"){
      var text = [["no data"]]
      var JSONString = JSON.stringify(text);
      return ContentService.createTextOutput(JSONString).setMimeType(ContentService.MimeType.JSON);
      }else{
        var ready = Sheet2.getSheetValues(1,1,LastRow,LastColumn);
        ready[ready.length] = num;
        var JSONString = JSON.stringify(ready);
        return ContentService.createTextOutput(JSONString).setMimeType(ContentService.MimeType.JSON);
      }
    }

接著按下【發佈】 > 【部署為網路應用程式】，專案名稱自行設定。
接著照下圖設定公開度為[Anyone, even anonymous]，接著按【Deploy】，並核對權限。
![enter image description here](https://github.com/andyjjrt/money/blob/master/a2.png?raw=true)

按下進階設定，並繼續前往此專案，並同意操作。
![enter image description here](https://github.com/andyjjrt/money/blob/master/a3.png?raw=true)

最後，此段網址即為【讀取appscript網址】所需資料
![enter image description here](https://github.com/andyjjrt/money/blob/master/a4.png?raw=true)

【寫入appscript網址】與【更新appscript網址】方法異同，請參閱此處取得檔案。
