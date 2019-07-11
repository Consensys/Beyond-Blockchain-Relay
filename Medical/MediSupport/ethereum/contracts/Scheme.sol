pragma solidity ^0.4.25;

contract SchemeFactory {
   address[] private deployedSchemes;

   function createScheme(uint minimum) public{
       address newScheme = new Scheme(minimum, msg.sender);
       deployedSchemes.push(newScheme);
   }

   function getDeployedSchemes() public view returns(address[]) {
       return deployedSchemes;
   }
}

contract Scheme {

    uint public totalSchemeBalance;
    uint public premium;
    address public admin;
    mapping(address => Member) public member;
    address[] public memberAddresses;
    Claim[] public claims;
    //uint private schemeDuration = 365 days;
    //uint private numberOfContributions = 12;
    uint public memberCount;

    struct Member {
        string name;
        uint contributedAmount;
        bool claimed;
    }
    struct Claim {
        string description;
        uint amount;
        address payee; // receipient
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    constructor(uint _premium, address _admin) public {
        admin = _admin;
        premium = _premium;
    }

    function contribute(string _name) public payable {
        require(msg.value >= premium);

        member[msg.sender].name = _name;
        member[msg.sender].contributedAmount = member[msg.sender].contributedAmount + (msg.value);
        totalSchemeBalance = totalSchemeBalance + msg.value;
        memberAddresses.push(msg.sender);
        memberCount++;
    }

     function getMemberContribution(address _member) public view returns(uint) {
        return member[_member].contributedAmount;
    }
    
    function getSchemeBalance() public view returns(uint) {
        return totalSchemeBalance;
    }
    
    function submitClaim(string memory _description, uint _amount, address _payee) public returns(address) {
        require(member[msg.sender].contributedAmount >= _amount);
        require(_amount >= premium);
        require(_payee != address(0));
        
        Claim memory newClaim = Claim({
            description: _description,
            amount: _amount,
            payee: _payee,
            complete: false,
            approvalCount: 0
        });
        
        member[msg.sender].claimed = true;

        claims.push(newClaim);
        
        return msg.sender;
    }

     function approveClaim(uint _index) public {
        Claim storage claim = claims[_index];

        require(member[msg.sender].contributedAmount > premium);
        require(!claim.approvals[msg.sender]);

        claim.approvals[msg.sender] = true;
        claim.approvalCount++;
    }

    function finalizeClaim(uint index) public  {
        Claim storage claim = claims[index];
        
        address claimer = submitClaim(claim.description, claim.amount, claim.payee);
        
        require(msg.sender == admin);

        require(claim.approvalCount >= (memberCount /  2));

        require(!claim.complete);

        claim.payee.transfer(claim.amount);
        member[claimer].contributedAmount = member[claimer].contributedAmount - claim.amount;
        totalSchemeBalance = totalSchemeBalance - claim.amount;
        claim.complete = true;
    }
    
    function getSummary() public view returns(uint, uint, uint, uint, address) {
        return(
            premium,
            totalSchemeBalance,
            claims.length,
            memberCount,
            admin
        );
    }

    function getClaimsCount() public view returns(uint) {
        return claims.length;
    }

}


