(function () {
  "use strict";
  const fs = require("fs");

  /**
   * Additional actions to run on a build before packaging. 
   */
  class PreActions {
    /**
     * Creates a Linux .desktop file.
     * @param {NwPackager} nwp An NwPackager instance.
     * @param {String} buildDir The build directory to output the file.
     * @return {Promise}
     */
    static makeDesktopFile(nwp, buildDir) {
      console.log(`Making .desktop file in ${buildDir}`);
      return new Promise((resolve, reject) => {
        const filePath = path.join(buildDir, `${nwp.packageOptions.package_name}.desktop`);
        const fileContents = `
          [Desktop Entry]
          Name=${nwp.packageOptions.appName}
          Version=${nwp.packageOptions.appVersion}
          Exec=bash -c "cd $(dirname %k) && ./${nwp.packageOptions.appName}"
          Type=Application
          Terminal=false
        `;

        fs.writeFile(filePath, fileContents, function (error) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    }
  }
  module.exports = PreActions;
})();
