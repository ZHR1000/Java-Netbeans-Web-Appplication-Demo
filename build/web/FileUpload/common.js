function loaderOn(object) {
  object.progressOn();
}

function loaderOff(object) {

  object.progressOff();

}

function sayHi() {
  alert("Hii");
}
//alerts
function alertNormal(text, title = "Alert", ok = "OK") {
  dhtmlx.alert({
    type: "alert",
    text: text,
    title: title,
    ok: ok
  });
}

function alertError(text, title, ok = "OK") {
  dhtmlx.alert({
    type: "alert-error",
    text: text,
    title: title,
    ok: ok
  });
}

function alertWarning(text, title = "Close", ok = "OK") {
  dhtmlx.alert({
    type: "alert-warning",
    text: text,
    title: title,
    ok: ok
  });
}

function confirmAlertNormal(text) {
  var status = false;
  dhtmlx.confirm({
    type: "confirm",
    text: text + " ?",
    ok: "delete",
    callback: function(result) {
      status = result;
      return status;
    }
  });
  return status;
}

function confirmAlertWarning(text) {
  var status = false;
  dhtmlx.confirm({
    type: "confirm-warning",
    text: text + " ?",
    callback: function(result) {
      status = result;
      return;
    }
  });
  return status;
}

function confirmAlertError(text) {
  var status = false;
  dhtmlx.confirm({
    type: "confirm-error",
    text: text + " ?",
    callback: function(result) {
      status = result;
      return;
    }
  });
  return status;
}

function alertMessage(message) {
  dhtmlx.message(message);
}