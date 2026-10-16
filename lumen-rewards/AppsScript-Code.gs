/**
 * LUMEN Rewards event bridge — script vinculado a la hoja del propietario.
 * NO registra ingresos ni puntos como pagos verificables.
 * doPost recibe solo eventos públicos anónimos, con límites elementales.
 */
const MAX_EVENTS_PER_DAY = 2000;
const ALLOWED = ["game_start","game_finished","offer_click"];
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({status:"ok",app:"LUMEN Rewards",version:"1.0"})).setMimeType(ContentService.MimeType.JSON);
}
function doPost(e) {
  var response = {ok:false};
  try {
    if (!e || !e.postData || !e.postData.contents || e.postData.contents.length > 1000) throw Error("Invalid payload");
    var obj = JSON.parse(e.postData.contents);
    var action = String(obj.accion || "");
    if (ALLOWED.indexOf(action) === -1) throw Error("Action forbidden");
    var ref = safe_(obj.referencia,80);
    var origin = safe_(obj.origen,40);
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(5000)) throw Error("Busy");
    try {
      var properties = PropertiesService.getScriptProperties();
      var key = "events_" + Utilities.formatDate(new Date(),"America/Argentina/Buenos_Aires","yyyyMMdd");
      var used = Number(properties.getProperty(key)||"0");
      if (used >= MAX_EVENTS_PER_DAY) throw Error("Daily cap reached");
      var book = SpreadsheetApp.getActiveSpreadsheet();
      if (!book) throw Error("This script must be bound to LUMEN Rewards spreadsheet");
      var sheet = book.getSheetByName("Eventos");
      if (!sheet) throw Error("Eventos sheet missing");
      sheet.appendRow([Utilities.getUuid(),new Date().toISOString(),"",action,ref,origin,"Registro no autenticado, dato orientativo"]);
      properties.setProperty(key,String(used+1));
      response = {ok:true};
    } finally { lock.releaseLock(); }
  } catch (err) { response={ok:false,message:String(err.message||err)}; }
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}
function safe_(val,n) {
  return String(val||"").replace(/[\r\n\t]/g," ").replace(/^[=+\-@]/,"'").slice(0,n);
}