const fs = require("fs");
const src = fs.readFileSync("D:/mysite/toolsboot/static/js/vendor/qrcode.min.js", "utf8");
eval(src);
const qr = qrcode(0, "M");
qr.addData("https://example.com");
qr.make();
console.log("modules:", qr.getModuleCount());
console.log("svg head:", qr.createSvgTag(4, 2).slice(0, 50));
console.log("dataURL ok:", qr.createDataURL(4, 2).slice(0, 30));
