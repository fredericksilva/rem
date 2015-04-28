#!/usr/bin/env node
'use strict';

require('instapromise');

const fs = require('fs');

const PodfileEditor = require('./PodfileEditor');
const PodfileFragmentGenerator = require('./PodfileFragmentGenerator');
const PodfileLoader = require('./PodfileLoader');
const Settings = require('./Settings');

async function mainAsync() {
  let yargs = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('init', 'Initializes the current directory for a project that supports native modules')
    .command('clean', 'Removes the REM configuration from the project in the current directory')
    .command('podfile-fragment', 'Outputs a code fragment to be evaluated inline within a Podfile')
    .options('d', {
      alias: 'directory',
      describe: 'Root directory of the JS project, relative to the current working directory. Use with podfile-fragment.',
      default: '',
      type: 'string',
    })
    .help('h')
    .alias('h', 'help');

  let argv = yargs.argv;
  let command = argv._[0];

  switch (command) {
    case 'init': {
      await verifyCurrentDirectoryAsync();

      let settings = await Settings.loadAsync();
      let podfileLoader = new PodfileLoader(settings);
      let podfileEditor = new PodfileEditor(settings);
      let podfile = await podfileLoader.readEnsuredAsync();
      if (podfileEditor.hasREMSection(podfile)) {
        console.log("The project's Podfile is already set up with REM.");
      } else {
        podfile = podfileEditor.addREMSection(podfile);
        await podfileLoader.writeAsync(podfile);
        console.log("The project's Podfile is now set up with REM.");
      }
      break;
    }

    case 'clean': {
      await verifyCurrentDirectoryAsync();

      let settings = await Settings.loadAsync();
      let podfileLoader = new PodfileLoader(settings);
      let podfileEditor = new PodfileEditor(settings);
      let podfile = await podfileLoader.readEnsuredAsync();
      if (podfileEditor.hasREMSection(podfile)) {
        podfile = podfileEditor.removeREMSection(podfile);
        await podfileLoader.writeAsync(podfile);
        console.log("The project's Podfile no longer includes REM.");
      } else {
        console.log("The project's Podfile already does not include REM.");
      }
      break;
    }

    case 'podfile-fragment': {
      let fragment = await PodfileFragmentGenerator.podfileFragmentAsync();
      console.log(fragment);
      break;
    }

    case null: {
      console.error(yargs.help());
      process.exit(1);
      break;
    }

    default: {
      console.error('Unknown command: %s\n%s', command, yargs.help());
      process.exit(1);
      break;
    }
  }
}

async function verifyCurrentDirectoryAsync() {
  try {
    await fs.promise.access('package.json');
  } catch (error) {
    console.error('package.json not found; run "rem init" in the root directory of your JS project');
    process.exit(1);
  }
}

if (module === require.main) {
  mainAsync().catch((error) => {
    console.error(error.stack);
    process.exit(1);
  });
}
