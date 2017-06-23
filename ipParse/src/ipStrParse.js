const IPError = require('./IPError');

function parseIp(ip) {
  try {
    const items = ip.split('.');
    if (items.length !== 4) {
      throw new IPError('length error');
    }
    console.log(items);
    const result = items.reduce((accumulator, currentValue, currentIndex, array) => {
      const currentValueTrim = currentValue.trim();
      if (currentValueTrim.indexOf(' ') !== -1) {
        throw new IPError();
      }
      let currentValueTrimInt = Number.parseInt(currentValueTrim);
      checkScope(currentValueTrimInt);

      // let accumulator2 = null;
      // if (typeof accumulator === 'string') {
      //   accumulator2 = parseInt(accumulator.toString().trim());
      // }

      console.log(currentValueTrimInt,'<<<')
      if (currentIndex === 1) {
        checkScope(accumulator);
        console.log('1---')
        accumulator = transfer(accumulator);
        currentValueTrimInt = transfer(currentValueTrimInt);
      } else {
        currentValueTrimInt = transfer(currentValueTrimInt);
      }
      console.log('accumulator', accumulator, 'currentValue', currentValueTrimInt, currentIndex, '--');
      return accumulator.concat(currentValueTrimInt);
    });
    return Number.parseInt(result,2);
  } catch (e) {
    throw new Error(e);
  }
}

function transfer(val) {
  console.log('>>>1',val);
  val = parseInt(val).toString(2);
  console.log('>>>2',val);
  if (val.length < 8) {
    const zeroNumber = 8 - val.length;
    for (var i = 0; i < zeroNumber; i++) {
      val='0'.concat(val);
    }
  }
  console.log('>>>3',val);
  return val
}

function checkScope(val){
  if (val < 0 || val > 255) {
        throw new IPError('must be between 0 and 255');
      }
}

module.exports = parseIp;