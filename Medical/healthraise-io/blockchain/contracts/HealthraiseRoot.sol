pragma solidity >=0.4.21 <0.7.0;

import "./Ownable.sol";

contract HealthraiseRoot is Ownable {

    event AccountAdded(uint id, string name, address publicAddress);

    event transaction(address from, address to, uint amount);

    struct Account {
        string name;
        uint id;
        uint raised;
        uint32 upvote;
        uint32 downvote;
    }

    Account[] public accounts;

    mapping (address => uint) accountCount;
    mapping (address => uint) accountId;
    mapping (uint => address) public accountToOwner;
    mapping (address => address[]) public votedOn;

    modifier didNotVote(address _to, address _from) {
        address[] memory votes = votedOn[_from];
        bool noVote = true;
        // Iterate 1 through 10 with a for loop:
        for (uint i = 0; i < votes.length; i++) {
            if (votes[i] == _to) {
                noVote = false;
            }
          }
        require(noVote);
        _;
    }

    function createAccount(string _name) public {
        require(accountCount[msg.sender] == 0);
        uint id = accounts.push(Account(_name, id, 0, 0, 0)) - 1;
        accountCount[msg.sender]++;
        accountId[msg.sender] = id;
        accountToOwner[id] = msg.sender;
        emit AccountAdded(id, _name, msg.sender);
    }

    function sponsor(address _to, uint _amount) public {
        uint id = accountId[_to];
        address(_to).transfer(_amount);
        accounts[id].raised = accounts[id].raised + _amount;
        emit transaction(msg.sender,_to,_amount);
    }

    // do something to make sure each person can only vote on one entity once
    function rate(address _to, bool _positive) public didNotVote(_to, msg.sender) {
        uint id = accountId[_to];
        if (_positive) {
            accounts[id].upvote++;
        } else {
            accounts[id].downvote++;
        }
    }

    function getUpvotes(address _of) public view returns (uint32) {
        uint id = accountId[_of];
        return accounts[id].upvote;
    }

    function getDownvotes(address _of) public view returns (uint32) {
        uint id = accountId[_of];
        return accounts[id].downvote;
    }

    function getRaised(address _of) public view returns (uint) {
        uint id = accountId[_of];
        return accounts[id].raised;
    }

    function getName(address _of) public view returns (string) {
        uint id = accountId[_of];
        return accounts[id].name;
    }
}