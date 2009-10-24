exports.testNamespaces = require('./namespaces');

if (require.main === module.id) {
    require("os").exit(require("test/runner").run(exports));
}