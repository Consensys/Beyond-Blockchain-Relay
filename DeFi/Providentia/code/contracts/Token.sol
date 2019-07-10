pragma solidity 0.5.0;

import "./ERC1155.sol";
import "./ERC1155MixedFungibleMintable.sol";

contract StudentToken is ERC1155, ERC1155MixedFungibleMintable {
  constructor() public {

  }
}
