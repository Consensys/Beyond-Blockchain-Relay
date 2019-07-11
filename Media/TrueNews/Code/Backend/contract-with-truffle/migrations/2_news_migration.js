const Foxcoin = artifacts.require('Foxcoin');
const HumanityRegistry = artifacts.require('HumanityRegistry');
const NewsLimited = artifacts.require('NewsLimited');

module.exports = async function(deployer) {
  const registery = await deployer.deploy(HumanityRegistry);
  const news = await deployer.deploy(Foxcoin);
  console.log(news.address, 'news');

  const x = await deployer.deploy(NewsLimited);
};
