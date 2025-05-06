import 'dotenv/config'

export default {
  expo: {
    name: 'LibMax',
    slug: 'libmax',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      // Optional: forward env vars here if needed in JS code via Constants.manifest.extra
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
    },
  },
}
