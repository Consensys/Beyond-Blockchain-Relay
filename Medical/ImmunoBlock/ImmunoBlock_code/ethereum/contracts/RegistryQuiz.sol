pragma solidity ^0.5.7;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract RegistryQuiz is Ownable {

    event userSignedUp(string did, address addr);
    event userAllowed(string userDid, string allowedDid);

    /**
     * Role 0 - Admin; 1 - Normal User; 2 - Company
     */
    struct User {
        address addr;
        uint256 role;
    }
    mapping(string => User) private users;
    mapping(string => string) private quiz;
    mapping(string => mapping(string => bool)) private allowed;

    /**
     * @dev Modifier to check if the user is the valid user
     * by comparing the address in the did registry.
     */
    modifier onlyUser(string memory _did) {
        require(users[_did].addr == msg.sender, "Your are not the right user.");
        _;
    }

    /**
     * @dev Verifies if a user is signed.
     */
    function userExists(string memory _userDid) public view returns(bool) {
        return users[_userDid].addr != address(0);
    }

    /**
     * @dev save msg.sender and uport did in order to be able
     * to verify if the user authenticity in future transactions.
     * By default it sets the role to one, the user role.
     */
    function signupUser(string memory _userDid) public {
        require(users[_userDid].addr == address(0), "User already exists!");
        User memory newUser = User(msg.sender, 1);
        users[_userDid] = newUser;
        emit userSignedUp(_userDid, msg.sender);
    }

    /**
     * @dev save msg.sender and uport did in order to be able
     * to verify if the user authenticity in future transactions.
     * This is an admin method to sigup some specific users, using their
     * uport id, addr and giving them a role.
     */
    function signup(string memory _userDid, address _addr, uint256 _role) public onlyOwner {
        User memory newUser = User(_addr, _role);
        users[_userDid] = newUser;
        emit userSignedUp(_userDid, _addr);
    }

    /**
     * @dev Give permission to another user providing the did.
     */
    function grantAccess(string memory _userDid, string memory _toDid) public onlyUser(_userDid) {
        allowed[_toDid][quiz[_userDid]] = true;
        emit userAllowed(_userDid, _toDid);
    }

    /**
     * @dev Verify if a user already has an uploaded quiz,
     * using his own did.
     */
    function hasQuiz(string memory _userDid) public view returns (bool) {
        return bytes(quiz[_userDid]).length > 1;
    }

    /**
     * @dev Get user quiz using it's own did.
     */
    function getQuiz(string memory _userDid) public view onlyUser(_userDid) returns (string memory) {
        return quiz[_userDid];
    }

    /**
     * @dev Upload a quiz from a user, qith the given did and file path.
     */
    function uploadQuiz(string memory _userDid, string memory _quizFilePath) public onlyUser(_userDid) {
        quiz[_userDid] = _quizFilePath;
    }

    /**
     * @dev Access a patient quiz. Requires given access from the patient (user).
     */
    function accessPatientQuiz(string memory _userDid, string memory _patientDid) public view returns (string memory) {
        string memory quizPath = quiz[_patientDid];
        require(allowed[_userDid][quizPath] == true, "Access denied!");
        return quizPath;
    }
}
