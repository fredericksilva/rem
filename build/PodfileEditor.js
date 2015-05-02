'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

'use strict';

require('instapromise');

const escapeStringRegexp = require('escape-string-regexp');
const path = require('path');
const util = require('util');

const PRELUDE = '# [rem]';
const POSTLUDE = '# [/rem]';

var PodfileEditor = (function () {
  function PodfileEditor(settings) {
    _classCallCheck(this, PodfileEditor);

    this.settings = settings;
  }

  _createClass(PodfileEditor, [{
    key: 'addRemSection',
    value: function addRemSection(contents) {
      return contents + this._createRemSection();
    }
  }, {
    key: 'updateRemSection',
    value: function updateRemSection(contents) {
      return contents.replace(this._getSectionRegex(), this._createRemSection());
    }
  }, {
    key: 'hasRemSection',
    value: function hasRemSection(contents) {
      return this._getSectionRegex().test(contents);
    }
  }, {
    key: 'removeRemSection',
    value: function removeRemSection(contents) {
      return contents.replace(this._getSectionRegex(), '');
    }
  }, {
    key: '_createRemSection',
    value: function _createRemSection() {
      var relativeBasePath = path.relative(this.settings.xcodeProjectDirectory, this.settings.baseDirectory);
      var relativeScriptPath = path.join(relativeBasePath, 'node_modules/.bin/rem');
      var command = util.format('eval(`%s podfile-fragment -d %s`)', relativeScriptPath, relativeBasePath);
      var lines = [PRELUDE + ' ' + relativeBasePath, command, POSTLUDE];
      return '\n' + lines.join('\n') + '\n';
    }
  }, {
    key: '_getSectionRegex',
    value: function _getSectionRegex() {
      var pattern = '(?:^\\n)?' + '^' + escapeStringRegexp(PRELUDE) + '[\\s\\S]*?' + '^' + escapeStringRegexp(POSTLUDE) + '.*' + '\\n?';
      return new RegExp(pattern, 'gm');
    }
  }]);

  return PodfileEditor;
})();

exports['default'] = PodfileEditor;
module.exports = exports['default'];
//# sourceMappingURL=sourcemaps/PodfileEditor.js.map