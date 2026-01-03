function openCity(evt, cityName) {
  let i, content, tablinks;
  content = document.getElementsByClassName("content");
  for (i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function startConnect(h, p, u, pwd) {
  clientID = "client_ind" + parseInt(Math.random() * 100);
  host = h;
  port = p;
  // user = u;
  // client = new Paho.MQTT.Client(host, Number(port), clientID);

  // Re-initialize client to ensure clean state with new params
  client = new Paho.MQTT.Client(host, Number(port), clientID);

  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  client.connect({
    onSuccess: onConnect,
    onFailure: onFailure,
    userName: u,
    password: pwd,
  });
}

function onFailure(responseObject) {
  Swal.fire({
    icon: "error",
    title: "Connection Failed",
    text: "Error Code: " + responseObject.errorCode + "\nError Message: " + responseObject.errorMessage,
  });
}

function onConnect() {
  client.subscribe("power/token");
  client.subscribe("cam/token");
  console.log("disini");
  console.log("berhasil konek");

  // UI Logic: Hide Modal, Show Dashboard
  $("#auth-modal").addClass("hidden");
  $("#auth-modal").removeClass("flex");
  $("#dashboard-container").removeClass("hidden");
}

function onConnectionLost(responseObject) {
  document.getElementById("messages").innerHTML = "<span>ERROR: Connection lost</span><br/>";
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
    Swal.fire({
      icon: "error",
      title: "Connection Lost",
      text: "Connection to MQTT broker lost. Please reconnect.",
    }).then(() => {
      // Show Modal again specific to connection lost if needed,
      // but user might want to see dashboard state.
      // For now, let's keep dashboard but maybe show modal?
      // As per request "connect -> dashboard", opposite implies disconnect -> modal?
      // Let's reload page or show modal.
      location.reload();
    });
  }
}

function onMessageArrived(message) {
  if (message.destinationName == "power/token") {
    let data = message.payloadString;
    console.log(data);
  } else if (message.destinationName == "cam/token") {
    console.log("image token cam incoming");
    let data = message.payloadString;
    document.getElementById("statcam").src = data;
  }
}

function startDisconnect() {
  client.disconnect();
  document.getElementById("messages").innerHTML = "<span>Disconnected</span><br/>";
}

function autoTabs(field1, length, field2) {
  if ($("#" + field1).length == length) {
    $("#" + field2).focus();
  }
}

$(document).ready(function () {
  // Check saved credentials
  const saved = localStorage.getItem("mqtt_config");
  if (saved) {
    const config = JSON.parse(saved);
    $("#mqtt_host").val(config.host);
    $("#mqtt_port").val(config.port);
    $("#mqtt_user").val(config.user);
    $("#mqtt_pass").val(config.pass);
    $("#remember_cred").prop("checked", true);
  }

  $("#btn-connect").click(function () {
    const host = $("#mqtt_host").val();
    const port = $("#mqtt_port").val();
    const user = $("#mqtt_user").val();
    const pass = $("#mqtt_pass").val();
    const remember = $("#remember_cred").is(":checked");

    if (!host || !port || !user || !pass) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    if (remember) {
      localStorage.setItem("mqtt_config", JSON.stringify({ host, port, user, pass }));
    } else {
      localStorage.removeItem("mqtt_config");
    }

    startConnect(host, port, user, pass);
  });
});
