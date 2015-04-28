#!/usr/bin/env node

"use strict";

var _asyncToGenerator = require("babel-runtime/helpers/async-to-generator")["default"];

var mainAsync = _asyncToGenerator(function* () {
  var yargs = require("yargs").usage("Usage: $0 <command> [options]").command("init", "Initializes the current directory for a project that supports native modules").command("podfile-fragment", "Outputs a code fragment to be evaluated inline within a Podfile").options("d", {
    alias: "directory",
    describe: "Root directory of the JS project, relative to the current working directory. Use with podfile-fragment.",
    "default": "",
    type: "string" }).help("h").alias("h", "help");

  var argv = yargs.argv;
  var command = argv._[0];

  switch (command) {
    case "init":
      {
        const PodfileEditor = require("./PodfileEditor");
        const PodfileLoader = require("./PodfileLoader");
        const Settings = require("./Settings");

        try {
          yield fs.promise.access("package.json");
        } catch (error) {
          console.error("package.json not found; run \"rem init\" in the root directory of your JS project");
          process.exit(1);
        }

        var settings = yield Settings.loadAsync();
        var podfileLoader = new PodfileLoader(settings);
        var podfileEditor = new PodfileEditor(settings);
        var podfile = yield podfileLoader.readEnsuredAsync();
        if (podfileEditor.hasREMSection(podfile)) {
          console.log("The project's Podfile is already set up with REM.");
        } else {
          podfile = podfileEditor.addREMSection(podfile);
          yield podfileLoader.writeAsync(podfile);
        }
        break;
      }
    case "podfile-fragment":
      {
        const PodfileFragmentGenerator = require("./PodfileFragmentGenerator");

        var fragment = yield PodfileFragmentGenerator.podfileFragmentAsync();
        console.log(fragment);
        break;
      }
    case null:
      {
        console.error(yargs.help());
        process.exit(1);
        break;
      }
    default:
      {
        console.error("Unknown command: %s\n%s", command, yargs.help());
        process.exit(1);
        break;
      }
  }
});

require("instapromise");

const path = require("path");
const fs = require("fs");

if (module === require.main) {
  mainAsync()["catch"](function (error) {
    console.error(error.stack);
    process.exit(1);
  });
}
//# sourceMappingURL=sourcemaps/index.js.map