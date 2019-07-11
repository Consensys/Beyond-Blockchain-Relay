pragma solidity ^0.5.0;

import './CoffeeBatchNFT.sol';
import './WrappedCoffeeCoin.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Holder.sol';

contract CoffeeTokenHandler is Ownable, ERC721Holder{

    address public ERC20TokenContract;
    address public NFTTokenContractAddress;
    mapping (uint256 => uint256) public coffeeBatches;

    mapping(address => bool) public isCooperative;
    modifier onlyCooperative(){
        require(isCooperative[msg.sender], "user must be a cooperative");
        _;
    }

    constructor(address _NFTTokenContractAddress) Ownable() public{
        NFTTokenContractAddress = _NFTTokenContractAddress;
    }

    function setNFTTokenContractAddress(address _NFTTokenContractAddress) public onlyOwner {
        NFTTokenContractAddress = _NFTTokenContractAddress;
    }
    //First action, set address of contract
    function setERC20TokenContract(address _ERC20TokenContract) public onlyOwner {
        ERC20TokenContract = _ERC20TokenContract;
    }

    function addCooperative(address cooperative) public onlyOwner{
        isCooperative[cooperative] = true;
    }

    function removeCooperative(address cooperative) public onlyOwner {
        isCooperative[cooperative] = false;
    }

    function wrapCoffee(address _from, uint256 _tokenId) public onlyCooperative(){
       CoffeeBatchNFT(NFTTokenContractAddress).transferFrom(_from, address(this), _tokenId);
       uint256 size = CoffeeBatchNFT(NFTTokenContractAddress).coffeeBatchSize(_tokenId);
       WrappedCoffeeCoin(ERC20TokenContract).wrapCoffee(_from, size);
    }

    function unwrapCoffee(address _from, uint256 _tokenId, uint256 _amount) public onlyCooperative(){
       uint256 size = CoffeeBatchNFT(NFTTokenContractAddress).coffeeBatchSize(_tokenId);
       require(size == _amount, "burned tokens must equal to the coffee wanted");
       WrappedCoffeeCoin(ERC20TokenContract).transferFrom(_from, address(this), _amount);
       CoffeeBatchNFT(NFTTokenContractAddress).transferFrom(address(this),_from, _tokenId);
       WrappedCoffeeCoin(ERC20TokenContract).unwrapCoffee(_from, _amount);
    }
}
