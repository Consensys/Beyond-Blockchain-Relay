pragma solidity ^0.5.2;

// interfaces
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "../interfaces/iERC20.sol";

contract iDAIMock is ERC20Detailed, ERC20, iERC20 {
  address public dai;
  uint256 public exchangeRate;
  uint256 public toTransfer;
  uint256 public supplyRate;
  uint256 public price;

  constructor(address _dai, address someone)
    ERC20()
    ERC20Detailed('iDAI', 'iDAI', 8) public {
    dai = _dai;
    toTransfer = 10**18;
    supplyRate = 2927621524103328230;
    price = 1001771560608330320;
    _mint(address(this), 10000 * 10**18); // 10.000 iDAI
    _mint(someone, 10000 * 10**18); // 10.000 iDAI
  }
  function() payable external {}

  function mint(address receiver, uint256 amount) external returns (uint256) {
    require(IERC20(dai).transferFrom(msg.sender, address(this), amount), "Error during transferFrom"); // 1 DAI
    require(this.transfer(receiver, amount), "Error during transfer"); // 1 iDAI
    return amount;
  }
  function burn(address receiver, uint256 amount) external returns (uint256) {
    // here I should transfer 1 DAI back
    /* _burn(msg.sender, amount); */

    require(IERC20(dai).transfer(receiver, amount), "Error during transfer"); // 1 DAI
    return amount;
  }

  function claimLoanToken() external returns (uint256)  {
    require(this.transfer(msg.sender, toTransfer), "Error during transfer"); // 1 DAI
    return toTransfer;
  }
  function tokenPrice() external view returns (uint256)  {
    return price;
  }
  function supplyInterestRate() external view returns (uint256)  {
    return supplyRate;
  }
  function setSupplyInterestRateForTest() external {
    supplyRate = supplyRate * 4;
  }
  function setExchangeRateStoredForTest() external {
    toTransfer = 1.1 * 10**18;
  }
  function setExchangeRateStoredForTestNoFee() external {
    toTransfer = 1.078 * 10**18;
  }
}
