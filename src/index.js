/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const extendConf = function(conf) {
  // make sure qjumbotron boot file is registered
  conf.boot.push("~quasar-app-extension-qdatetable/src/boot/qdatetable.js");
  console.log(
    ` App Extension (qdatetable) Info: 'Adding qdatetable boot reference to your quasar.conf.js'`
  );

  // make sure boot & component files transpile for SSR
  conf.build.transpileDependencies.push(
    /quasar-app-extension-qdatetable[\\/]src/
  );

  console.log(
    `App Extension (qdatetable) Info: 'Adding qdatetable-*.styl css reference to your quasar.conf.js'`
  );
};

module.exports = function(api) {
  // quasar compatibility check
  api.compatibleWith("@quasar/app", "^1.0.0");

  // register JSON api
  api.registerDescribeApi("QDateTable", "./component/QDateTable.json");

  // extend quasar.conf
  api.extendQuasarConf(extendConf);
};
