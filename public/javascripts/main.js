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

  metroIncrease.onclick = function(event) {
    event.preventDefault();
    port.send({ address: "/increase", args: [{ type: "s", value: 'i' }] });
  };

  metroDecrease.onclick = function(event) {
    event.preventDefault();
    port.send({ address: "/decrease", args: [{ type: "s", value: 'd' }] });
  };
});
