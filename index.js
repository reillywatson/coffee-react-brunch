var transform = require('coffee-react-transform');

function CoffeeReactCompiler(config) {
  if (config == null) config = {};
  var plugin = config.plugins && config.plugins.coffeereact;
  var conv = config.conventions && config.conventions.vendor;
}

CoffeeReactCompiler.prototype.brunchPlugin = true;
CoffeeReactCompiler.prototype.type = 'javascript';
CoffeeReactCompiler.prototype.extension = 'coffee';
CoffeeReactCompiler.prototype.pattern = /\.(coffee(\.md)?|litcoffee)$/;

CoffeeReactCompiler.prototype.compile = function(data, path, callback) {
  var compiled;
  try {
    compiled = transform(data);
  } catch (err) {
    var loc = err.location, error;
    if (loc) {
      error = loc.first_line + ":" + loc.first_column + " " + (err.toString());
    } else {
      error = err.toString();
    }
    return callback(error);
  }
  var result = {
    data: compiled
  };
  return callback(null, result);
};

module.exports = CoffeeReactCompiler;
