const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const schemePath = path.resolve(__dirname, "contracts", "Scheme.sol");
const source = fs.readFileSync(schemePath, "utf8");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for(contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
