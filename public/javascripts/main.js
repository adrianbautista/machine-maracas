var deviceOrientation = { x: 0, y: 0, z: 0};
var acceleration = { x: 0, y: 0, z: 0};
var rotationRate = { x: 0, y: 0, z: 0};

window.addEventListener('load', function() {
  var form = document.getElementById("configForm");
  var metroIncrease = document.getElementById("cat-button-increase");
  var metroDecrease = document.getElementById("cat-button-decrease");

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    var inputs = form.elements;

    var address = inputs['address'].value,
      port = inputs['port'].value,
      path = inputs['path'].value;

    var port = new osc.WebSocketPort({
      url: ("ws://" + address + ":" + port)
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
      port.send({ address: path, args: [{ type: "i", value: 1 }] });
    };

    metroDecrease.onclick = function(event) {
      event.preventDefault();
      port.send({ address: path, args: [{ type: "i", value: -1 }] });
    };

    for (var i=0; i < inputs.length; i++) {
      inputs[i].setAttribute('disabled', '');
    }
  });
});
