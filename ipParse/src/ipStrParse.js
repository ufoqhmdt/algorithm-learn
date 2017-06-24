const IPError = require('./IPError');

function parseIp(ip) {
  try {
    if (!ip) {
      throw new IPError();
    }
    const items = ip.split('.');
    if (items.length !== 4) {
      throw new IPError();
    }
    const result = items.reduce((accumulator, currentValue, currentIndex, array) => {
      // console.log('accumulator', accumulator, 'currentValue', currentValue, currentIndex, '--');
      const acc = accumulator.trim();
      const cur = currentValue.trim();

      checkException(acc, cur);
      let curInt = Number.parseInt(cur);
      checkScope(curInt);

      if (currentIndex === 1) {
        checkScope(accumulator);
        accumulator = transfer(accumulator);
        curInt = transfer(curInt);
      } else {
        curInt = transfer(curInt);
      }
      return accumulator.concat(curInt);
    });
    return Number.parseInt(result, 2);
  } catch (e) {
    throw new Error(e);
  }
}

function transfer(val) {
  val = parseInt(val).toString(2);
  if (val.length < 8) {
    const zeroNumber = 8 - val.length;
    for (var i = 0; i < zeroNumber; i++) {
      val = '0'.concat(val);
    }
  }
  return val
}

function checkException(acc, cur) {
  if (!acc || !cur) {
    throw new IPError();
  }
  if (isNaN(acc) || isNaN(cur)) {
    throw new IPError();
  }
  if (cur.indexOf(' ') !== -1 || acc.indexOf(' ') !== -1) {
    throw new IPError();
  }
}

function checkScope(val) {
  if (val < 0 || val > 255) {
    throw new IPError();
  }
}

module.exports = parseIp;