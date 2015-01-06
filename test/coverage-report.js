if (process.env.APP_DIR_FOR_CODE_COVERAGE) {

  var path = require('path');
  var fs = require('fs');

  var _rjs = require.extensions['.js'];
  require.extensions['.js'] = function (module, filename) {

    var baseDir = basePath(path.dirname(filename));
    var coverageDir = baseDir + path.sep + process.env.APP_DIR_FOR_CODE_COVERAGE;

    if (filename.indexOf(baseDir + path.sep + 'test') === -1) {
      filename = filename.replace(baseDir, coverageDir);
    }

    if (module.parent) {
      var commonPath = '';
    }
    return _rjs(module, filename);
  };
}

function popDir(dir) {
  var newDir = dir.split(path.sep);
  newDir.pop();
  return newDir.join(path.sep);
}

function basePath(dir) {
  if (fs.existsSync(dir + path.sep + 'package.json')) {
    if (dir.indexOf('node_modules') === -1) {
      return dir;
    } else {
      return null;
    }
  } else if (dir !== '') {
    return basePath(popDir(dir));
  } else {
    return null;
  }
}