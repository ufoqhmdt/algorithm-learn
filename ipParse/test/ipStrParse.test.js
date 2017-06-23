const ipStrParse = require('../src/ipStrParse');
const IPError = require('../src/IPError');
const expect = require('chai').expect;
const assert = require('chai').assert;

describe('test ip parse', function() {
  it('结果必须是number', function() {
    const rtn = ipStrParse('172.18.199.12');
    assert.isNumber(rtn, 'ip parse result is number');
  });

  it('无异常', function() {
    expect(function() {
      ipStrParse('172.18.199.12')
    }).to.not.throw();
  });
  it('无异常', function() {
    expect(function() {
      ipStrParse('0.0.0.0')
    }).to.not.throw();
  });
  it('无异常', function() {
    expect(function() {
      ipStrParse('1.1.1.1')
    }).to.not.throw();
  });
  it('无异常', function() {
    expect(function() {
      ipStrParse('255.255.255.255')
    }).to.not.throw();
  });

  it('运算结果的值匹配', function() {
    console.log(ipStrParse('172.18.199.12'),'00000000');
    expect(ipStrParse('172.18.199.12')).to.equal(2886911756);
  });

  it('异常测试：数字中间有空格是非法的', function() {
    assert.throws(function() {
      ipStrParse('172.1 8.199.12');
    }, 'Error: is invalid input');
  });

  it('异常测试：长短必须为4', function() {
    assert.throws(function() {
      ipStrParse('172.12');
    }, 'Error: length error');
  });

  it('异常测试：长短必须为4', function() {
    assert.throws(function() {
      ipStrParse('172.12.12.23.33');
    }, 'Error: length error');
  });

  it('异常测试：每一个item都应该在0到255之间', function() {
    assert.throws(function() {
      ipStrParse('172.12.211.290');
    }, 'Error: must be between 0 and 255');
  });

  it('异常测试：每一个item都应该在0到255之间', function() {
    assert.throws(function() {
      ipStrParse('-172.12.211.22');
    }, 'Error: must be between 0 and 255');
  });

  it('异常测试：每一个item都应该在0到255之间', function() {
    assert.throws(function() {
      ipStrParse('72.-12.211.22');
    }, 'Error: must be between 0 and 255');
  });
  it('异常测试：每一个item都应该在0到255之间', function() {
    assert.throws(function() {
      ipStrParse('72.12.211.-22');
    }, 'Error: must be between 0 and 255');
  });

});