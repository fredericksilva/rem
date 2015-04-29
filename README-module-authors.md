## Writing Modules for rem (for module authors)

### 1. Add the key `nativePackage` to your module's `package.json` file

_If your module doesn't rely on any native code that you or anyone else has written, i.e. no Obj-C or Swift or CocoaPods, then you can skip this; just make a regular npm module; it can include rem native modules as dependencies without you doing anything special._

Ex: (in `package.json`)
```json
  ...
  },
  "nativePackage": true,
  ...
```

### 2. Create a `.podspec` file for your module

This is where you will describe what native code -- the Obj-C you've written and any Swift or CocoaPods depdendencies -- your module needs.

Make a file called `<your-package-name>.podspec` in the same directory as your `.xcodeproj` and `package.json`.

Start with this basic template and then modify it so it matches your own project.
```podspec
#
# Be sure to run `pod lib lint react-native-vibration.podspec' to ensure this is a
# valid spec and remove all comments before submitting the spec.
#
# Any lines starting with a # are optional, but encouraged
#
# To learn more about a Podspec see http://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = "react-native-url-handler"
  s.version          = "0.0.2"
  s.summary          = "React Native URL Handler"
  s.license          = 'MIT'
  s.platform     = :ios, '7.0'
  s.requires_arc = true
  s.authors      = "James Ide <ide@sixfivezero.net>"
  s.homepage     = "https://github.com/650Industries/react-native-url-handler"
  s.source_files = 'ios/**/*.{h,m}'
end

````

In general, you can just copy/paste the above and update the fields. Make sure you update the name, version, summary, license, authors, and homepage fields.

* The line specifying `s.source_files` describes where your Objective-C code goes.

You can make it whatever you want, but setting it to `'ios/**/*.{h,m}'` is a good default. This will mean that you'll put your Obj-C code (`.h` and `.m` files) in a directory called `ios` anywhere underneath the root directory of your module, which is a pretty reasonable way to organize everything.

* If you use any Swift files, change the `s.platform` line to specify that it requires iOS 8

* In general, `s.name` should match the name of your module as specified in your `package.json`.

* For more infomration, look at [the podspec documentation](https://guides.cocoapods.org/syntax/podspec.html).


### 3. Test your module

You can test your module by installing it in a project you're using.

* Create or open an Xcode project that uses react-native
* Make sure that you have run `rem init` on the project. If you've done this correctly, then
  * There should be an `.xcworkspace` and a `Podfile` that have been setup
  * The `package.json` configuration should know where the Podfile is relative to the package.json
* Once you've done this, you can run `npm install <path-to-your-module's-directory>` from the directory containing your package.json. This will install the module using npm.
* After you've installed your module with npm, run `pod install` from the directory containing your Podfile. This will pull in any CocoaPods dependencies and make sure your Xcode project pulls in your Obj-C files properly.
* Once you've pod installed, rebuild and run your app. **Just reloading with `⌘-R` is not sufficient since you've included new functionality in the binary!**
* To test your module, you'll need to change your app's React Native JS code to use the module. Try adding a line that `require`s it and uses the component.
* If you don't make any changes to the binary, you can just `⌘-R` to reload and you can still use your native module.
* If you change your native module's source code (any of it), you'll need to run `npm install` again (since that will copy it over from the directory where you've been developing it). If you changed Obj-C code, you'll need to run `pod install` again.

### 4. Publish your module to npm
You publish rem modules the same you way you would publish any other npm package.

Some guidelines:
* Start your package names with the prefix `react-native-` so that these can be diden
