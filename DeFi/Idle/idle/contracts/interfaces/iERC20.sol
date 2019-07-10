pragma solidity ^0.5.2;

interface iERC20 {
  function mint(
    address receiver,
    uint256 depositAmount)
    external
    returns (uint256 mintAmount);

  function burn(
    address receiver,
    uint256 burnAmount)
    external
    returns (uint256 loanAmountPaid);

  function tokenPrice()
    external
    view
    returns (uint256 price);

  function supplyInterestRate()
    external
    view
    returns (uint256);

  function claimLoanToken()
    external
    returns (uint256 claimedAmount);

  /* function burnToEther(
    address receiver,
    uint256 burnAmount)
    external
    returns (uint256 loanAmountPaid);


  function supplyInterestRate()
    external
    view
    returns (uint256);

  function assetBalanceOf(
    address _owner)
    external
    view
    returns (uint256);

  function claimLoanToken()
    external
    returns (uint256 claimedAmount); */
}
