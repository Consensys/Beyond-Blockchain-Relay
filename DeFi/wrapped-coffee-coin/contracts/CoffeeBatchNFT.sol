pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol';
import 'openzeppelin-solidity/contracts/drafts/Counters.sol';

contract CoffeeBatchNFT is ERC721Full, ERC721Mintable{

    using Counters for Counters.Counter;
    Counters.Counter private coffeeId;
    mapping(uint => uint) public coffeeBatchSize;

    constructor(
        string memory _name,
        string memory _symbol
    )
        ERC721Full(_name, _symbol)
        public{
    }

     function createCoffeeBatch(
        string memory _tokenURI,
        uint _size
    )
        public
        returns (bool)
    {
        coffeeId.increment();
        coffeeBatchSize[coffeeId.current()] = _size;
        _mint(msg.sender, coffeeId.current());
        _setTokenURI(coffeeId.current(), _tokenURI);
        return true;
    }

     function tokensOfOwner(address _owner) external view returns(uint256[] memory ownerTokens) {
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
            // Return an empty array
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 totalCoffee = totalSupply();
            uint256 resultIndex = 0;

            // We count on the fact that all Coffees have IDs starting at 1 and increasing
            uint256 coffeeIterator;

            for (coffeeIterator = 1; coffeeIterator <= totalCoffee; coffeeIterator++) {
                if (ownerOf(coffeeIterator) == _owner) {
                    result[resultIndex] = coffeeIterator;
                    resultIndex++;
                }
            }
            return result;
        }
    }
}