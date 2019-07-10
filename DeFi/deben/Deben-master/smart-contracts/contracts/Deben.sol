pragma solidity ^0.4.23;

import "./ERC20Interface.sol";
import "./KyberNetworkProxyInterface.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract Deben is  Ownable {

    struct Invoice {
        address seller;
        address buyer;
        address liquidityProvider;

        uint localAmount;
        uint stableCoinAmount;
        uint weiAmount;
    }

    KyberNetworkProxy constant internal kyber = KyberNetworkProxy(0x818E6FECD516Ecc3849DAf6845e3EC868087B755);
    ERC20 constant internal ETH = ERC20(0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee);
    ERC20 constant internal STABLE_COIN = ERC20(0xaD6D458402F60fD3Bd25163575031ACDce07538D);

    uint public USD2EGP = 18;
    Invoice[] public invoices;

    //must have default payable since this contract expected to receive change  
    function() public payable {}

    function invoicesLength() public view returns (uint length) { return invoices.length; }

    function updateExchangerate(uint _USD2EGP) public onlyOwner { USD2EGP = _USD2EGP; }

    function getExpectedRateInWei() public view returns (uint expectedRate, uint slippageRate) {
        (expectedRate, slippageRate) = kyber.getExpectedRate(ETH, STABLE_COIN, 1);

        uint rate = getExpectedPriceInStable(1);
        rate *= 10 ** 18;                // to wei
        expectedRate = rate / expectedRate;
        slippageRate = rate / slippageRate;
    }

    function getExpectedPriceInWei(uint localAmount) public view returns (uint expectedPrice, uint slippagePrice) {
        (uint expectedRate, uint slippageRate) = getExpectedRateInWei();
        expectedPrice = localAmount * expectedRate;
        slippagePrice = localAmount * slippageRate;
    }

    function getExpectedPriceInStable(uint localAmount) public view returns (uint price) {
        price = localAmount * 10 ** 18 / USD2EGP;
    }

    event Paid(address indexed seller, address indexed buyer, uint indexed invoiceId, uint change);
    function pay(address seller, uint localAmount) public payable returns (uint invoiceId) {

        require(msg.sender != seller, "you can't make payment to yourself");
        (, uint slippagePrice) = getExpectedPriceInWei(localAmount);
        require(msg.value >= slippagePrice, "insufficient funds");

        Invoice memory myInvoice = Invoice({
            seller: seller,
            buyer: msg.sender,
            liquidityProvider: 0x0,
            localAmount: localAmount,
            stableCoinAmount: getExpectedPriceInStable(localAmount),
            weiAmount: msg.value
        });

        // It is possible to take minRate from kyber contract, but best to get it from user.
        //(, uint minRate) = kyber.getExpectedRate(srcToken, destToken, 1);

        uint startEthBalance = msg.value;
    
        // will send tokens to dest address. change will be sent to this contract.
        kyber.trade.value(msg.value)(
            ETH, myInvoice.weiAmount,
            STABLE_COIN, this, myInvoice.stableCoinAmount,
            0, 0x0000000000000000000000000000000000000000
        );

        uint change = address(this).balance - (startEthBalance - myInvoice.weiAmount);   // get the change
        msg.sender.transfer(change);                                                     // send back the change

        invoiceId = invoices.push(myInvoice) - 1;                                        // add to invoice arr
        emit Paid(myInvoice.seller, myInvoice.buyer, invoiceId, change);                 // emmit invoice
    }

    event Settled(address indexed seller, address indexed liquidityProvider, uint indexed invoiceId);
    function settle(uint[] invoicesIndex, address liquidityProvider) public returns (uint totalDAI) {

        uint arrayLength = invoicesIndex.length;
        for (uint i = 0; i < arrayLength; i++) {

            Invoice memory invo = invoices[invoicesIndex[i]]; // <<<<<<<<<< bug liquidity provider not set but DAI get sent

            require(invo.liquidityProvider == 0x0, "one of the transactions is already settled");
            require(invo.seller == msg.sender, "you can only settle your own invoices");

            invoices[invoicesIndex[i]].liquidityProvider = liquidityProvider; // <<<<<<<<<< 
            emit Settled(invo.seller, liquidityProvider, invoicesIndex[i]);
            totalDAI += invo.stableCoinAmount;
        }

        STABLE_COIN.transfer(liquidityProvider, totalDAI);
    }

}
