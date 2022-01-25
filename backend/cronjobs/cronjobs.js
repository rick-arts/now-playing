/**
 *
 * cronjobs.js
 *
 * Main cronjobs file
 *
 * @author Rick Arts
 * @since v0.0.1
 *
 */

 const fs = require("fs");
 const dir = fs.opendirSync("./backend/cronjobs");
 let dirent;
 while ((dirent = dir.readSync()) !== null) if (dirent.name != "cronjobs.js") require("./" + dirent.name);
 dir.closeSync();
 