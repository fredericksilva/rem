'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
'use strict';

require('instapromise');

const escapeStringRegexp = require('escape-string-regexp');
const path = require('path');
const util = require('util');

const PRELUDE = '# [REM]';
const POSTLUDE = '# [/REM]';

var PodfileEditor = (function () {
  function PodfileEditor(settings) {
    _classCallCheck(this, PodfileEditor);

    this.settings = settings;
  }

  _createClass(PodfileEditor, [{
    key: 'addREMSection',
    value: function addREMSection(contents) {
      return contents + this._createREMSection();
    }
  }, {
    key: 'updateREMSection',
    value: function updateREMSection(contents) {
      return contents.replace(this._getSectionRegex(), this._createREMSection());
    }
  }, {
    key: 'hasREMSection',
    value: function hasREMSection(contents) {
      return this._getSectionRegex().test(contents);
    }
  }, {
    key: 'removeREMSection',
    value: function removeREMSection(contents) {
      return contents.replace(this._getSectionRegex(), '');
    }
  }, {
    key: '_createREMSection',
    value: function _createREMSection() {
      var relativeBasePath = path.relative(this.settings.xcodeProjectDirectory, this.settings.baseDirectory);
      var relativeScriptPath = path.join(relativeBasePath, 'node_modules/.bin/rem');
      var command = util.format('eval(`%s %s`)', relativeScriptPath, relativeBasePath);
      var lines = [PRELUDE, command, POSTLUDE];
      return '\n' + lines.join('\n');
    }
  }, {
    key: '_getSectionRegex',
    value: function _getSectionRegex() {
      var pattern = '\\n?' + '^' + escapeStringRegexp(PRELUDE) + '[\\s\\S]*?' + '^' + escapeStringRegexp(POSTLUDE) + '.*';
      return new RegExp(pattern, 'gm');
    }
  }]);

  return PodfileEditor;
})();

exports['default'] = PodfileEditor;
module.exports = exports['default'];
//# sourceMappingURL=sourcemaps/PodfileEditor.js.map