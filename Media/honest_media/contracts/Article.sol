pragma solidity >=0.4.21 <0.6.0;

// Import the library 'Roles' and SafeMath
//import "../node_modules/openzeppelin-solidity/contracts/access/Roles.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

// Define a contract 'ContributorRole' to manage this role - add, remove, check
contract Article {
  using SafeMath for uint;

  // Define events
  event ArticleAdded(uint aticleNum);
  event ArticleRemoved(uint aticleNum);
  event ArticleChallenged(uint aticleNum);
  //Not sure if we need these below
  event ArticleUpVoted(uint aticleNum);
  event ArticleDownVoted(uint aticleNum);

  //Define a struct to store contributor information
  struct articleInfo {
      address contributor;
      bytes32 ipfsArticleHash;
      bytes32 ipfsReferenceHash;
      string title;
      uint datePublished;
      address validator;
      bool challenged;
      bool removed;
      uint upVotes;
      uint downVotes;
      uint stake;
    }

  //Define a variable to count number of articles.
  uint totalArticles;

  //Define a mapping to map contributor address and contributor info
  mapping(uint => articleInfo) allArticles;

  // In the constructor make the address that deploys this contract the 1st Contributor
  //   constructor() public {
 //   }

  // Define a function 'addArticle' that adds the article
  function add(address _contributor, bytes32 _ipfsArticleHash, bytes32 _ipfsReferenceHash,
                        string memory _title, uint _datePublished, uint _stake) public returns(uint){
    totalArticles = totalArticles.add(1);
    allArticles[totalArticles] = articleInfo({contributor: _contributor, ipfsArticleHash: _ipfsArticleHash,
                                             ipfsReferenceHash: _ipfsReferenceHash, title: _title, datePublished: _datePublished,
                                            validator: address(0), challenged:false, removed: false, upVotes: 0, downVotes: 0, stake: _stake});
    emit ArticleAdded(totalArticles);
    return totalArticles;
  }

  // Define a function to return article contributor
  function getArticleContributor(uint articleNumber) public view returns (address _contributor){
    articleInfo storage article = allArticles[articleNumber];
    address articleContributor = article.contributor;
    return articleContributor;
  }

  // Define a function to return article title
  function getArticleTitle(uint articleNumber) public view returns (string memory title){
    articleInfo storage article = allArticles[articleNumber];
    string memory articleTitle = article.title;
    return articleTitle;
  }

  // Define a function to return article date published
  function getArticleDatePublished(uint articleNumber) public view returns (uint datePublished){
    articleInfo storage article = allArticles[articleNumber];
    uint articleDatePublished = article.datePublished;
    return articleDatePublished;
  }

  // Define a function to return article upvotes
  function getArticleUpvotes(uint articleNumber) public view returns (uint upVotes){
    articleInfo storage article = allArticles[articleNumber];
    uint articleUpvotes = article.upVotes;
    return articleUpvotes;
  }

  // Define a function to return article downvotes
  function getArticleDownvotes(uint articleNumber) public view returns (uint downVotes){
    articleInfo storage article = allArticles[articleNumber];
    uint articleDownvotes = article.downVotes;
    return articleDownvotes;
  }

  //Define a function to return number of articles
  function getNumberOfArticles() public view returns (uint noOfArticles) {
    return totalArticles;
  }

  //Define a function if article is challenged
  function isArticleChallenged(uint articleNumber) public view returns (bool isChallenged){
    return allArticles[articleNumber].challenged;
  }

  // Define a function 'challenged' that updates the challenged flag
  function challenged(uint articleNumber) public {
    allArticles[articleNumber].challenged = true;
    emit ArticleChallenged(totalArticles);
  }

  // Define a function 'removed' that updates the removed flag
  function removed(uint articleNumber) public {
    allArticles[articleNumber].removed = true;
    emit ArticleRemoved(totalArticles);
  }

  // Define a function 'upVoted' that updates the upVote count
  function upVoted(uint articleNumber) public {
    allArticles[articleNumber].upVotes = allArticles[articleNumber].upVotes.add(1);
    emit ArticleUpVoted(totalArticles);
  }

  // Define a function 'downVoted' that updates the upVote count
  function downVoted(uint articleNumber) public {
    allArticles[articleNumber].downVotes = allArticles[articleNumber].downVotes.add(1);
    emit ArticleDownVoted(totalArticles);
  }
}