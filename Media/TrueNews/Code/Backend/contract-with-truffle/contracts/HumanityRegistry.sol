pragma solidity 0.5.0;
// pragma experimental ABIEncoderV2;

contract HumanityRegistry {

    mapping (address => bool) public humans;

    address public governance;

    function initplz(address _governance) public {
        
        governance = _governance;
    }

    function add(address who) public {
        require(msg.sender == governance, "HumanityRegistry::add: Only governance can add an identity");
        require(humans[who] == false, "HumanityRegistry::add: Address is already on the registry");
        humans[who] = true;
    }

    function remove(address who) public {
        require(
            msg.sender == governance || msg.sender == who,
            "HumanityRegistry::remove: Only governance or the identity owner can remove an identity"
        );
        delete humans[who];
    }

    function isHuman(address who) public view returns (bool) {
        return humans[who];
    }

 
}