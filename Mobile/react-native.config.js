module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ["./src/res/fonts"], // stays the same
  'react-native-google-signin': {
    platforms: {
      android: null, // disable Android platform, other platforms will still autolink if provided
    },
  },
};