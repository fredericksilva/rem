## How it Works

`rem` uses [CocoaPods]() and [npm]() which are the most popular packaging tools for iOS and JS, respectively.

When you run `rem init`:
* A `Podfile` is created for you, if necessary
* A rem section is added to your Podfile that contains code that will
  * Run a script that traverses all the node_modules used by your package, looking for ones that set `nativePackage` to true
  * Pull the podspecs referenced by those packages into your project workspace

## Contributors

* @ide
* @TomMcHugh
* @ccheever

There are many ways that `rem` can be improved! Open issues with any feedback or questions and feel free to submit pull requests.

Some ideas for enhancements:
* Better resolution and error handling if two modules depend on different incompatible versions of the same CocoaPod
* Something that will automatically run `pod install` when necessary (but not unnecessarily since that's slow...)

## Known Problems
* If two modules depend on two different versions of the same CocoaPod, then there is no way to correctly build the project.
* If Obj-C source code from different modules uses the same symbols (e.g. class names, etc.), then those will conflict.

## Android
When React Native is released for Android, we'll add Android support to this. rem modules should support both iOS and Android (or at least just give an error saying the platform isn't supported...)
