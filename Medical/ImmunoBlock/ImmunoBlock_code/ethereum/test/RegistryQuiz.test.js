const chai = require('chai');
const girino = require('girino');

const RegistryQuiz = artifacts.require('./RegistryQuiz.sol');
const { expect } = chai;
chai.should();
chai.use(girino);


contract('SimpleStorage', (accounts) => {
    let registryQuiz;

    beforeEach(async () => {
        registryQuiz = await RegistryQuiz.new();
    });

    it('should have a quiz after add one', async () => {
        const fakeUserDid = 'did:ethr:0x31486054a6ad2c0b685cd89ce0ba018e210d504e';
        const fakeFilePath = 'QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy';
        // eslint-disable-next-line no-unused-expressions
        (await registryQuiz.hasQuiz(fakeUserDid)).should.be.false;
        await registryQuiz.signupUser(fakeUserDid, { from: accounts[1] });
        await registryQuiz.uploadQuiz(fakeUserDid, fakeFilePath, { from: accounts[1] });
        // eslint-disable-next-line no-unused-expressions
        (await registryQuiz.hasQuiz(fakeUserDid)).should.be.true;
    });

    it('should get the quiz', async () => {
        const fakeUserDid = 'did:ethr:0x31486054a6ad2c0b685cd89ce0ba018e210d504e';
        const fakeFilePath = 'QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy';
        // eslint-disable-next-line no-unused-expressions
        await registryQuiz.signupUser(fakeUserDid, { from: accounts[1] });
        await registryQuiz.uploadQuiz(fakeUserDid, fakeFilePath, { from: accounts[1] });
        // eslint-disable-next-line no-unused-expressions
        (await registryQuiz.getQuiz(fakeUserDid, { from: accounts[1] })).should.be.equal(fakeFilePath);
    });

    it('should have access to the quiz', async () => {
        const fakeUserDid = 'did:ethr:0x31486054a6ad2c0b685cd89ce0ba018e210d504e';
        const fakeCompanyDid = 'did:ethr:0x93750204a6ad2c0b685cd89ce0ba018e210d202f';
        const fakeFilePath = 'QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy';
        // eslint-disable-next-line no-unused-expressions
        await registryQuiz.signupUser(fakeUserDid, { from: accounts[1] });
        await registryQuiz.uploadQuiz(fakeUserDid, fakeFilePath, { from: accounts[1] });
        // eslint-disable-next-line no-unused-expressions
        await expect(registryQuiz.accessPatientQuiz(fakeCompanyDid, fakeUserDid)).to.revertWith('Access denied!');
        await registryQuiz.grantAccess(fakeUserDid, fakeCompanyDid, { from: accounts[1] });
        // eslint-disable-next-line no-unused-expressions
        (await registryQuiz.accessPatientQuiz(fakeCompanyDid, fakeUserDid)).should.be.equal(fakeFilePath);
    });
});
