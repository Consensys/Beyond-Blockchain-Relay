pragma solidity ^0.5.0;
import "./Ownable.sol";

/// @author Chris Spannos
/// @title Invest-y-gative

contract SourceMaterial {
    string ipfsHash;
    ///For circuitbreaker
    bool private stopped = false;
    address private owner;

    /// Grabs the IPFS file hash based on the address.
    mapping (address => string) ipfsInbox;

    /// ipfsSent sends the IPFS file hash to a recipient.
    event ipfsSent(string _ipfsHash, address _address);

    /// inboxResponse sends a notification to the user that they have a message waiting.
    event inboxResponse(string response);

    /// returnipfsHash calls the IPFS file hash for display in the TX receipt.
    event returnipfsHash(string ipfsEth);

    /// For circuitbreaker
    modifier isAdmin() {
        require(msg.sender == owner);
        _;
    }

    /// Modifiers are used here to check the account state in the function 'sendIPFS' for account notificaitons.
    modifier notFull (string memory _string) {
      bytes memory stringTest = bytes(_string);
      require (stringTest.length == 0);
      _;
    }

    /// This empty constructor is used to initialize the contract.
    constructor() public {

    }

    /// Store 'x' (the IPFS file hash) in the contract state.
    /// @param x the new value to store.
    /// @dev stores the IPFS file hash in the state variable 'setHash'.
    function setHash(string memory x) public {
      ipfsHash = x;
    }

    /// Return 'x' (the IPFS file hash) from the contract memory.
    /// @param x is the verified IPFS file hash.
    /// @dev returns the IPFS file hash when state variable 'getHash is called'.
    function getHash(string memory ipfsEth) public returns (string memory x) {
      emit returnipfsHash(ipfsEth);
      return ipfsHash;
    }

    /// The IPFS file hash is sent to a recipeint account.
    /// @param _ipfsHash is the value called from the contact state.
    /// @dev sendIPFS sends the file hash to '_address'.
    function sendIPFS(address _address, string memory _ipfsHash)
        notFull(ipfsInbox[_address])
        public
    {
       ipfsInbox[_address] = _ipfsHash;
       emit ipfsSent(_ipfsHash, _address);
    }

    /// This function checks the value of 'ipfs_hash' to see if it is storing bytes.
    /// If the value is storing 0 > bytes it emits a notificaitons.
    /// @dev 'checkInbox checks 'ipfs_hash' and, if there is 0 > bytes emits and responce to the account checking.
    function checkInbox()
        public
    {
        string memory ipfs_hash = ipfsInbox[msg.sender];
        if(bytes(ipfs_hash).length == 0) {
            emit inboxResponse("Empty Inbox");
        } else {
            ipfsInbox[msg.sender] = "";
            emit inboxResponse(ipfs_hash);
        }
    }
    /// For circuitbreaker
    function toggleContractActive() isAdmin public {
        // You can add an additional modifier that restricts stopping a contract to be based on another action, such as a vote of users
        stopped = !stopped;
    }
    /// For circuitbreaker
    modifier stopInEmergency { if (!stopped) _; }
    modifier onlyInEmergency { if (stopped) _; }

    /// For circuitbreaker
    function deposit() stopInEmergency public {
        // some code
    }

    /// For circuitbreaker
    function withdraw() onlyInEmergency public {
        // some code
    }

}
