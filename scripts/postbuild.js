const fs = require('fs');

const DIST_LIB_PATH = 'dist/ng-web-audio/';
const README_PATH = 'README.md';
const POLYFILL = 'polyfill.js';
const POLYFILL_PATH = 'projects/ng-web-audio/src/' + POLYFILL;
const PATH_TO_README = DIST_LIB_PATH + README_PATH;
const PATH_TO_POLYFILL = DIST_LIB_PATH + POLYFILL;

copyExtraFiles();

function copyExtraFiles() {
    if (!fs.existsSync(README_PATH) || !fs.existsSync(POLYFILL_PATH)) {
        throw new Error('Requested files do not exits');
    } else {
        fs.copyFileSync(README_PATH, PATH_TO_README);
        fs.copyFileSync(POLYFILL_PATH, PATH_TO_POLYFILL);
    }
}
