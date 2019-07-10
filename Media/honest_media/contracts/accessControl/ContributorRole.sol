pragma solidity >=0.4.21 <0.6.0;

// Import the library 'Roles' and SafeMath
import "../../node_modules/openzeppelin-solidity/contracts/access/Roles.sol";
import "../../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

// Define a contract 'ContributorRole' to manage this role - add, remove, check
contract ContributorRole {
  using Roles for Roles.Role;
  using SafeMath for uint;

  // Define 2 events, one for Adding, and other for Removing
  event ContributorAdded(address indexed account);
  event ContributorRemoved(address indexed account);

  // Define a struct 'Contributors' by inheriting from 'Roles' library, struct Role
  Roles.Role private contributors;

  //Define a struct to store contributor information
  struct contributorInfo {
      uint rating;
      uint balance;
      uint articlesPublished;
      uint challengesLost;
      uint[] articles; //to store Ids of articles published
  }
  //Define a mapping to map contributor address and contributor info
  mapping(address => contributorInfo) allContributors;

  // In the constructor make the address that deploys this contract the 1st Contributor
  constructor() public {
    _addContributor(msg.sender, 0);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyContributor() {
    require(isContributor(msg.sender), "Caller is not a Contributor");
    _;
  }

  // Define a function 'isContributor' to check this role
  function isContributor(address account) public view returns (bool) {
    return contributors.has(account);
  }

  // Define a function 'addContributor' that adds this role
  function addContributor(address account, uint fund) public {
    _addContributor(account, fund);
  }

  // Define a function 'renounceContributor' to renounce this role
  function renounceContributor() public {
    _removeContributor(msg.sender);
  }

  //Define a function to increase number of articles published
  function publish() external {
    allContributors[msg.sender].articlesPublished = allContributors[msg.sender].articlesPublished.add(1);
  }

  //Define a function to increase number of challenges
  function updateChallenge() external {
    allContributors[msg.sender].challengesLost = allContributors[msg.sender].challengesLost.add(1);
  }

  //set ranking of contributor
  function setRating(address account, uint ranking) public {
    contributorInfo memory contributor = allContributors[account];
    contributor.rating = ranking;
  }

  //get ranking of contributor
  function getRating(address account) public view returns (uint rating){
    contributorInfo memory contributor = allContributors[account];
    return contributor.rating;
  }

  //Add articleId to articles array
  function addArticle(uint articleId) public {
    allContributors[msg.sender].articles.push(articleId);
  }

  // Define an internal function '_addContributor' to add this role, called by 'addContributor'
  function _addContributor(address account, uint fund) internal {
    contributors.add(account);
    allContributors[account].balance = fund;
    emit ContributorAdded(account);
  }

  // Define an internal function '_removeContributor' to remove this role, called by 'removeContributor'
  function _removeContributor(address account) internal {
    contributors.remove(account);
    emit ContributorRemoved(account);
  }
}