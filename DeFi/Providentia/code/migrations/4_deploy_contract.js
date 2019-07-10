var Providentia = artifacts.require("./Providentia");
var StudentToken = artifacts.require("./StudentToken.sol");
var DaiToken = artifacts.require("./DaiToken");

/*module.exports = (deployer, network, [owner]) => deployer
  .then(() => deployStudentToken(deployer))

function deployStudentToken(deployer){
  return deployer.deploy(
      Providentia,
      DaiToken.address,
      StudentToken.address,
    );

}*/

module.exports = async(deployer) => {
    let deployProvidentia = await deployer.deploy(Providentia,DaiToken.address,StudentToken.address );
    contractProvidentia = await Providentia.deployed()
  
  };
