#!/usr/bin/env node
'use strict';

if (module === require.main) {
  let yargs = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('init', 'Initializes the current directory as a project that supports native modules')
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
    case 'init':
      console.error('rem init is not yet implemented. stay tuned :)');
      break;
    case 'podfile-fragment':
      let PodfileFragmentGenerator = require('./PodfileFragmentGenerator');
      PodfileFragmentGenerator.podfileFragmentAsync().then((fragment) => {
        console.log(fragment);
      }, (error) => {
        console.error(error.stack);
        process.exit(1);
      });
      break;
    case null:
      console.error(yargs.help());
      process.exit(1);
      break;
    default:
      console.error('Unknown command: %s\n%s', command, yargs.help());
      process.exit(1);
      break;
  }
}
