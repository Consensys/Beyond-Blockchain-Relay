const RegistryQuiz = artifacts.require('./RegistryQuiz.sol');

module.exports = (deployer) => {
    deployer.deploy(RegistryQuiz);
};
