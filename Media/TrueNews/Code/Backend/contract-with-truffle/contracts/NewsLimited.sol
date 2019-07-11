pragma solidity 0.5.0;

//todo,onlyowner modifier on initplz function or make it constructor or use homework.
import { HumanityRegistry } from "./HumanityRegistry.sol";
import { Ifox } from "./Ifox.sol";

contract NewsLimited {
    event rumor(address x, string w);
    HumanityRegistry public registry;
    Ifox public news;
    uint256 public rumorsCount=0;
    		struct rumorData{ 
		string url;
		address sender;
	}
    	mapping (uint256 => rumorData) usersRoumors;

    function initplz(HumanityRegistry _registry, Ifox _news) public {
        registry = _registry;
        news = _news;
    }
    
    function Rumors(string memory _weblink) public {
        require(registry.isHuman(msg.sender), "journalist only");
        
        emit rumor(msg.sender, _weblink);
        rumorsCount++;
	 	 rumorData memory newRumor;
          newRumor.url=_weblink;
          newRumor.sender=msg.sender;
            usersRoumors[rumorsCount]=newRumor;
    } 
    	function getRumor(uint256 count)public view returns (address ,string memory) {
		return (usersRoumors[count].sender,usersRoumors[count].url);
	}
    	function getCount()public view returns (uint256) {
		return (rumorsCount);
	}
    function reward(address jor) internal {
    uint totalSupply = news.totalSupply();
        
    if (totalSupply < 28000000e18) {
            news.mint(jor, 30000e18); // 1 - 100
    } else if (totalSupply < 46000000e18) {
             news.mint(jor, 20000e18); // 101 - 1000
    } else if (totalSupply < 100000000e18) {
            news.mint(jor, 6000e18); // 1001 - 10000
    }
    }
    function support(address _jor, uint256 _amount) public returns(bool) {
	    require(registry.isHuman(_jor), "support journalists only");
		require(_amount > 0, "no zero plz");
		address payer = msg.sender;
		news.transferFrom(payer, _jor, _amount);
        reward(_jor);
        return true;
    }
}