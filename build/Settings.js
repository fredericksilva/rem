'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

'use strict';

require('instapromise');

const path = require('path');
const fs = require('fs');

const SETTINGS_KEY = 'reactNativeApp';
const REACT_NATIVE_PATH_KEY = 'reactNativePath';
const XCODE_PROJECT_DIRECTORY_KEY = 'xcodeProjectDirectory';

const DEFAULT_REACT_NATIVE_PATH = 'node_modules/react-native';
const DEFAULT_XCODE_PROJECT_DIRECTORY = '';

var Settings = (function () {
  function Settings(baseDirectory, options) {
    _classCallCheck(this, Settings);

    this.baseDirectory = baseDirectory;
    this.reactNativePath = path.resolve(baseDirectory, options[REACT_NATIVE_PATH_KEY] || DEFAULT_REACT_NATIVE_PATH);
    this.xcodeProjectDirectory = path.resolve(baseDirectory, options[XCODE_PROJECT_DIRECTORY_KEY] || DEFAULT_XCODE_PROJECT_DIRECTORY);
  }

  _createClass(Settings, null, [{
    key: 'loadAsync',

    /**
     * Loads the configuration settings from the package.json file in the current
     * working directory.
     */
    value: _asyncToGenerator(function* () {
      var baseDirectory = process.cwd();
      var packageJSONPath = path.resolve(baseDirectory, 'package.json');
      var packageJSON = yield fs.promise.readFile(packageJSONPath, 'utf8');
      var manifest = JSON.parse(packageJSON);
      var options = manifest[SETTINGS_KEY] || {};
      return new Settings(baseDirectory, options);
    })
  }]);

  return Settings;
})();

exports['default'] = Settings;
module.exports = exports['default'];
//# sourceMappingURL=sourcemaps/Settings.js.map