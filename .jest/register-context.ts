function context(
  directory,
  useSubdirectories = false,
  regExp = /^\.\//,
  basedir = 'web-ui',
) {
  const path = require('path');
  const fs = require('fs');

  function enumerateFiles(enumBasedir, dir) {
    let result = [];
    fs.readdirSync(path.join(enumBasedir, dir)).forEach(file => {
      const relativePath = dir + '/' + file;
      const stats = fs.lstatSync(path.join(enumBasedir, relativePath));
      if (stats.isDirectory()) {
        if (useSubdirectories) {
          result = result.concat(enumerateFiles(enumBasedir, relativePath));
        }
      } else if (regExp.test(relativePath)) {
        // Meh, this is a config file. I don't care to figure
        // this out
        // @ts-ignore
        result.push(relativePath);
      }
    });
    return result;
  }

  const absoluteDirectory = path.resolve(basedir, directory);
  const keys = enumerateFiles(absoluteDirectory, '.');

  function requireContext(key) {
    // Meh, this is a config file. I don't care to figure
    // this out
    // @ts-ignore
    if (!keys.includes(key)) {
      throw new Error(`Cannot find module '${key}'.`);
    }
    const fullKey = require('path').resolve(absoluteDirectory, key);
    return require(fullKey);
  }

  requireContext.keys = () => keys;

  return requireContext;
}

export default context;
