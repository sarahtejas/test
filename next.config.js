const path = require('path');
const withCSS = require('@zeit/next-css');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
/* temporary workaround to invoke immediately related to this issue:
 * https://github.com/zeit/next-plugins/issues/377
 */
const withSourceMaps = require('@zeit/next-source-maps')();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = withCSS(
  withSourceMaps({
    webpack(config, _options) {
      config.resolve.alias['~'] = path.join(__dirname, 'src');
      // remove existing plugin
      config.plugins = config.plugins.filter(plugin => {
        return plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin';
      });
      // only report errors on a matcher that doesn't match anything
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          reportFiles: ['does-not-exist'],
        }),
      );
      // allow importing yaml files
      config.module.rules.push({
        test: /\.(yml)$/,
        use: 'raw-loader',
      });
      // allow importing graphql files
      config.module.rules.push({
        test: /\.(graphql)$/,
        use: 'raw-loader',
      });
      return config;
      return config;
    },
    env: {
      BUILD_ID: process.env.BUILD_ID,
    },
    generateBuildId: async () => process.env.BUILD_ID || 'build ID not set',
    assetPrefix: process.env.ASSET_PREFIX || '',
    publicRuntimeConfig: {
      hostname: process.env.CIRCLECI_HOSTNAME,
      isEnterprise: process.env.CIRCLECI_IS_ENTERPRISE,
      exceptionLoggerClientToken: process.env.EXCEPTION_LOGGER_CLIENT_TOKEN,
      analyticsKey: process.env.ANALYTICS_WRITE_KEY,
    },
  }),
);
