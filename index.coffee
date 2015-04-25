co = require 'co'
fs = require 'fs'
instapromise = require 'instapromise'
path = require 'path'

findNativePackagesAsync = co.wrap (dir='.') ->
  """Finds all the React Native modules from a given directory"""

  console.log "dir=", dir
  foundModules = []

  pkg = require path.join dir, 'package.json'
  if pkg.nativePackage?
    foundModules.push {
      path: path.resolve dir
      name: pkg.name
      version: pkg.version
      nativePackage: pkg.nativePackage
      pkg
    }

  node_modules = path.join dir, 'node_modules'

  if fs.existsSync node_modules # N.B. Watch out for `fs.exists` -- it doesn't conform to the (err, result) protocol
    awaitables = []
    for mod in yield fs.promise.readdir node_modules
      unless mod[0] is '.' # Ignore hidden files/dirs like '.bin'
        awaitables.push findNativePackagesAsync path.join node_modules, mod

    foundModules.concat (yield awaitables)...
  else
    foundModules



module.exports = {
  findNativePackagesAsync
}
