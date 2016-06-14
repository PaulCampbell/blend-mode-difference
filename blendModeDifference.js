module.exports = function(data1, data2) {
  if (data1.length != data2.length) {
    console.log(data1.length, data2.length)
    throw 'data different length';
  }

  var target = new Array();
  var i = 0;
  while (i < (data1.length * 0.25)) {
    var average1 = (data1[4 * i] + data1[4 * i + 1] + data1[4 * i + 2]) / 3;
    var average2 = (data2[4 * i] + data2[4 * i + 1] + data2[4 * i + 2]) / 3;
    var diff = threshold(fastAbs(average1 - average2));
    target[4 * i] = diff;
    target[4 * i + 1] = diff;
    target[4 * i + 2] = diff;
    target[4 * i + 3] = 0xFF;
    ++i;
  }
  return target;
}

function fastAbs(value) {
  return (value ^ (value >> 31)) - (value >> 31);
}

function threshold(value) {
  return (value > 0x15) ? 0xFF : 0;
}
