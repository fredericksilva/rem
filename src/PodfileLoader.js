'use strict';

require('instapromise');

const child_process = require('child_process');
const path = require('path');
const fs = require('fs');

class PodfileLoader {

  /**
   * Reads the Podfile in the given directory, creating one if it doesn't exist,
   * and returns its contents
   */
  static async readEnsuredAsync(directory: string): string {
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
  static async readAsync(directory: string): ?string {
    var podfilePath = path.join(directory, 'Podfile');
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
   * Creates a Podfile in the given directory with the help of `pod`
   */
  static createAsync(directory: string): ?string {
    return new Promise((resolve, reject) => {
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
