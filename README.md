# Genratr

**A simple and secure strong password generator.**

<img width="496" alt="genratr-v4" src="https://github.com/user-attachments/assets/34944461-14d6-4cee-8174-b12cd3de63db">

## What's New?

- **Universal App** structure for Web, Android, and iOS platforms using Expo Router.
- **Tamagui UI Improvements** for a completely responsive, modern, and intuitive experience with native Dark/Light Mode switching.
- **Save Passwords** directly in your secure Notebook for future use.
- **Hardware-Backed Encryption** via `expo-secure-store` to keep saved passwords military-grade on-device.
- **Biometric Security** locks the Notebook behind Face ID / Touch ID using `expo-local-authentication`.
- **Performance Enhancements** for faster, smoother interactions and Single Page App (SPA) static web routing setups.

## Official Website

Visit the [Genratr website](https://genratr.com) to explore the app and its features.

## Mobile App

Under testing - Coming soon!

## Installation

Make sure to install all the dependencies using pnpm (which is currently orchestrating the workspace):

```bash
pnpm install
```

## Development

To run the app in development mode with hot-code reloading and error reporting:

```bash
pnpm start
```

Or start specifically for each platform:

- **Start for Android:**

  ```bash
  pnpm android
  ```

- **Start for iOS:**

  ```bash
  pnpm ios
  ```

- **Start for Web:**

  ```bash
  pnpm web
  ```

## Building the App

To natively compile or export the app for different platforms, use the following commands (`eas-cli` handles cloud or local builds):

- **Local Android / iOS Build:**

  ```bash
  npx eas-cli build -p android --local
  npx eas-cli build -p ios --local
  ```

- **Cloud Build for Android / iOS:**

  ```bash
  npx eas-cli build -p android
  npx eas-cli build -p ios
  ```

- **Build for Web:**
  *(Exports an optimized SPA into the `dist/` directory, along with a `200.html` fallback for hosts like Surge)*

  ```bash
  pnpm build:web
  ```

## Browser and Device Testing Sponsor

Testing across browsers and devices is supported by [BrowserStack](http://browserstack.com/).  
![BrowserStack Logo](https://user-images.githubusercontent.com/6112201/55602201-28b01600-57b0-11e9-99c5-33e8e2dab268.png)

## License

Genratr is licenced under the MIT licence.