console.log(' patch install ');
const fs = require('fs');
const f =
  'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

fs.readFile(f, 'utf8', function(err, data) {
  console.log(f, 'file');

  if (err) {
    return console.log(err);
  }
  var result = data.replace(
    /node: false/g,
    "node: {crypto: true, stream: true, fs: 'empty', net: 'empty'}"
  );

  fs.writeFile(f, result, 'utf8', function(err) {
    if (err) return console.log(err);
  });
});
//https://blog.lysender.com/2018/07/angular-6-cannot-resolve-crypto-fs-net-path-stream-when-building-angular/
