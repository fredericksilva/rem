'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
'use strict';

require('instapromise');

const child_process = require('child_process');
const path = require('path');
const fs = require('fs');

var PodfileLoader = (function () {
  function PodfileLoader(settings) {
    _classCallCheck(this, PodfileLoader);

    this.settings = settings;
  }

  _createClass(PodfileLoader, [{
    key: 'readEnsuredAsync',

    /**
     * Reads the Podfile in the given directory, creating one if it doesn't exist,
     * and returns its contents
     */
    value: _asyncToGenerator(function* () {
      var directory = this.settings.xcodeProjectDirectory;
      var contents = yield this.readAsync(directory);
      if (contents) {
        return contents;
      }

      yield this.createAsync(directory);
      contents = this.readAsync(directory);
      if (!contents) {
        throw new Error('Created a Podfile but was unable to read its contents');
      }
      return contents;
    })
  }, {
    key: 'readAsync',

    /**
     * Reads the Podfile in the given directory and returns its contents, or null
     * if it doesn't exist
     */
    value: _asyncToGenerator(function* () {
      var directory = this.settings.xcodeProjectDirectory;
      var podfilePath = path.join(directory, 'Podfile');
      try {
        return yield fs.promise.readFile(podfilePath, 'utf8');
      } catch (error) {
        if (error.code === 'ENOENT') {
          return null;
        }
        throw error;
      }
    })
  }, {
    key: 'writeAsync',

    /**
     * Writes the Podfile in the given directory.
     */
    value: _asyncToGenerator(function* (contents) {
      var directory = this.settings.xcodeProjectDirectory;
      var podfilePath = path.join(directory, 'Podfile');
      yield fs.promise.writeFile(podfilePath, contents, 'utf8');
    })
  }, {
    key: 'createAsync',

    /**
     * Creates a Podfile in the given directory with the help of `pod`
     */
    value: function createAsync() {
      var _this = this;

      return new _Promise(function (resolve, reject) {
        var directory = _this.settings.xcodeProjectDirectory;
        var options = { cwd: directory };
        child_process.exec('pod init', options, function (processError, stdout, stderr) {
          if (processError) {
            var error = new Error('Could not create Podfile:\n' + stdout);
            error.cause = processError;
            error.stdout = stdout;
            error.stderr = stderr;
            reject(error);
          } else {
            resolve({ stdout: stdout, stderr: stderr });
          }
        });
      });
    }
  }]);

  return PodfileLoader;
})();

exports['default'] = PodfileLoader;
module.exports = exports['default'];
//# sourceMappingURL=sourcemaps/PodfileLoader.js.map