
const Providentia = artifacts.require('./Providentia.sol');
const StudentToken = artifacts.require("./StudentToken");
const DaiToken = artifacts.require("./DaiToken");
var BigNumber = require('bignumber.js')
const truffleAssert = require('truffle-assertions');

contract('Token', async function(accounts) {
  let token

  before(done => {
    ;
    (async () => {
      try {
        var totalGas = new BigNumber(0)

        // Deploy StudentToken.sol
        tokenERC1155 = await StudentToken.new()
        var tx = await web3.eth.getTransactionReceipt(tokenERC1155.transactionHash)
        totalGas = totalGas.plus(tx.gasUsed)
        tokenERC1155 = await StudentToken.deployed();
        //console.log(_ + tx.gasUsed + ' - Deploy tokenERC20')
        totalGas = totalGas.plus(tx.gasUsed);
        daiToken = await DaiToken.new({from:accounts[3]});

        providentia = await Providentia.new(daiToken.address, tokenERC1155.address);
        var tx = await web3.eth.getTransactionReceipt(providentia.transactionHash);
        totalGas = totalGas.plus(tx.gasUsed);
        providentia = await Providentia.deployed();
        daiToken = await DaiToken.deployed();

        //console.log(_ + tx.gasUsed + ' - Deploy tokenERC20')

        //console.log(msg.sender)
        done()
      } catch (error) {
        console.error(error)
        done(false)
      }
    })()
  })

  describe('addSchool', function() {
    it('should add an University', async function() {
      await providentia.addSchool(accounts[4], "Lambda School");


    })
  })

  describe('addStudent', function() {
    it('should add a Student ', async function() {
      await providentia.addStudent(accounts[8],1010, "Mark", 18, "Canada",
            "https://github.com/Solexplorer", "Lambda School", "",{from:accounts[4]});

      var personalData = await providentia.addressToData(accounts[8]);
      assert( personalData.name == "Mark");
    })
    it("shouldn't create a Student", async function(){

      await truffleAssert.reverts(
        providentia.addStudent(accounts[8], 1020,"Rob", 18, "France",
        "https://github.com/Ugolino", "Lambda School", "", {from:accounts[4]}),
        "An address can only have one Student associated"
      )


    })

    })

    describe('requestLoan', function() {
      it('should request a Loan', async function() {
        await providentia.requestLoan(4, {from:accounts[8]});

        var loan = await providentia.addressToLoan(accounts[8]);
        assert(loan.amountDAI == "10000");

      })

    it('should not create a loan request', async function() {

      //Try to request a loan with an address not registered

      await truffleAssert.reverts(
         providentia.requestLoan(4, { from: accounts[1]}), "Student hasn't been added yet"
      )

      //Try to request a Loan with an address that has already requesteed the loan
      await truffleAssert .reverts(
         providentia.requestLoan(4, {from: accounts[8]}),
         "User has already initiated a Loan process"
      )


    })
    })

    describe('addMoneyPool', function() {
      it('should add Money to the student Pool', async function() {

        var bln = await daiToken.transfer(accounts[2], 70000000000);

        //await daiToken.transfer(accounts[0], 5000, {from:accounts[3]})
        //I will use the owner of the account to make the Approve transaction
        await daiToken.approve(providentia.address, web3.utils.toHex(2000), {from: accounts[2]});


        await providentia.addMoneyPool(accounts[8], {from: accounts[2]});

        var ad = await providentia.addressToBalance(accounts[0]);

        console.log(ad);

        //var arrayInv = await providentia.Investors(0);

        //assert(arrayInv._addressFunder == accounts[2]);
        //Add all the other fields
        //assert(arrayInv.)
      })

     it('should fund the Loan completely', async function() {

       await daiToken.approve(providentia.address, web3.utils.toHex(20000), {from: accounts[2]});

       var tesd = await daiToken.allowance(accounts[2], providentia.address)
       console.log(tesd.toString())
       await providentia.addMoneyPool(accounts[8], {from: accounts[2]});

       var balk = await daiToken.balanceOf(providentia.address);

       console.log(balk.toString());
       var arrayInv = await providentia.Investors(0);

       var studentLoans = await providentia.addressToLoan(arrayInv._addressFunded);

       var ad = await providentia.addressToBalance(accounts[0]);

       console.log(ad.toString());

     })

     it('should throw errors', async function() {
       await daiToken.approve(providentia.address, 10000, {from: accounts[2]});

       await truffleAssert .reverts(
         providentia.addMoneyPool(accounts[8], {from: accounts[2]}),
         "User has already a funded loan"
       )
     })



    })

    describe('acceptLoan', function() {
      it('should accept the loan of the student', async function() {

        await providentia.acceptLoan(accounts[8], {from:accounts[4]});

      })

     it('should not accept the loan as the user is not registered', async function() {


       await truffleAssert .reverts(
          providentia.acceptLoan(accounts[5], {from:accounts[4]}),
          "The sender is not an approved school"
       )
     })
     it('should not accept the loan as the University is not registered', async function() {

       await truffleAssert .reverts(
         providentia.acceptLoan(accounts[0], {from: accounts[6]}),
         "The sender is not an approved school")

     })

     describe('withdrawLoan', function() {
       it('should withdraw the loan', async function() {

         await providentia.addressToBalance(accounts[8]);

         await providentia.withdrawLoan(100, {from:accounts[8]})
       })
     })

     describe('repayLoan', function() {
       it('should repay the loan', async function() {

         await daiToken.approve(providentia.address, 2000 );

         await providentia.repayLoan({from:accounts[8]});

         var check = await providentia.studentToInterest(accounts[8])
       })

     })

    describe('withdrawRepaidLoan', function() {
      it('should let investors withdraw their loan', async function() {


        //await providentia.withdrawRepaidLoan(accounts[8], {from: accounts[2]});


      })
    })
    })

})
