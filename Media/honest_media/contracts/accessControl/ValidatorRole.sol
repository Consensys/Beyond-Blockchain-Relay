pragma solidity >=0.4.21 <0.6.0;

// Import the library 'Roles' and SafeMath
import "../../node_modules/openzeppelin-solidity/contracts/access/Roles.sol";
import "../../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

// Define a contract 'ValidatorRole' to manage this role - add, remove, check
contract ValidatorRole {
  using Roles for Roles.Role;
  using SafeMath for uint;

  // Define 2 events, one for Adding, and other for Removing
  event ValidatorAdded(address indexed account);
  event ValidatorRemoved(address indexed account);

  // Define a struct 'Validators' by inheriting from 'Roles' library, struct Role
  Roles.Role private validators;

  //Define a struct to store Validator information
  struct validatorInfo {
      uint rating;
      uint balance;
      uint numOfChallenges;
      uint challengesLost;
      uint challengesWon;
  }
  //Define a mapping to map validator address and validator info
  mapping(address => validatorInfo) allValidators;

  //Define a variable to store total number of validators
  uint public totalValidators;

  //Define a mapping to store validator Ids
  mapping(uint => address) public validatorIds;

  // In the constructor make the address that deploys this contract the 1st Validator
  constructor() public {
    _addValidator(msg.sender, 0);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyValidator() {
    require(isValidator(msg.sender), "Caller is not a Validator");
    _;
  }

  // Define a function 'isValidator' to check this role
  function isValidator(address account) public view returns (bool) {
    return validators.has(account);
  }

  // Define a function 'addValidator' that adds this role
  function addValidator(address account, uint funds) public {
    _addValidator(account, funds);
  }

  // Define a function 'renounceValidator' to renounce this role
  function renounceValidator() public {
    _removeValidator(msg.sender);
  }

  //Define a function to increase number of challenges
  function ruleOnChallenge() external onlyValidator{
    allValidators[msg.sender].numOfChallenges = allValidators[msg.sender].numOfChallenges.add(1);
  }

  //set ranking of validator
  function setRating(address account, uint ranking) public {
    validatorInfo memory validator = allValidators[account];
    validator.rating = ranking;
  }

  //Increase number of challenges won
  function updateChallengesWon(address account) public {
    allValidators[account].challengesWon = allValidators[account].challengesWon.add(1);
  }

  //Increase number of challenges Lost
  function updateChallengesLost(address account) public {
    allValidators[account].challengesLost = allValidators[account].challengesLost.add(1);
  }

  // Define an internal function '_addValidator' to add this role, called by 'addValidator'
  function _addValidator(address account, uint funds) internal {
    validators.add(account);
    allValidators[account].balance = funds;
    totalValidators = totalValidators.add(1);
    validatorIds[totalValidators] = account;
    setRating(account, 2);
    emit ValidatorAdded(account);
  }

  // Define an internal function '_removeValidator' to remove this role, called by 'removeValidator'
  function _removeValidator(address account) internal {
    validators.remove(account);
    emit ValidatorRemoved(account);
  }
}
