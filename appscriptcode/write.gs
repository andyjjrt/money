function doGet(e) {
  var params = e.parameter;
  var type = params.type;
  var time = params.time;
  var item = params.item;
  var count = params.count;
  var tag = params.tag
  var ty = params.ty
  var no = params.no
  var uid = params.uid

  var SpreadSheet = SpreadsheetApp.openById(uid);
  var Sheet = SpreadSheet.getSheets()[0];
  var LastRow = Sheet.getLastRow();
  if(ty == "write"){
    if(time !== undefined){
      Sheet.getRange(LastRow+1, 1).setValue(time);
      Sheet.getRange(LastRow+1, 2).setValue(type);
      Sheet.getRange(LastRow+1, 3).setValue(item);
      Sheet.getRange(LastRow+1, 4).setValue(count);
      Sheet.getRange(LastRow+1, 5).setValue(tag);
      return ContentService.createTextOutput(true);
    }
  }else if(ty == "renew"){
    Sheet.getRange(no, 1).setValue(time);
    Sheet.getRange(no, 2).setValue(type);
    Sheet.getRange(no, 3).setValue(item);
    Sheet.getRange(no, 4).setValue(count);
    Sheet.getRange(no, 5).setValue(tag);
    return ContentService.createTextOutput(true);
  }else if(ty == "delete"){
    Sheet.deleteRows(no,1);
    return ContentService.createTextOutput(true);
  }
  return ContentService.createTextOutput('別亂撞我～～ :)');
}
