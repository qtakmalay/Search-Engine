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
})({"../middleware/is-auth.js":[function(require,module,exports) {
module.exports = (req, res, next) => {
  next();
};
},{}],"../models/search_model.js":[function(require,module,exports) {
const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var searchSchema = new Schema({
  searchText: {
    type: String,
    required: true
  } // description: {
  //   type: String,
  //   required: true
  // },
  // image: {
  //   public_id: {
  //     type: String
  //   },
  //   url: {
  //     type: String,
  //     required: true
  //   }
  // },
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User'
  // }

});
module.exports = mongoose.model('Search', searchSchema);
},{}],"../controller/controller_search.js":[function(require,module,exports) {
"use strict";

require("regenerator-runtime/runtime");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const fs = require('fs');
// const path = require('path');
// const PDFDocument = require('pdfkit');
const Search = require('../models/search_model'); //
//var html = $('html')


exports.getSearches = (req, res, next) => {
  Search.find().then(search => {
    res.render('search/index', {
      search: search,
      pageTitle: search,
      path: '/'
    });
    console.log(search);
  }).catch(err => console.log(err));
};

exports.getSearchPage = (req, res, next) => {
  const access_token = '3267694242802c23f79fea3dbc90a0877845de1e';
  const projects_count = 'http://www.archtscience.com:8070/api/projects/';
  const projects = "http://www.archtscience.com:8070/api/dm/tasks/";
  var counter, found_search;

  if (req.query.srchq === "") {
    res.render('search/create-new', {
      path: '/create'
    });
  } else {
    _axios.default.get(projects_count, {
      headers: {
        'Authorization': `Token  ${access_token}`
      }
    }).then(response => {
      // access parsed JSON response data using response.data field
      console.log(response.data.count);
      counter = response.data.count;
      var texts;

      for (let i = 1; i <= response.data.count; i++) {
        _axios.default.get(projects + i, {
          headers: {
            'Authorization': `Token  ${access_token}`
          }
        }).then(response => {
          // access parsed JSON response data using response.data field
          console.log(response.data.data.text);
          texts += '<h1>' + response.data.data.text + '</h1><br/>'; //res.write('<span>' + response.data.data.text + '</span><br/>');

          if (i == counter) {
            console.log("!!!!!!!!!!!!!!!!!!!");
            res.render('search/create-new', function (err, html) {
              res.send(texts);
            });
          } else {
            console.log("I is " + i + " response.data.count " + response.data.count);
          } //req.body.charactersList = '<span>' + response.data.data.text + '</span><br/>'

        }).catch(error => {
          console.log(error);
        });
      }
    }).catch(error => {
      console.log(error);
    }); // axios.get(projects, {
    //   headers: {
    //     'Authorization': `Token  ${access_token}`
    //   }
    // })
    //   .then(response => {
    //     // access parsed JSON response data using response.data field
    //     console.log(response.data.data.text)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })

  }
};

exports.getPdfText = (req, res, next) => {
  res.render('search/pdf-to-txt', {
    path: '/pdftotxt'
  });
};

exports.getMainPage = (req, res, next) => {
  res.render('search/index', {
    path: '/index'
  });
};

exports.getTestingPage = (req, res, next) => {
  res.render('search/tests', {
    path: '/tests'
  });
};

exports.getSearchTestPage = (req, res, next) => {
  res.render('search/search-test', {
    path: '/search-test'
  });
};
},{"../models/search_model":"../models/search_model.js"}],"../routes/router_search.js":[function(require,module,exports) {
const path = require('path');

const express = require('express');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

const searchController = require("../controller/controller_search");

module.exports = router;
router.get('/morning', isAuth, searchController.getSearches);
router.get('/create', isAuth, searchController.getSearchPage);
router.get('/pdftotxt', isAuth, searchController.getPdfText);
router.get('/', isAuth, searchController.getMainPage);
router.get('/tests', isAuth, searchController.getTestingPage);
router.get('/search-test', isAuth, searchController.getSearchTestPage); //router.post('/create', isAuth, searchController.getResultSearch);
},{"../middleware/is-auth":"../middleware/is-auth.js","../controller/controller_search":"../controller/controller_search.js"}],"app.js":[function(require,module,exports) {
const express = require('express');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>A JavaScript project</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>A JavaScript project</h1>
</body>
</html>`;
const app = express();

const mongoose = require('mongoose');

const url = `mongodb+srv://azatsoft:PUn38zyJUyuge5xG@cluster0.azu6g.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const searchRoutes = require("../routes/router_search");

const searchController = require("../controller/controller_search");

mongoose.connect(url, connectionParams).then(() => {
  console.log('Connected to database ');
}).catch(err => {
  console.error(`Error connecting to the database. \n${err}`);
}); //app.use('/controller',searchController);

app.use(searchRoutes);
app.use(express.static('public'));
app.use('/css', express.static('public/css'));
app.use('/images', express.static('public/images'));
app.use('/js', express.static('public/js'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);
app.set("views", "views");
module.exports = app;
},{"../routes/router_search":"../routes/router_search.js","../controller/controller_search":"../controller/controller_search.js"}],"index.js":[function(require,module,exports) {
const app = require('./app');

const port = '8888';
app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
},{"./app":"app.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map