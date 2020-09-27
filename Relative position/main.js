var ctx = null;

var form = null,
  dot = {},
  circle = {};

function setParametrs() {
  circle.r = +form.value1.value;
  circle.x = +form.value2.value;
  circle.y = +form.value3.value;

  dot.x1 = +form.value4.value;
  dot.y1 = +form.value5.value;

  dot.x2 = +form.value6.value;
  dot.y2 = +form.value7.value;

  var n = locationCircleAndDots(
    circle.x,
    circle.y,
    circle.r,
    dot.x1,
    dot.y1,
    dot.x2,
    dot.y2
  );
  checkPosition(n);
  draw();
}

function locationCircleAndDots(x, y, r, x1, y1, x2, y2) {
  var v1 = x1 - x2;
  var v2 = y1 - y2;
  var s = x1 * y2 - x2 * y1;
  var k1 = -2 * x;
  var k2 = -2 * y;
  var f = x * x + y * y - r * r;

  var a = v1 * v1 + v2 * v2;
  var b = v1 * v1 * k1 + 2 * s * v2 + v1 * k2 * v2;
  var c = f * v1 * v1 + s * s + v1 * k2 * s;
  var D = b * b - 4 * a * c;

  if (D < 0) {
    return 0;
  } else if (D < 0.001) {
    return 1;
  }

  return 2;
}

function checkPosition(locationCircleAndDots) {
  switch (locationCircleAndDots) {
    case 0:
      form.value8.value = "Окружность и прямая не пересекаются!";
      break;
    case 1:
      form.value8.value = "Прямая касается окружности!";
      break;
    case 2:
      form.value8.value = "Окружность и прямая пересекаются!";
      break;
  }
}

function draw() {
  ctx.clearRect(0, 0, 500, 500);
  ctx.beginPath();
  ctx.strokeStyle = "#444";
  ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, true);

  ctx.moveTo(dot.x1 + 0.5, dot.y1 + 0.5);
  ctx.lineTo(dot.x2 + 0.5, dot.y2 + 0.5);
  ctx.stroke();
}

window.onload = function () {
  ctx = document.getElementById("canvas").getContext("2d");
  form = document.forms[0];
  setParametrs();
  draw();
};
