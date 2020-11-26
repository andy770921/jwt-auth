const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const dotenv = require('dotenv');
const NodemonPlugin = require('nodemon-webpack-plugin');
const commonConfig = require('./webpack.config.common.js');

const getEnv = () => {
  // call dotenv and it will return an Object with a parsed key
  const env = dotenv.config().parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((keyList, next) => {
    const nextKeyList = { ...keyList, [`process.env.${next}`]: JSON.stringify(env[next]) };
    return nextKeyList;
  }, {});
  return new webpack.DefinePlugin(envKeys);
};

module.exports = merge(commonConfig, {
  mode: 'development',
  plugins: [
    new NodemonPlugin({
      watch: path.resolve('./dist'),
    }), getEnv(),
  ],
});
