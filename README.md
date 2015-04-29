# rem [early access]

Rem stands for React Extension Manager. With rem, your React Native apps can use modules that have a native implementation, like a video player or a library for push notifications.

Rem works with dependency managers like [npm](https://www.npmjs.com/) and [CocoaPods](https://cocoapods.org/) that may already be familiar to you. When using rem, you install npm packages and rem will add the native code to your app with the help of CocoaPods. Since rem is brand new, there may be some rough edges and we'd appreciate your feedback on it.

## Setting up rem

To use rem, you'll need [io.js](https://iojs.org), CocoaPods, and the rem program itself. We'll help you set these up in the way we're really happy with if you don't have them already.

### Installing io.js

io.js is a JavaScript platform based on Node.js, with a modern JS VM and the newest APIs on which rem is built. We recommend installing io.js with [nvm](https://github.com/creationix/nvm), which is a script that lets you cleanly install several versions of io.js and Node.js.

#### nvm (recommended)

To set up nvm, run:
```
curl https://raw.githubusercontent.com/creationix/nvm/v0.25.0/install.sh | bash
```

Next, install the newest version of io.js:
```
nvm install iojs
```
Until you close your terminal, running `node` will start the io.js program that you just installed.

Last, you can optionally tell nvm to enable io.js when you open a new terminal window so that `node` will always start io.js:
```
nvm alias default iojs
```

#### Other Methods

io.js is available through [Homebrew](http://brew.sh/). Install brew and run:
```
brew install iojs
```

The official io.js site also has a link to a Mac installer package. Visit https://iojs.org.


### Installing CocoaPods

The most common way to install CocoaPods is from a Ruby gem. It works with the default version of Ruby included with OS X, so you can run:
```
sudo gem install cocoapods
```

For other ways to install CocoaPods and to keep it up to date, see [the CocoaPods installation guide](https://guides.cocoapods.org/using/getting-started.html).


### Installing rem

Rem is available as an npm package. Run:
```
npm install -g ReactExtensionManager/rem
```
Once rem is ready, we'll publish it to npm.


## Configuration

rem's configuration lives in your `package.json` file under a key named "reactNativeApp".

```js
{
  "reactNativeApp": {
    // Path to the react-native package that provides the React Native library
    // code for your app. This path is relative to the directory that contains
    // your package.json file.
    "reactNativePath": "node_modules/react-native",
    // Directory that contains your app's Xcode project file. This path is
    // relative to the directory that contains your package.json file.
    "xcodeProjectDirectory": "",
  }
}
```
