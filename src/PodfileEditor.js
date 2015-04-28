'use strict';

require('instapromise');

const escapeStringRegexp = require('escape-string-regexp');
const path = require('path');
const util = require('util');

const PRELUDE = '# [rem]';
const POSTLUDE = '# [/rem]';

class PodfileEditor {

  constructor(settings: Settings) {
    this.settings = settings;
  }

  addRemSection(contents: string): string {
    return contents + this._createRemSection();
  }

  updateRemSection(contents: string): string {
    return contents.replace(
      this._getSectionRegex(),
      this._createRemSection()
    );
  }

  hasRemSection(contents: string): boolean {
    return this._getSectionRegex().test(contents);
  }

  removeRemSection(contents: string): string {
    return contents.replace(this._getSectionRegex(), '');
  }

  _createRemSection(): string {
    let relativeBasePath = path.relative(
      this.settings.xcodeProjectDirectory,
      this.settings.baseDirectory
    );
    let relativeScriptPath = path.join(
      relativeBasePath,
      'node_modules/.bin/rem'
    );
    let command = util.format(
      'eval(`%s podfile-fragment -d %s`)',
      relativeScriptPath,
      relativeBasePath
    );
    let lines = [PRELUDE + ' ' + relativeBasePath, command, POSTLUDE];
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
