var CoffeeBatchNFT = artifacts.require("./CoffeeBatchNFT.sol");
var CoffeeTokenHandler = artifacts.require("./CoffeeTokenHandler.sol");
var WrappedCoffeeCoin = artifacts.require("./WrappedCoffeeCoin.sol");

module.exports = async function(deployer) {
  await deployer
    .deploy(CoffeeBatchNFT, "Coffee Batch", "CBA")
    .then(async nftInstance => {
      await deployer
        .deploy(CoffeeTokenHandler, nftInstance.address)
        .then(async tokenHandler => {
          await deployer.deploy(WrappedCoffeeCoin, tokenHandler.address);
        });
    });
};
