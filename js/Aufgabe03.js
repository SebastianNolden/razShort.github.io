const add = (x,y) => x+y;
const sub = (x,y) => x-y;
const mul = (x,y) => x*y;
const div = (x,y) => x/y;
const square = x => x*x;
const root = x => Math.sqrt(x);

function identity_function(a1){
  return function(){
    return a1;
  };
}

function addf(x){
  return function(y){
    return x + y;
  };
}

function applyf(func){
  return function(x){
    return function(y){
      return func(x,y);
    }
  }
}

function curry(func, value){
  return function(y){
    return func(value, y);
  };
}

function addfInc(){
  return function(value){
    return value + 1;
  };
}

function applyfInc(func){
  return function(x){
    return func(x);
  };
}

function inc_curry(x){
  return curry(add, x)(1);
}

function methodize(func){
  return function(x){
    return func(this.valueOf(), x);
  };
}

function demethodize(func){
  return function(x,y){
    return func.call(x,y);
  };
}

function twice(func){
  return function(x){
    return func(x,x);
  };
}

function composeu(func1, func2){
  return function(x){
    return func2(func1(x));
  };
}

function composeb(func1, func2){
  return function(x, y, z){
    return func2(func1(x,y),z);
  };
}

function once(func){
  called = false;
  return function(x,y){
    if(called){
            throw {
        name: "Exception",
                message: "Fehler!",
                toString: function() {
          return this.name + ": " + this.message;
        }
      }
    } else {
      called = true;
      return func(x,y);
    }
  }
}

function counterf(x){
  var object = {
    val: x,
    inc: function() {
      return ++this.val;
    },
        dec: function() {
      return --this.val;
    }
  }
    return object;
}

function revocable(func){
  var object = {
        function: func,
        invoke: function(x) {
      this.function(x);
    },
        revoke: function(){
      this.function = function() {
                throw {
            name: "Exception",
          message: "Fehler",
          toString: function(){
            return this.name + ": " + this.message;
            }
        }
        }
    }
    }

    return object;
}

function vector() {
    var object = {
        array: [],
        append: function(x){
            this.array.push(x);
        },
        get: function(x){
            return this.array[x];
        },
        store: function(x,y){
            this.array[x] = y;
        },
        length: function(){
          return this.array.length;
        }
    }
    return object;
}

function pubsub() {
  var object = {
    func: vector(),
    subscribe: function(x){
      this.func.append(x);
    },
    publish: function(x){
      for(var i = 0; i < this.func.length(); i++){
        this.func.get(i)(x);
      }
    }
  };
  return object;
}

function gensymf(x){
  counter = counterf(0);
  return function(){
    symbol = x + this.counter.val;
    counter.inc();
    return symbol;
  }
}

function fibonaccif(x,y){
  array = vector();
  return function(){
    if(this.array.length() < 2){
      var value = 1;
    } else {
      var value = this.array.get(this.array.length()-1) + this.array.get(this.array.length()-2);
    }
    this.array.append(value);
    console.log(value);
  }
}

function fibonacci(x){
  if(x <= 1) return 1;
  return fibonacci(x-1) + fibonacci(x-2);
}

function addg(x){
  return function(y){
    if(y){
      x = x + y;
      return arguments.callee;
    } else {
      return x;
    }
  }
}

function applyg(func){
  return function(x){
    return function(y){
      if(y){
        x = func(x,y);
        return arguments.callee;
      } else {
        return x;
      }
    }
  }

}

function m(x,y){
  if(y){
    var object = {
      value: x,
      source: y
    };
  } else {
    var object = {
      value: x,
      source: x
    };
  }

  return object;
}

function addm(x,y){
  if(x && y){
    var object = {
      value: x.value + y.value,
      source: "(" + x.source + "+" + y.source + ")"
    }
    return object;
  } else {
    throw {
      name: "Exception",
      message: "Fehler",
      toString: function(){
        return this.name + ": " + this.message;
      }
    }
  }
}

function binarymf(x, y){
  return function(a,b){
    if(a && b){
      var object;
      if(a.hasOwnProperty("value") && b.hasOwnProperty("value")){
        object = {
          value: x(a.value,b.value),
          source: "(" + a.source + y + b.source + ")"
        };
        return object;
      } else {
        object = {
          value: x(a,b),
          source: "(" + a + y + b + ")"
        }
      }
      return object;
    }
  }
}

function unarymf(x,y){
  return function(a){
    if(a){
      var object;
      if(a.hasOwnProperty("value")){
        object = {
          value: x(a.value),
          source: "(" + y + a.source + ")"
        };
        return object;
      } else {
        object = {
          value: x(a),
          source: "(" + y + " " + a + ")"
        }
      }
      return object;
    }
  }
}

function hyp(x,y){
  return root(square(x) + square(y));
}

function exp(array){
  if(array[0] instanceof Function){
    if(array.length === 3) return array[0](exp(array[1]), exp(array[2]));
    if(array.length === 2) return array[0](exp(array[1]));
  } else {
    return array;
  }
}

var variable = 50;

function store(x){
  variable = x;
}
store(5);

function quatre(func, func_Value1, func_Value2, func_store){
  func_store(func(func_Value1(), func_Value2()));
}

function unaryc(func){
  return function(value, func2){
    func2(func(value));
  }
}
sqrtc = unaryc(Math.sqrt);
sqrtc(81, store);

function binaryc(func){
  return function(v1, v2, callback){
    callback(func(v1, v2));
  }
}
