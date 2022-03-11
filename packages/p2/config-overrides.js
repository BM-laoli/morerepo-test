const { name } = require('./package');
const { override, } = require('customize-cra');
const paths = require('react-scripts/config/paths');

module.exports = {
  webpack: override(
    (config, env) => {
      config.output.library = `${name}-[name]`;
      config.output.libraryTarget = 'umd';
      // config.output.jsonpFunction = `webpackJsonp_${name}`; // 这是一个open的Bug 还没有得到解决，但是目前使用起来是没有问题
      config.output.globalObject = 'window';
      return config;
    },
  ),
};