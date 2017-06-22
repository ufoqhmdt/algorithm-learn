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
      const valNumber = Number.parseInt(currentValueTrim);
      console.log(accumulator, '---', valNumber, currentIndex, '--');
      if (currentIndex === 1) {
        if (accumulator < 0 || accumulator > 255) {

          throw new IPError('must be between 0 and 255');
        }
      }
      if (valNumber < 0 || valNumber > 255) {
        throw new IPError('must be between 0 and 255');
      }
      let accumulator2 = null;
      if(typeof accumulator === 'string'){
        accumulator2 = parseInt(accumulator.toString().trim());
      }
      accumulator2 = accumulator;
      accumulator2 |= (valNumber << ((3 - currentIndex) * 8));
      return accumulator2;
    });
    return Number.parseInt(result);
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = parseIp;