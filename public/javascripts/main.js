var path = "/inputs";

window.addEventListener('load', function() {
  var metroIncrease = document.getElementById("cat-button-increase");
  var metroDecrease = document.getElementById("cat-button-decrease");
  var address = document.getElementById("main-section").dataset.address;

  var port = new osc.WebSocketPort({
    url: ("ws://" + address + ":" + "8081")
  });

  port.on("message", function(oscMessage) {
    console.log(oscMessage);
  });

  port.on("close", function() {
    alert("You've been disconnected");
  });

  port.open();
  var port = new WebSocket("ws://" + address + ":" + "8081");

  metroIncrease.onclick = function(event) {
    event.preventDefault();
    port.send({ address: path, args: [{ type: "f", value: '0.1' }] });
  };

  metroDecrease.onclick = function(event) {
    event.preventDefault();
    port.send({ address: path, args: [{ type: "f", value: '-0.1' }] });
  };
});
