const path = require("path");

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: [["next/babel"]]
        }
      }
    ]
  });
  config.resolve.alias["~"] = path.resolve(__dirname, "../src");
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
