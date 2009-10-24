exports.testSAX = require('./sax/all-tests');

if (require.main === module.id) {
    require("os").exit(require("test/runner").run(exports));
}

