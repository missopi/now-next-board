module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Keep Reanimated plugin last so navigation animations run on the UI thread
    plugins: ['@babel/plugin-syntax-flow', 'react-native-reanimated/plugin'],
  };
};
