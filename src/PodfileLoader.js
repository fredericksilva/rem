'use strict';

require('instapromise');

const child_process = require('child_process');
const path = require('path');
const fs = require('fs');

class PodfileLoader {

  constructor(settings: Settings) {
    this.settings = settings;
  }

  /**
   * Reads the Podfile in the given directory, creating one if it doesn't exist,
   * and returns its contents
   */
  async readEnsuredAsync(): string {
    let directory = this.settings.xcodeProjectDirectory;
    var contents = await this.readAsync(directory);
    if (contents) {
      return contents;
    }

    await this.createAsync(directory);
    contents = this.readAsync(directory);
    if (!contents) {
      throw new Error('Created a Podfile but was unable to read its contents');
    }
    return contents;
  }

  /**
   * Reads the Podfile in the given directory and returns its contents, or null
   * if it doesn't exist
   */
  async readAsync(): ?string {
    let directory = this.settings.xcodeProjectDirectory;
    let podfilePath = path.join(directory, 'Podfile');
    try {
      return await fs.promise.readFile(podfilePath, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  }

  /**
   * Writes the Podfile in the given directory.
   */
  async writeAsync(contents: string) {
    let directory = this.settings.xcodeProjectDirectory;
    let podfilePath = path.join(directory, 'Podfile');
    await fs.promise.writeFile(podfilePath, contents, 'utf8');
  }

  /**
   * Creates a Podfile in the given directory with the help of `pod`
   */
  createAsync(): ?string {
    return new Promise((resolve, reject) => {
      let directory = this.settings.xcodeProjectDirectory;
      let options = {cwd: directory};
      child_process.exec('pod init', options, (processError, stdout, stderr) => {
        if (processError) {
          let error = new Error('Could not create Podfile:\n' + stdout);
          error.cause = processError;
          error.stdout = stdout;
          error.stderr = stderr;
          reject(error);
        } else {
          resolve({stdout, stderr});
        }
      });
    });
  }
}

export default PodfileLoader;
