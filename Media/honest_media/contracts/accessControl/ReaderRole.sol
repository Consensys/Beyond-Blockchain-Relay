pragma solidity >=0.4.21 <0.6.0;

// Import the library 'Roles' and SafeMath
import "../../node_modules/openzeppelin-solidity/contracts/access/Roles.sol";
import "../../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

// Define a contract 'ReaderRole' to manage this role - add, remove, check
contract ReaderRole {
  using Roles for Roles.Role;
  using SafeMath for uint;

  // Define 2 events, one for Adding, and other for Removing
  event ReaderAdded(address indexed account);
  event ReaderRemoved(address indexed account);
  event ChallengeAdded(address account, uint challengeId);

  // Define a struct 'Readers' by inheriting from 'Roles' library, struct Role
  Roles.Role private readers;

  //Define a struct to store Reader information
  struct readerInfo {
      uint rating;
      uint balance;
      uint numOfChallenges;
      //uint[] challenges; //array of challenge ids raised by the reader
      mapping(uint => bool) challenges;
  }

  //Define a mapping to map reader address and reader info
  mapping(address => readerInfo) allReaders;

  //Struct for challenges
  struct challengeInfo {
    uint articleId;
    address contributor;
    address reader;
    bytes32 proofHash;
    uint stake;
    bool success;
    uint rulingId;
    }

  //Save number of total challenges
  uint public totalChallenges;

  //Mapping for saving all challenges
  mapping(uint => challengeInfo) allChallenges;

 // In the constructor make the address that deploys this contract the 1st Reader
  constructor() public {
    _addReader(msg.sender, 0);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyReader() {
    require(isReader(msg.sender), "Caller is not a Reader");
    _;
  }

  // Define a function 'isReader' to check this role
  function isReader(address account) public view returns (bool) {
    return readers.has(account);
  }

  // Define a function 'addReader' that adds this role
  function addReader(address account, uint funds) public {
    _addReader(account, funds);
  }

  // Define a function 'renounceReader' to renounce this role
  function renounceReader() public {
    _removeReader(msg.sender);
  }

  //Define a function to increase number of challenges
  function challenge(uint articleId, address contributor, bytes32 proofHash, uint stake, address account) public {
    totalChallenges = totalChallenges.add(1);
    allChallenges[totalChallenges] = challengeInfo({articleId: articleId, contributor: contributor, reader: account,
                                                   proofHash: proofHash, stake: stake, success: false, rulingId:0});
    allReaders[account].numOfChallenges = allReaders[account].numOfChallenges.add(1);
    allReaders[account].challenges[totalChallenges] = false;
    emit ChallengeAdded(account, totalChallenges);
  }

  //set ranking of contributor
  function setRating(address account, uint ranking) public {
    readerInfo memory reader = allReaders[account];
    reader.rating = ranking;
  }

  // Define an internal function '_addReader' to add this role, called by 'addReader'
  function _addReader(address account, uint funds) internal {
    readers.add(account);
    allReaders[account].balance = funds;
    emit ReaderAdded(account);
  }

  // Define an internal function '_removeReader' to remove this role, called by 'removeReader'
  function _removeReader(address account) internal {
    readers.remove(account);
    emit ReaderRemoved(account);
  }
}