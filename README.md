# rem2
React Extension Manager alternate version


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
