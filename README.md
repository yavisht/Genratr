# Genratr

> **A simple and secure strong password generator.**  
> ![Genratr Screenshot](https://user-images.githubusercontent.com/6112201/108666345-fe45de00-752a-11eb-81de-5fcd697f6c66.png)

## What's New?

- **Monorepo** structure for Web, Android, and iOS platforms.
- **UI Improvements** for a more intuitive experience.
- **Save Passwords** directly in your notebook for future use.
- **Performance Enhancements** for faster, smoother interactions.
- **Upgraded to React Native** for cross-platform compatibility and responsiveness.

## Official Website

Visit the [Genratr website](https://www.genratr.com) to explore the app and its features.

## Mobile App

Under testing - Coming soon!

## Installation

Make sure to install all the dependencies using Yarn:

```bash
yarn
```

## Development

To run the app in development mode with hot-code reloading and error reporting:

```bash
yarn start
```

Or start specifically for each platform:

- **Start for Android:**

  ```bash
  yarn android
  ```

- **Start for iOS:**

  ```bash
  yarn ios
  ```

- **Start for Web:**

  ```bash
  yarn web
  ```

## Building the App

To build the app for different platforms, use the following commands:

- **Local Android APK Build:**

  ```bash
  yarn local-build:apk
  ```

- **Local Android AAB Build:**

  ```bash
  yarn local-build:aab
  ```

- **Local iOS IPA Build:**

  ```bash
  yarn local-build:ipa
  ```

- **Cloud Build for Android:**

  ```bash
  yarn cloud-build:android
  ```

- **Cloud Build for iOS:**

  ```bash
  yarn cloud-build:ios
  ```

- **Build for Web:**

  ```bash
  yarn build:web
  ```

## Prebuild

For cleaning up and preparing a new build:

```bash
yarn prebuild
```

## Browser and Device Testing Sponsor

Testing across browsers and devices is supported by [BrowserStack](http://browserstack.com/).  
![BrowserStack Logo](https://user-images.githubusercontent.com/6112201/55602201-28b01600-57b0-11e9-99c5-33e8e2dab268.png)

## License

Genratr is licenced under the MIT licence.
