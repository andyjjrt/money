function doGet(e) {
  var params = e.parameter;
  var id = params.uid
  //var uid = params.uid;
  var SpreadSheet = SpreadsheetApp.openById(id);
  var Sheet = SpreadSheet.getSheets()[0];
  var LastRow = Sheet.getLastRow();
  var LastColumn = Sheet.getLastColumn()
  if(LastColumn == 0){
    var text = [["no data"]]
    var JSONString = JSON.stringify(text);
    Logger.log(JSONString);
    return ContentService.createTextOutput(JSONString)
      .setMimeType(ContentService.MimeType.JSON);
  }else{
    var ready = Sheet.getSheetValues(1,1,LastRow,LastColumn);
    var JSONString = JSON.stringify(ready);
    Logger.log(JSONString);
    return ContentService.createTextOutput(JSONString)
      .setMimeType(ContentService.MimeType.JSON);
  }
}
