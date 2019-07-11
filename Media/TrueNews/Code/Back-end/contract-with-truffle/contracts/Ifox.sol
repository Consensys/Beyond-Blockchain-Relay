pragma solidity 0.5.0;
// pragma experimental ABIEncoderV2;


contract Ifox {
    function mint(address account, uint256 value) public;
    function totalSupply() public view returns (uint256);
	function transferFrom(address sender, address recipient, uint256 amount) public returns (bool);
}