pragma solidity >=0.4.21 <0.6.0;
import "./accessControl/ContributorRole.sol";
import "./accessControl/ReaderRole.sol";
import "./accessControl/ValidatorRole.sol";
import "./Article.sol";
// Import the library 'Roles' and SafeMath
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";


contract Honestmedia is ContributorRole, ReaderRole, ValidatorRole, Article  {
    using SafeMath for uint;

	address owner;

	//check if contract operational
    bool private operational = true;

    //variables to define minimum funding amounts for validators and contributors.
    //These should be checked when adding new actors.
    uint constant MIN_FUNDING_VALIDATOR = 1 ether; //we can decide a different amount
    uint constant MIN_FUNDING_CONTRIBUTOR = 2 ether; //we can decide a different amount

    //mapping to store available withdrawals
    mapping(address => uint) availableWithdrawls;

    //Struct to store ruling
    struct ruling {
        uint articleId;
        uint challengeId;
        address[3] validators;
        bool[3] votes;
        uint voted;
    }

    //Mapping to save ruling for challenges
    mapping(uint => ruling) allRulings;

    //Variable to save totalRulings
    uint public totalRulings;

	constructor() public {
        owner = msg.sender;
    }

     modifier requireIsOperational() {
        require(operational, "Contract is currently not operational");
        _;  // All modifiers require an "_" which indicates where the function body will be added
    }

    modifier requireContractOwner() {
        require((msg.sender == owner), "Caller is not admin");
        _;
    }

    function isOperational() 
                            public 
                            view 
                            returns(bool) {
        return operational;
    }

    function setOperatingStatus
                            (
                                bool mode
                            ) 
                            external
                            requireContractOwner {
        operational = mode;
    }

    //add contributor
    function registerContributor(address _address, uint _fund) external {
        ContributorRole.addContributor(_address, _fund);
    }

    //add reader
    function registerReader(address _address, uint _fund) external {
        ReaderRole.addReader(_address, _fund);
    }

    //add validator
    function registerValidator(address _address, uint _fund) external {
        ValidatorRole.addValidator(_address, _fund);
    }

    //seting ranking
    function setContributorRating(address _address, uint rank) internal {
    	ContributorRole.setRating(_address, rank);
    }

    function setReaderRating(address _address, uint rank) internal {
    	ReaderRole.setRating(_address, rank);
    }

    function setValidatorRating(address _address, uint rank) internal {
    	ValidatorRole.setRating(_address, rank);
    }

    //function get article contributor
    function getArticleContributor(uint _articleNumber) public view returns (address _contributor) {
        return Article.getArticleContributor(_articleNumber);
    }

    function getContributorRating(address _address) public view returns (uint rating) {
        ContributorRole.getRating(_address);
    }

    //Function to store the article etc
    function addArticle(bytes32 _ipfsArticleHash, bytes32 _ipfsReferenceHash, string memory _title,
                        uint _datePublished, uint _stake) public onlyContributor
    {
        //Check if Amount staked is greater than balance of contributor
        require(_stake <= ContributorRole.allContributors[msg.sender].balance,
                         "Insufficient funds to publish article. Amount staked should be less than account balance.");
        uint articleNum = Article.add(msg.sender, _ipfsArticleHash, _ipfsReferenceHash, _title, _datePublished, _stake);
        //ContributorRole.allContributors[msg.sender].articles.push(articleNum);
        ContributorRole.addArticle(articleNum);
        assignValidator(articleNum, msg.sender);
    }

    //function get the number of all articles
    function getNumberOfArticles() public view returns (uint noOfArticles){
        return Article.getNumberOfArticles();
    }

    //Define a function if article is challenged
      function isArticleChallenged(uint articleNumber) public view returns (bool isChallenged){
        return Article.isArticleChallenged(articleNumber);
      }

    //Define a function if article is challenged
      function isChallengeRuled(uint challengeId) public view returns (bool isRuled){
          uint _rulingId = ReaderRole.allChallenges[challengeId].rulingId;
          if(allRulings[_rulingId].voted == 3) return true;
      }

      function getArticleId(uint challengeId) public view returns(uint articleId){
          return ReaderRole.allChallenges[challengeId].articleId;
      }

    //function to get the list of all the articles' titles
    function getArticle(uint _articleNumber) public view returns (string memory title, uint datePublished, uint upvotes, uint downvotes){
        string memory articleTitle = Article.getArticleTitle(_articleNumber);
        uint articleDatePublished = Article.getArticleDatePublished(_articleNumber);
        uint articleUpvotes = Article.getArticleUpvotes(_articleNumber);
        uint articleDownvotes = Article.getArticleDownvotes(_articleNumber);
        return (articleTitle, articleDatePublished, articleUpvotes, articleDownvotes);
    }

    //Assign validator to approve article
    function assignValidator(uint articleId, address contributor) internal {
        //check to see if random validator is also contributor
        address randomValidator = ValidatorRole.validatorIds[random(1)];
        while (randomValidator == contributor){
           randomValidator = ValidatorRole.validatorIds[random(1)];
        }
        Article.allArticles[articleId].validator = randomValidator;
    }

    //Function to update rating for Contributors
    function updateContributorRating(bool vote, bool challengeLost, address _contributor, uint articleId) public {
        uint newRating;

        //change rating after challenge lost
        if(challengeLost == true){
            if(ContributorRole.allContributors[_contributor].rating > 0){
                newRating = ContributorRole.allContributors[_contributor].rating.sub(1);
                setContributorRating(_contributor, newRating);
            }
            ContributorRole.allContributors[_contributor].challengesLost = ContributorRole.allContributors[_contributor].challengesLost.add(1);
        }else {
        //change rating after reader vote
            if(vote == true){
                Article.allArticles[articleId].upVotes = Article.allArticles[articleId].upVotes.add(1);
            }else {
                Article.allArticles[articleId].downVotes = Article.allArticles[articleId].downVotes.add(1);
            }
            newRating = contributorRatingCalculator(ContributorRole.allContributors[_contributor].rating, Article.allArticles[articleId].upVotes,
                                                        Article.allArticles[articleId].downVotes, ContributorRole.allContributors[_contributor].articlesPublished);
            setContributorRating(_contributor, newRating);
        }
    }

    //Function to update reader's rating
    function updateReaderRating(address reader, uint challengeId) internal {
        uint currentRating = ReaderRole.allReaders[reader].rating;
        uint totalChallenges = ReaderRole.allReaders[reader].numOfChallenges;
        uint successful;
        for(uint i = 1; i <= totalChallenges; i++){
            if(ReaderRole.allReaders[reader].challenges[challengeId] == true )
                successful++;
        }
        uint newRating = readerRatingCalculator(currentRating, successful, totalChallenges);
        setReaderRating(reader, newRating);
    }

    //Function to update validator's rating
    function updateValidatorRating(address validator, bool result) internal {
        uint newRating;
        uint currentRating = ValidatorRole.allValidators[validator].rating;
        uint prevDiff;
        uint newDiff = ValidatorRole.allValidators[validator].challengesWon.sub(ValidatorRole.allValidators[validator].challengesLost);
        if (newDiff > 0){
            if(result == true) {
                prevDiff = newDiff.sub(1);
            }else {
                prevDiff = newDiff.add(1);
            }
            newRating = validatorRatingCalculator(currentRating, prevDiff, newDiff);
        }else {
            newRating = 0;
        }
        setValidatorRating(validator, newRating);
    }

    //Function to calculate rating for Contributors
    function contributorRatingCalculator(uint currentRating, uint upVotes, uint downVotes, uint articles) internal pure returns(uint){
        uint totalRatings = upVotes.add(downVotes);
        uint recentRating = upVotes.div(totalRatings).mul(5);
        uint newRating = articles.sub(1);
        newRating = newRating.mul(currentRating);
        newRating = newRating.add(recentRating);
        newRating = newRating.div(articles);
        return newRating;
    }

    //Function to calculate rating for Readers
    function readerRatingCalculator(uint currentRating, uint successful, uint totalChallenges) internal pure returns(uint){
        uint recentRating = successful.div(totalChallenges).mul(5);
        uint newRating = totalChallenges.sub(1);
        newRating = newRating.mul(currentRating);
        newRating = newRating.add(recentRating);
        newRating = newRating.div(totalChallenges);
        return newRating;
    }

    //Function to calculate rating for Validators
    function validatorRatingCalculator(uint currentRating, uint prevDiff, uint newDiff) internal pure returns(uint){
        uint newRating = currentRating.mul(newDiff).div(prevDiff);
        return newRating;
    }

    //Function to challenge an article
    function challengeArticle(bytes32 proofHash, uint stake, uint articleId) external onlyReader {
        //Check if Amount staked is greater than balance of Reader
        require(stake <= ReaderRole.allReaders[msg.sender].balance, "Insufficient funds to challenge article.");
        address contributor = Article.allArticles[articleId].contributor;
        ReaderRole.challenge(articleId, contributor, proofHash, stake, msg.sender);
        assignValidators(articleId, ReaderRole.totalChallenges);
    }

    //function to find random validators to vote on challenge
    function assignValidators(uint _articleId, uint _challengeId) internal {
        totalRulings = totalRulings.add(1);
        address[3] memory validators;
        for(uint i = 1; i < 4; i++)
        {
            validators[i-1] = ValidatorRole.validatorIds[random(i)];
        }
        allRulings[totalRulings].validators = validators;
        allRulings[totalRulings].articleId = _articleId;
        allRulings[totalRulings].challengeId = _challengeId;
        ReaderRole.allChallenges[_challengeId].rulingId = totalRulings;
    }

    //Random number generator
    function random(uint nonce) internal view returns (uint) {
        uint MAX = ValidatorRole.totalValidators;
        uint seed = uint(keccak256(abi.encodePacked(now, msg.sender, nonce)));
        uint scaled = seed.div(MAX);
        uint adjusted = scaled;
        return adjusted;
    }

    function getRulingId(uint _challengeId) public view returns(uint rulingId){
        return ReaderRole.allChallenges[_challengeId].rulingId;
    }

    //function to register validator votes on challenge. Will also check if 2 of 3 consensus is reached
    function voteOnChallenge(uint rulingId, bool vote, uint challengeId) external onlyValidator {
        uint numOfYesVotes;
        for(uint i = 0; i < 3; i++){
            if (allRulings[rulingId].validators[i] == msg.sender) {
                allRulings[rulingId].votes[i] = vote;
                allRulings[rulingId].voted++;
            }
            if(allRulings[rulingId].votes[i] == true)
                numOfYesVotes++;
        }
        if(numOfYesVotes >= 2){
            //Challenge is successful if 2 out of 3 validators vote yes
            challengeSuccessful(challengeId, rulingId);
        }else
        {
            //Check to see if all 3 validators have voted
            if(allRulings[rulingId].voted == 3) {
              challengeUnsuccessful(challengeId, rulingId);
            }
        }
    }

    //function called if challenge is sucessful
    function challengeSuccessful(uint challengeId, uint rulingId) internal {
        ReaderRole.allChallenges[challengeId].success = true;
        // update contributor's challenges lost
        address contributor = ReaderRole.allChallenges[challengeId].contributor;
        ContributorRole.allContributors[contributor].challengesLost = ContributorRole.allContributors[contributor].challengesLost.add(1);
        
        address reader = ReaderRole.allChallenges[challengeId].reader;
        ReaderRole.allReaders[reader].challenges[challengeId] = true;

        uint articleId = ReaderRole.allChallenges[challengeId].articleId;
        
        // Distribute Amount staked by contributor to reader and validators
        uint amount = Article.allArticles[articleId].stake;
        divideStake(contributor, reader, rulingId, amount, true);

        // Update Contributor ratings
        updateContributorRating(false, true, contributor, articleId);

        // Update Reader ratings
        updateReaderRating(reader, challengeId);
       
       // Update Validator ratings
       address validator = Article.allArticles[articleId].validator;
       ValidatorRole.updateChallengesWon(validator);
       updateValidatorRating(validator, true);
    }

    //function called if challenge is unsucessful
    function challengeUnsuccessful(uint challengeId, uint rulingId) internal {
        address reader = ReaderRole.allChallenges[challengeId].reader;
        uint articleId = ReaderRole.allChallenges[challengeId].articleId;
        address validator = Article.allArticles[articleId].validator;
        address contributor = ReaderRole.allChallenges[challengeId].contributor;

        ReaderRole.allChallenges[challengeId].success = false;
        // Distribute Amount staked by reader to contributor and validators
        uint amount = ReaderRole.allChallenges[challengeId].stake;
        divideStake(contributor, reader, rulingId, amount, false);

        // Update Reader ratings
        updateReaderRating(reader, challengeId);
       
       // Update Validator ratings
       ValidatorRole.updateChallengesLost(validator);
       updateValidatorRating(validator, false);
    }

    //Function to divide stake
    function divideStake(address contributor, address reader, uint rulingId, uint amount, bool success) internal {
        address[3] memory validators = allRulings[rulingId].validators;
        uint share = amount.div(4);

        //Reimburse validators
        for(uint i = 1; i <= 3; i++){
            ValidatorRole.allValidators[validators[i]].balance = ValidatorRole.allValidators[validators[i]].balance.add(share);
            availableWithdrawls[validators[i]] = availableWithdrawls[validators[i]].add(share);
        }

        if(success == true){
            //Deduct from contributor balance
            ContributorRole.allContributors[contributor].balance = ContributorRole.allContributors[contributor].balance.sub(amount);
            availableWithdrawls[contributor] = availableWithdrawls[contributor].sub(amount);

            //Reimburse Reader
            availableWithdrawls[reader] = availableWithdrawls[reader].add(share);
            ReaderRole.allReaders[reader].balance = ReaderRole.allReaders[reader].balance.add(share);
        }else {
            //Deduct from Reader
            availableWithdrawls[reader] = availableWithdrawls[reader].sub(amount);
            ReaderRole.allReaders[reader].balance = ReaderRole.allReaders[reader].balance.sub(amount);

            //Deduct from contributor balance
            ContributorRole.allContributors[contributor].balance = ContributorRole.allContributors[contributor].balance.add(share);
            availableWithdrawls[contributor] = availableWithdrawls[contributor].add(share);
        }

    }

    //function that allows to withdraw funds. For Validators and Contributors their balance should not be less than the minimum funding amount.
    function withdraw(uint amount) external payable {
        require(amount <= availableWithdrawls[msg.sender], "Not enough balance");
        bool allow;
        uint balance;
        if(ContributorRole.isContributor(msg.sender) == true){
            balance = ContributorRole.allContributors[msg.sender].balance;
            balance = balance.sub(amount);
            require(balance >= MIN_FUNDING_CONTRIBUTOR, "Insufficient Balance");
            allow = true;
            ContributorRole.allContributors[msg.sender].balance = balance;
        }
        if(ValidatorRole.isValidator(msg.sender) == true){
            balance = ValidatorRole.allValidators[msg.sender].balance;
            balance = balance.sub(amount);
            require(balance >= MIN_FUNDING_VALIDATOR, "Insufficient Balance");
            allow = true;
            ValidatorRole.allValidators[msg.sender].balance = balance;
        }
        if(ReaderRole.isReader(msg.sender) == true){
            allow = true;
            ReaderRole.allReaders[msg.sender].balance = ReaderRole.allReaders[msg.sender].balance.sub(amount);
        }
        if(allow == true){
            availableWithdrawls[msg.sender] = availableWithdrawls[msg.sender].sub(amount);
            msg.sender.transfer(amount);
        }
    }

    //Fallback function
    function () external payable {
    }



}