var deviceOrientation = { x: 0, y: 0, z: 0};
var acceleration = { x: 0, y: 0, z: 0};
var rotationRate = { x: 0, y: 0, z: 0};

// X axis is swipe left, right
// Y axis is swipe up, down
// Z axis i bringing phone towards, away

function handleOrientation(event) {
  deviceOrientation.x = Number.parseFloat(event.beta);  // tipping phone toward, away [-180,180]
  deviceOrientation.y = Number.parseFloat(event.gamma); // tilting phone left, right [-90,90]
  deviceOrientation.z = Number.parseFloat(event.alpha); // spinning phone [0,360]
}

function handleMotion(event) {
  acceleration.x = Number.parseFloat(event.acceleration.x); // axis west to east
  acceleration.y = Number.parseFloat(event.acceleration.y); // axis south to north
  acceleration.z = Number.parseFloat(event.acceleration.z); // axis perp to ground

  rotationRate.x = Number.parseFloat(event.rotationRate.beta); // axis rotation left/right screen plane
  rotationRate.y = Number.parseFloat(event.rotationRate.gamma); // axis rotation bottom/top screen plane
  rotationRate.z = Number.parseFloat(event.rotationRate.alpha); // axis rotation perp to screen
}

window.addEventListener('deviceorientation', handleOrientation);
window.addEventListener('devicemotion', handleMotion);

window.addEventListener('load', function() {
  var form = document.getElementById("configForm");

  var orientationX = document.getElementById("ox");
  var orientationY = document.getElementById("oy");
  var orientationZ = document.getElementById("oz");

  var accelerationX = document.getElementById("ax");
  var accelerationY = document.getElementById("ay");
  var accelerationZ = document.getElementById("az");

  var rotationX = document.getElementById("rx");
  var rotationY = document.getElementById("ry");
  var rotationZ = document.getElementById("rz");

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

    setInterval(function() {
      var deviceData = JSON.stringify({
        orientation: deviceOrientation,
        acceleration: acceleration,
        rotationRate: rotationRate
      });

      var oscMsg = [{
          type: "s",
          value: deviceData
      }];

      orientationX.textContent = deviceOrientation.x.toFixed(2);
      orientationY.textContent = deviceOrientation.y.toFixed(2);
      orientationZ.textContent = deviceOrientation.z.toFixed(2);

      accelerationX.textContent = acceleration.x.toFixed(2);
      accelerationY.textContent = acceleration.y.toFixed(2);
      accelerationZ.textContent = acceleration.z.toFixed(2);

      rotationX.textContent = rotationRate.x.toFixed(2);
      rotationY.textContent = rotationRate.y.toFixed(2);
      rotationZ.textContent = rotationRate.z.toFixed(2);

      console.log(deviceData);
      port.send({ address: path, args: oscMsg });

    }, 10);


    for (var i=0; i < inputs.length; i++) {
      inputs[i].setAttribute('disabled', '');
    }
  });
});
