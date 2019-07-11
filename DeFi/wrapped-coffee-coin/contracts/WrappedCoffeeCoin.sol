pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract WrappedCoffeeCoin is ERC20Mintable, ERC20Detailed, Ownable {

    address public CoffeeTokenHolderAddress;

    modifier onlyCoffeeHolder(){
        require(msg.sender == CoffeeTokenHolderAddress, "caller must be holder contract");
        _;
    }

    constructor(address _CoffeeTokenHolderAddress) Ownable() ERC20Detailed("Wrapped Coffee", "WCC", 0) public {
        CoffeeTokenHolderAddress = _CoffeeTokenHolderAddress;
    }

    function wrapCoffee(address _owner, uint _amount) public onlyCoffeeHolder {
        _mint(_owner, _amount);
    }

    function unwrapCoffee(address _owner, uint _amount) public onlyCoffeeHolder {
         _burn(_owner, _amount);
    }
}