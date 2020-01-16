const fs = require('fs');

const DIST_LIB_PATH = 'dist/ng-web-audio/';
const README_PATH = 'README.md';
const PACKAGE = 'package.json';
const POLYFILL = 'polyfill.js';
const POLYFILL_PATH = 'projects/ng-web-audio/src/' + POLYFILL;
const PATH_TO_PACKAGE = DIST_LIB_PATH + PACKAGE;
const PATH_TO_README = DIST_LIB_PATH + README_PATH;
const PATH_TO_POLYFILL = DIST_LIB_PATH + POLYFILL;

copyExtraFiles();

function copyExtraFiles() {
    if (!fs.existsSync(README_PATH) || !fs.existsSync(POLYFILL_PATH)) {
        throw new Error('Requested files do not exit');
    } else {
        fs.copyFileSync(README_PATH, PATH_TO_README);
        fs.copyFileSync(POLYFILL_PATH, PATH_TO_POLYFILL);
    }

    if (!fs.existsSync(PATH_TO_PACKAGE)) {
        throw new Error('package.json does not exit in built artifact');
    } else {
        const packageJson = JSON.parse(fs.readFileSync(PATH_TO_PACKAGE));

        fs.writeFileSync(
            PATH_TO_PACKAGE,
            JSON.stringify(
                {
                    ...packageJson,
                    main: 'fesm2015/ng-web-audio.js',
                },
                null,
                2,
            ),
        );
    }
}
