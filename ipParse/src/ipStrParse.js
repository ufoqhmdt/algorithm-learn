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

    // console.log(items);
    const result = items.reduce((accumulator, currentValue, currentIndex, array) => {
      // console.log('accumulator', accumulator, 'currentValue', currentValue, currentIndex, '--');
      const acc = accumulator.trim();
      const cur = currentValue.trim();
      let curInt = Number.parseInt(cur);

      checkException(acc, cur);
      checkScope(curInt);

      // let accumulator2 = null;
      // if (typeof accumulator === 'string') {
      //   accumulator2 = parseInt(accumulator.toString().trim());
      // }

      // console.log(curInt, '<<<')
      if (currentIndex === 1) {
        checkScope(accumulator);
        // console.log('1---')
        accumulator = transfer(accumulator);
        curInt = transfer(curInt);
      } else {
        curInt = transfer(curInt);
      }
      // console.log('accumulator', accumulator, 'currentValue', curInt, currentIndex, '--');
      return accumulator.concat(curInt);
    });
    return Number.parseInt(result, 2);
  } catch (e) {
    throw new Error(e);
  }
}

function transfer(val) {
  // console.log('>>>1', val);
  val = parseInt(val).toString(2);
  // console.log('>>>2', val);
  if (val.length < 8) {
    const zeroNumber = 8 - val.length;
    for (var i = 0; i < zeroNumber; i++) {
      val = '0'.concat(val);
    }
  }
  // console.log('>>>3', val);
  return val
}

function checkException(acc, cur) {

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