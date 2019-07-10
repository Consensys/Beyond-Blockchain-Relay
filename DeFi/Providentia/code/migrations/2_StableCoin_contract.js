var DaiToken = artifacts.require("./DaiToken");

module.exports = (deployer, network, [owner]) => deployer
  .then(() => deployToken(deployer))

function deployToken(deployer){
  return deployer.deploy(
      DaiToken,
      
    );
}
