
function shortenUrl(urll, callback) {
  Logger.log("Inside ShortenURL methoddd");
  var url = 'https://www.googleapis.com/urlshortener/v1/url';
  var apiKey = 'xxxx';
  url += '?key=' + apiKey;
  var payload = {"longUrl":urll};
  var parameters = { method : 'post',
                payload:JSON.stringify(payload),
                contentType:'application/json',
                muteHttpExceptions:true};

  var response = UrlFetchApp.fetch(url, parameters);
  var jsonResponse = JSON.parse(response);
  var shortURL = jsonResponse["id"];

  Logger.log("*** PAYLOAD is: "+shortURL);
  callback(shortURL);
}

function onEdit(e) {
  var range = e.range;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var columnName = sheet.getRange(1, range.getColumn()).getDisplayValues();
  var columnNumber = range.getColumn();
  var column = "";

  if (columnName==='undefined'||columnName=='') {
     column=columnNumber;
      Logger.log("Inside else The column number is: "+column);
  } else {
      column=columnName;
      Logger.log("Inside If The column name is: "+column);
  }

  var userName = Session.getEffectiveUser().getEmail();
  Logger.log("Get effective user "+userName);
  Logger.log("Get Active user "+Session.getActiveUser().getEmail());
  Logger.log("userId"+Session.getEffectiveUser().getUserLoginId())

  if(userName.length<=0){
    userName = "Anonymous";
  }

  if (typeof e.oldValue === 'undefined') {
    range.setNote('\nUser '+userName+' has added item *'+e.value+'* in column *'+column+'*\nSheet: '+sheet.getSheetName()+', Document: '+ss.getName()+'\nlink: ');
  } else if (e.value.length > 0) {
    range.setNote('\nUser '+userName+' changed cell value from *'+e.oldValue+'* to *'+e.value+'* in column *'+column+'*\nSheet: '+sheet.getSheetName()+', Document: '+ss.getName()+'\nlink: ');
  } else {
    range.setNote('\nUser "'+userName+' deleted cell value *'+e.oldValue+'* from column *'+column+'*\nSheet: '+sheet.getSheetName()+', Document: '+ss.getName()+'\nlink: ');
  }
}

function checkOutstandingNotes() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  for(var k=0;k<ss.getSheets().length;k++){
  var sheet = ss.getSheets()[k];
  var range = sheet.getRange("A1:Z400");
  var results = range.getNotes();
  var URLname = ss.getUrl();

  for (var i in results) {
    for (var j in results[i]) {
      if (results[i][j]) {
        Logger.log("The result is: "+results[i][j]);
        shortenUrl(URLname,function(data){
          sendHttpPost(results[i][j]+data);
        });
      }
    }
  }
  range.clearNote();
 }
}

function sendHttpPost(message) {
  var flockMessage = {
    "text" : ""
  };
  var options =
   {
     "method" : "post",
     "contentType" : "application/json"
   };
  flockMessage.text = message;
  options.payload = (JSON.stringify(flockMessage));

  Logger.log("-------> Object.payload "+options.payload);
  Logger.log("------>  JSON.parse(JSON.stringify(flockMessage))"+ (JSON.stringify(flockMessage)));
  Logger.log("-------> Options object"+ JSON.stringify(options, null, 4));

  var response = UrlFetchApp.fetch("https://api.flock.co/hooks/sendMessage/xxxx", options); 
  Logger.log("Response ->"+response.getContentText());
 }
