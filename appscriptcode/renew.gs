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
  var string = '=QUERY(Sheet1!A1:F992, "select * where (A > \'' + month + '-00\' and A < \'' + emonth + '-00\') order by A",0)'
  Sheet2.getRange(1, 1).setFormula(string);
  //return ContentService.createTextOutput(true);
  return ContentService.createTextOutput(true);
}
