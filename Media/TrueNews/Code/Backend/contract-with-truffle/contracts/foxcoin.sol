pragma solidity 0.5.0;
// pragma experimental ABIEncoderV2;

import { ERC20 } from "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

//todo:import ownable.sol and add onlyowner modifier to function init.
/**
 * @title foxcoin
 * @dev ERC20 token rewarded to journalists
 */
contract Foxcoin is ERC20 {

    string public constant name = "NewsDAO";
    string public constant symbol = "FOX";
    uint8 public constant decimals = 18;
    string public version = "1.0.0";

    uint public constant INITIAL_SUPPLY = 28000000e18;
    uint public constant FINAL_SUPPLY = 100000000e18; 

    address public registry;
	
	constructor() public {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
    
    function init(address _registry) public {
        registry = _registry;
    }

    function mint(address account, uint256 value) public {
        require(msg.sender == registry, "foxcoin::mint: Only the NewsLimited can mint new tokens");
        require(totalSupply().add(value) <= FINAL_SUPPLY, "foxcoin::mint: Exceeds final supply");

        _mint(account, value);
    }

}
