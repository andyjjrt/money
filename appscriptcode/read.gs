function doGet(e) {
  var params = e.parameter;
  var id = params.uid
  var month = params.month
  var emonth = params.emonth
  //var uid = params.uid;
  var SpreadSheet = SpreadsheetApp.openById(id);
  var Sheet = SpreadSheet.getSheets()[0];
  var Sheet2 = SpreadSheet.getSheets()[1];
  var LastRow = Sheet2.getLastRow();
  var LastColumn = Sheet2.getLastColumn()
  var LastColumn2 = Sheet.getLastRow()
  
  if(LastColumn == 0){
    var text = [["no data"]]
    var JSONString = JSON.stringify(text);
    Logger.log(JSONString);
    return ContentService.createTextOutput(JSONString)
    .setMimeType(ContentService.MimeType.JSON);
  }else{
    var test = Sheet2.getSheetValues(1,LastColumn,1,1);
    var total = Sheet.getSheetValues(1,4,LastColumn2,1);
    Logger.log(total);
    var num = 0
    for (var i in total) {
      num += parseInt(total[i])
    }
    if(test[0][0] == "#N/A"){
      var text = [["no data"]]
      var JSONString = JSON.stringify(text);
      Logger.log(JSONString);
      return ContentService.createTextOutput(JSONString)
      .setMimeType(ContentService.MimeType.JSON);
    }else{
      var ready = Sheet2.getSheetValues(1,1,LastRow,LastColumn);
      ready[ready.length] = num;
      var JSONString = JSON.stringify(ready);
      Logger.log(JSONString);
      return ContentService.createTextOutput(JSONString)
      .setMimeType(ContentService.MimeType.JSON);
    }
  }
}
   
    
