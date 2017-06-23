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
    console.log(ipStrParse('172.18.199.12'), '00000000');
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
    }, 'Error: is invalid input');
  });

  it('异常测试：长短必须为4', function() {
    assert.throws(function() {
      ipStrParse('172.12.12.23.33');
    }, 'Error: is invalid input');
  });

  it('异常测试：每一个item都应该在0到255之间', function() {
    assert.throws(function() {
      ipStrParse('172.12.211.290');
    }, 'is invalid input');
  });

  it('异常测试：每一个item都应该在0到255之间', function() {
    assert.throws(function() {
      ipStrParse('-172.12.211.22');
    }, 'is invalid input');
  });

  it('异常测试：每一个item都应该在0到255之间', function() {
    assert.throws(function() {
      ipStrParse('72.-12.211.22');
    }, 'is invalid input');
  });
  it('异常测试：每一个item都应该在0到255之间', function() {
    assert.throws(function() {
      ipStrParse('72.12.211.-22');
    }, 'is invalid input');
  });
  it('ERROR', function() {
    assert.throws(function() {
      ipStrParse("17 2.168.5.1");
    }, 'Error: is invalid input');
  });


  // it('ERROR', function() {
  //   assert.throws(function() {
  //     ipStrParse('72.12.211.-22');
  //   }, 'is invalid input');
  // });



  // it('ERROR', function() {
  //   assert.throws(function() {
  //     ipStrParse(NULL);
  //   }, 'is invalid input');
  // });
  // it('ERROR', function() {
  //   assert.throws(function() {
  //     ipStrParse("");
  //   }, 'is invalid input');
  // });
  // it('ERROR', function() {
  //   assert.throws(function() {
  //     ipStrParse("fdsafdsa");
  //   }, 'is invalid input');
  // });
  // it('ERROR', function() {
  //   assert.throws(function() {
  //     ipStrParse("17x.168.5.1");
  //   }, 'is invalid input');
  // });
  // it('ERROR', function() {
  //   assert.throws(function() {
  //     ipStrParse("9299.168.5.1");
  //   }, 'is invalid input');
  // });
  // it('ERROR', function() {
  //   assert.throws(function() {
  //     ipStrParse("1172.1629.5.1");
  //   }, 'is invalid input');
  // });
  // it('ERROR', function() {
  //   assert.throws(function() {
  //     ipStrParse("172.12689.5.1");
  //   }, 'is invalid input');
  // });
  // it('ERROR', function() {
  //   assert.throws(function() {
  //     ipStrParse("172.1689.5.1.9");
  //   }, 'is invalid input');
  // });
  // it('ERROR', function() {
  //   assert.throws(function() {
  //     ipStrParse("172.168.-8.1");
  //   }, 'is invalid input');
  // });
  // it('ERROR', function() {
  //   assert.throws(function() {
  //     ipStrParse(".172.168.5.1");
  //   }, 'is invalid input');
  // });
  // it('ERROR', function() {
  //   assert.throws(function() {
  //     ipStrParse("172.168.1.");
  //   }, 'is invalid input');
  // });
  // it('ERROR', function() {
  //   assert.throws(function() {
  //     ipStrParse("172.168.5.1.");
  //   }, 'is invalid input');
  // });
  // it('ERROR', function() {
  //   assert.throws(function() {
  //     ipStrParse("172.168.5.");
  //   }, 'is invalid input');
  // });
  // it('ERROR', function() {
  //   assert.throws(function() {
  //     ipStrParse("172..168.5");
  //   }, 'is invalid input');
  // });
  // it('ERROR', function() {
  //   assert.throws(function() {
  //     ipStrParse("123456");
  //   }, 'is invalid input');
  // });
  // it('ERROR', function() {
  //   assert.throws(function() {
  //     ipStrParse("-1");
  //   }, 'is invalid input');
  // });



  // testResult("192.168.1.1", 192 << 24 | 168 << 16 | 1 << 8 | 1, S_OK);
  //  testResult("0.128.2.1", 0  << 24 | 128 << 16 | 2 << 8 | 1, S_OK);
  //  testResult("0192.000168.1.1", 192 << 24 | 168 << 16 | 1 << 8 | 1, S_OK);
  //  testResult("172.168.5.1", 172 << 24 | 168 << 16 | 5 << 8 | 1, S_OK);
  //  testResult("172.  168.5.1", 172 << 24 | 168 << 16 | 5 << 8 | 1, S_OK);
  //  testResult("172.168  .5.1", 172 << 24 | 168 << 16 | 5 << 8 | 1, S_OK);
  //  testResult("  172.168 . 5 .  1 ", 172 << 24 | 168 << 16 | 5 << 8 | 1, S_OK);


});