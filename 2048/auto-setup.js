'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fs = require('fs');

var _require = require('child_process'),
    exec = _require.exec;

function terminateDueToError(errorMessage) {
  console.log(errorMessage);
  process.exit();
}

function createStoreJs() {
  var storeText = 'import { createStore, combineReducers } from \'redux\';\nimport { circletReducer as circlet } from \'circlet\';\n\nconst reducer = combineReducers({ circlet });\nconst store = createStore(reducer);\n\nexport default store;';

  var promise = new Promise(function (resolve, reject) {
    var path = __dirname + '/src/store.js';

    fs.writeFile(path, storeText, function (err) {
      if (err) {
        terminateDueToError('An error occured while creating ' + path + '.');
      }

      resolve('Finished creating ' + path + '!');
    });
  });

  return promise;
}

function editIndexJs() {
  var promise = new Promise(function (resolve, reject) {
    var path = __dirname + '/src/index.js';

    fs.readFile(path, { encoding: 'utf-8' }, function (err, data) {
      if (err) {
        terminateDueToError('An error occured while reading ' + path + '.');
      }

      // Replace code inside ReactDOM.render();
      var ref = 'ReactDOM.render(<App />, document.getElementById(\'root\'));';
      data = data.replace(ref, 'ReactDOM.render(\n  <Provider store={store}>\n    <div>\n      <Circlet />\n      <App />\n    </div>\n  </Provider>,\n  document.getElementById(\'root\')\n);');

      // Insert the relevant imports
      var lines = data.split(/\r?\n/);
      var newData = [].concat(_toConsumableArray(lines.slice(0, 2)), ['import { Provider } from \'react-redux\';', 'import Circlet from \'circlet\';', 'import store from \'./store\';'], _toConsumableArray(lines.slice(2))).join('\n');

      fs.writeFile(path, newData, function (err) {
        if (err) {
          terminateDueToError('An error occured while creating ' + path + '.');
        }

        resolve('Finished updating ' + path + '!');
      });
    });
  });

  return promise;
}

// Main
var _process = process,
    stdin = _process.stdin,
    stdout = _process.stdout;

var warning = '***CAUTION***\nThis script is intended to be used with a project freshly created with create-react-app. It will overwrite ./src/store.js and App.js. Do you want to continue? (y/N)';

stdout.write(warning);
stdin.once('data', function (data) {
  var response = data.toString().trim().toLowerCase();

  if (response === 'y' || response === 'yes') {
    Promise.all([createStoreJs(), editIndexJs()]).then(function (response) {
      console.log('\n' + response.join('\n') + '\n\n=========\nAll done!\n=========\n\nIf you haven\'t already installed react-redux and redux, this is a good time to do so!\n\n=========');
      process.exit();
    });
  }
});