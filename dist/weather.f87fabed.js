// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/lib/types.js":[function(require,module,exports) {
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Reducer = function Reducer(run) {
  return {
    run: run,
    concat: function concat(other) {
      return Reducer(function (acc, x) {
        return other.run(run(acc, x), x);
      });
    },
    contramap: function contramap(f) {
      return Reducer(function (acc, x) {
        return run(acc, f(x));
      });
    },
    map: function map(f) {
      return Reducer(function (acc, x) {
        return f(run(acc, x));
      });
    }
  };
};

var Id = function Id(x) {
  return {
    map: function map(f) {
      return Id(f(x));
    },
    chain: function chain(f) {
      return f(x);
    },
    extract: function extract() {
      return x;
    },
    concat: function concat(o) {
      return Id(x.concat(o.extract()));
    }
  };
};

Id.of = function (x) {
  return Id(x);
};

var IdT = function IdT(M) {
  var Id = function Id(mx) {
    return {
      map: function map(f) {
        return Id(mx.map(f));
      },
      chain: function chain(f) {
        return Id(mx.chain(function (x) {
          return f(x).extract();
        }));
      },
      extract: function extract() {
        return mx;
      }
    };
  };

  Id.of = function (x) {
    return Id(M.of(x));
  };

  Id.lift = function (mx) {
    return Id(mx);
  };

  return Id;
};

var IO = function IO(run) {
  return {
    run: run,
    map: function map(f) {
      return IO(function () {
        return f(run());
      });
    },
    chain: function chain(f) {
      return IO(function () {
        return f(run()).run();
      });
    },
    concat: function concat(other) {
      return IO(function () {
        return run().concat(other.run());
      });
    }
  };
};

IO.of = function (x) {
  return IO(function () {
    return x;
  });
};

var Fn = function Fn(g) {
  return {
    map: function map(f) {
      return Fn(function (x) {
        return f(g(x));
      });
    },
    chain: function chain(f) {
      return Fn(function (x) {
        return f(g(x)).run(x);
      });
    },
    concat: function concat(other) {
      return Fn(function (x) {
        return g(x).concat(other.run(x));
      });
    },
    run: g
  };
};

Fn.ask = Fn(function (x) {
  return x;
});

Fn.of = function (x) {
  return Fn(function () {
    return x;
  });
};

var FnT = function FnT(M) {
  var Fn = function Fn(g) {
    return {
      map: function map(f) {
        return Fn(function (x) {
          return g(x).map(f);
        });
      },
      chain: function chain(f) {
        return Fn(function (x) {
          return g(x).chain(function (y) {
            return f(y).run(x);
          });
        });
      },
      concat: function concat(other) {
        return Fn(function (x) {
          return g(x).concat(other.run(x));
        });
      },
      run: g
    };
  };

  Fn.ask = Fn(function (x) {
    return M.of(x);
  });

  Fn.of = function (x) {
    return Fn(function () {
      return M.of(x);
    });
  };

  Fn.lift = function (x) {
    return Fn(function () {
      return x;
    });
  };

  return Fn;
};

var Either = function () {
  var Right = function Right(x) {
    return {
      isLeft: false,
      chain: function chain(f) {
        return f(x);
      },
      ap: function ap(other) {
        return other.map(x);
      },
      alt: function alt(other) {
        return Right(x);
      },
      extend: function extend(f) {
        return f(Right(x));
      },
      concat: function concat(other) {
        return other.fold(function (x) {
          return other;
        }, function (y) {
          return Right(x.concat(y));
        });
      },
      traverse: function traverse(of, f) {
        return f(x).map(Right);
      },
      map: function map(f) {
        return Right(f(x));
      },
      fold: function fold(_, g) {
        return g(x);
      },
      toString: function toString() {
        return "Right(".concat(x, ")");
      }
    };
  };

  var Left = function Left(x) {
    return {
      isLeft: true,
      chain: function chain(_) {
        return Left(x);
      },
      ap: function ap(_) {
        return Left(x);
      },
      extend: function extend(_) {
        return Left(x);
      },
      alt: function alt(other) {
        return other;
      },
      concat: function concat(_) {
        return Left(x);
      },
      traverse: function traverse(of, _) {
        return of(Left(x));
      },
      map: function map(_) {
        return Left(x);
      },
      fold: function fold(f, _) {
        return f(x);
      },
      toString: function toString() {
        return "Left(".concat(x, ")");
      }
    };
  };

  var of = Right;

  var tryCatch = function tryCatch(f) {
    try {
      return Right(f());
    } catch (e) {
      return Left(e);
    }
  };

  var fromNullable = function fromNullable(x) {
    return x != null ? Right(x) : Left(x);
  };

  return {
    Right: Right,
    Left: Left,
    of: of,
    tryCatch: tryCatch,
    fromNullable: fromNullable
  };
}();

var EitherT = function EitherT(M) {
  var Right = function Right(mx) {
    return {
      isLeft: false,
      extract: function extract() {
        return mx;
      },
      chain: function chain(f) {
        return Right(mx.chain(function (x) {
          return f(x).extract();
        }));
      },
      map: function map(f) {
        return Right(mx.map(f));
      },
      fold: function fold(_, g) {
        return g(mx);
      }
    };
  };

  var Left = function Left(mx) {
    return {
      isLeft: true,
      extract: function extract() {
        return mx;
      },
      chain: function chain(_) {
        return Left(mx);
      },
      map: function map(_) {
        return Left(mx);
      },
      fold: function fold(h, _) {
        return h(mx);
      }
    };
  };

  var of = function of(x) {
    return Right(M.of(x));
  };

  var tryCatch = function tryCatch(f) {
    try {
      return Right(M.of(f()));
    } catch (e) {
      return Left(e);
    }
  };

  var lift = Right;
  return {
    of: of,
    tryCatch: tryCatch,
    lift: lift,
    Right: Right,
    Left: Left
  };
};

var Task = function Task(fork) {
  return {
    fork: fork,
    ap: function ap(other) {
      return Task(function (rej, res) {
        return fork(rej, function (f) {
          return other.fork(rej, function (x) {
            return res(f(x));
          });
        });
      });
    },
    map: function map(f) {
      return Task(function (rej, res) {
        return fork(rej, function (x) {
          return res(f(x));
        });
      });
    },
    chain: function chain(f) {
      return Task(function (rej, res) {
        return fork(rej, function (x) {
          return f(x).fork(rej, res);
        });
      });
    },
    concat: function concat(other) {
      return Task(function (rej, res) {
        return fork(rej, function (x) {
          return other.fork(rej, function (y) {
            return res(x.concat(y));
          });
        });
      });
    },
    fold: function fold(f, g) {
      return Task(function (rej, res) {
        return fork(function (x) {
          return f(x).fork(rej, res);
        }, function (x) {
          return g(x).fork(rej, res);
        });
      });
    }
  };
};

Task.of = function (x) {
  return Task(function (rej, res) {
    return res(x);
  });
};

Task.rejected = function (x) {
  return Task(function (rej, res) {
    return rej(x);
  });
};

Task.fromPromised = function (fn) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return Task(function (rej, res) {
      return fn.apply(void 0, args).then(res).catch(rej);
    });
  };
};

var TaskT = function TaskT(M) {
  var Task = function Task(fork) {
    return {
      fork: fork,
      map: function map(f) {
        return Task(function (rej, res) {
          return fork(rej, function (mx) {
            return res(mx.map(f));
          });
        });
      },
      chain: function chain(f) {
        return Task(function (rej, res) {
          return fork(rej, function (mx) {
            return mx.chain(function (x) {
              return f(x).fork(rej, res);
            });
          });
        });
      }
    };
  };

  Task.lift = function (x) {
    return Task(function (rej, res) {
      return res(x);
    });
  };

  Task.of = function (x) {
    return Task(function (rej, res) {
      return res(M.of(x));
    });
  };

  Task.rejected = function (x) {
    return Task(function (rej, res) {
      return rej(x);
    });
  };

  return Task;
};

var State = function State(run) {
  return {
    run: run,
    chain: function chain(f) {
      return State(function (x) {
        var _run = run(x),
            _run2 = _slicedToArray(_run, 2),
            y = _run2[0],
            s = _run2[1];

        return f(y).run(s);
      });
    },
    map: function map(f) {
      return State(function (x) {
        var _run3 = run(x),
            _run4 = _slicedToArray(_run3, 2),
            y = _run4[0],
            s = _run4[1];

        return [f(y), s];
      });
    },
    concat: function concat(other) {
      return State(function (x) {
        var _run5 = run(x),
            _run6 = _slicedToArray(_run5, 2),
            y = _run6[0],
            s = _run6[1];

        var _other$run = other.run(x),
            _other$run2 = _slicedToArray(_other$run, 2),
            y1 = _other$run2[0],
            _s1 = _other$run2[1];

        return [y.concat(y1), s];
      });
    }
  };
};

State.of = function (x) {
  return State(function (s) {
    return [x, s];
  });
};

State.get = State(function (x) {
  return [x, x];
});

State.modify = function (f) {
  return State(function (s) {
    return [null, f(s)];
  });
};

State.put = function (x) {
  return State(function (s) {
    return [null, x];
  });
};

var StateT = function StateT(M) {
  var State = function State(run) {
    return {
      run: run,
      chain: function chain(f) {
        return State(function (x) {
          return run(x).chain(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                y = _ref2[0],
                s = _ref2[1];

            return f(y).run(s);
          });
        });
      },
      map: function map(f) {
        return State(function (x) {
          return run(x).map(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                y = _ref4[0],
                s = _ref4[1];

            return [f(y), s];
          });
        });
      },
      concat: function concat(other) {
        return State(function (x) {
          return run(x).chain(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
                y = _ref6[0],
                s = _ref6[1];

            return other.run(x).map(function (_ref7) {
              var _ref8 = _slicedToArray(_ref7, 2),
                  y1 = _ref8[0],
                  s1 = _ref8[1];

              return [y.concat(y1), s];
            });
          });
        });
      }
    };
  };

  State.lift = function (m) {
    return State(function (s) {
      return m.map(function (x) {
        return [x, s];
      });
    });
  };

  State.of = function (x) {
    return State(function (s) {
      return M.of([x, s]);
    });
  };

  State.get = State(function (x) {
    return M.of([x, x]);
  });

  State.modify = function (f) {
    return State(function (s) {
      return M.of([null, f(s)]);
    });
  };

  State.put = function (x) {
    return State(function (s) {
      return M.of([null, x]);
    });
  };

  return State;
};

module.exports = {
  Id: Id,
  IdT: IdT,
  Task: Task,
  TaskT: TaskT,
  State: State,
  StateT: StateT,
  Fn: Fn,
  FnT: FnT,
  Either: Either,
  EitherT: EitherT,
  IO: IO,
  Reducer: Reducer
};
},{}],"src/weather/weather.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = app;

var _types = require("../lib/types");

function fetchIt(url) {
  return (0, _types.Task)(function (rej, res) {
    return fetch(url).then(res).catch(rej);
  });
}

function getUrlOpenWeather(cityName) {
  return "http://api.openweathermap.org/data/2.5/weather?q=".concat(cityName, "&appid=dfc681da09a98952250b96eb90d71cf1");
}

function ui() {
  var goButton = document.querySelector(".find");
  var input = document.getElementById("city-name");
  var results = document.querySelector(".results");
  console.log(goButton);
  goButton.addEventListener('click', function () {
    var cityName = input.value.trim();
    return fetchIt(getUrlOpenWeather(cityName)).fork(console.error, console.log);
  });
}

function app() {
  ui();
} //-------------------------
},{"../lib/types":"src/lib/types.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50062" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/weather/weather.js"], null)
//# sourceMappingURL=/weather.f87fabed.js.map