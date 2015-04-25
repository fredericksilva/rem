'use strict';

require('instapromise');

const escapeStringRegexp = require('escape-string-regexp');
const path = require('path');
const util = require('util');

const PRELUDE = '# [REM]';
const POSTLUDE = '# [/REM]';

class PodfileEditor {

  constructor(settings: Settings) {
    this.settings = settings;
  }

  addREMSection(contents: string): string {
    return contents + this._createREMSection();
  }

  updateREMSection(contents: string): string {
    return contents.replace(
      this._getSectionRegex(),
      this._createREMSection()
    );
  }

  hasREMSection(contents: string): boolean {
    return this._getSectionRegex().test(contents);
  }

  removeREMSection(contents: string): string {
    return contents.replace(this._getSectionRegex(), '');
  }

  _createREMSection(): string {
    let relativeBasePath = path.relative(
      this.settings.xcodeProjectDirectory,
      this.settings.baseDirectory
    );
    let relativeScriptPath = path.join(
      relativeBasePath,
      'node_modules/.bin/rem'
    );
    let command = util.format(
      'eval(`%s %s`)',
      relativeScriptPath,
      relativeBasePath
    );
    let lines = [PRELUDE, command, POSTLUDE];
    return '\n' + lines.join('\n');
  }

  _getSectionRegex(): RegExp {
    let pattern =
      '\\n?' +
      '^' + escapeStringRegexp(PRELUDE) +
      '[\\s\\S]*?' +
      '^' + escapeStringRegexp(POSTLUDE) + '.*';
    return new RegExp(pattern, 'gm');
  }
}

export default PodfileEditor;
