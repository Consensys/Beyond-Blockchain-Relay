const Media = artifacts.require("./Media.sol");
contract("Media", accounts => {
  it("add News", async () => {
    const media = await Media.deployed();
    await media.addNews("https://test.com", "test", "test description", { from: accounts[0] });
    const news = await media.getNews(0);
    assert.equal(news[0], 0);
    assert.equal(news[1], 0);
    assert.equal(news[2], 0);
    assert.equal(news[3], "https://test.com");
    assert.equal(news[4], "test");
    assert.equal(news[5], "test description");
  });
});