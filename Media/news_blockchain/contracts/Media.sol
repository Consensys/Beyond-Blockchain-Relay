pragma solidity ^0.5.0;

contract Media {

    struct News{
        uint id;
        address user;
        uint upVotes;
        uint downVotes;
        string url;
        string title;
        string description;
        Fact[] facts;
    }

    struct Fact{
        uint id;
        address user;
        uint upVotes;
        uint downVotes;
        string text;
    }

    enum VoteType{notVoted, upVote, downVote}

    struct NewsVotes{
        mapping(uint => VoteType) newsVote;
    }

    mapping(address => NewsVotes) private newsVotesMapping;

    struct NewsFactVotes{
        mapping(uint => VoteType) newsFactVote;
    }

    mapping(address =>  mapping(uint => NewsFactVotes)) private newsFactVotesMapping;

    News[] private news;

    function addNews(string memory url, string memory title, string memory description) public {
        news.length++;
        News storage n = news[news.length - 1];
        n.id = news.length - 1;
        n.user = msg.sender;
        n.upVotes = 0;
        n.downVotes = 0;
        n.url = url;
        n.title = title;
        n.description = description;

    }

    function addNewsFact(uint newsId, string memory text) public {
        Fact[] storage facts = news[newsId].facts;
        facts.push(Fact({id: facts.length, user: msg.sender, upVotes:0, downVotes:0, text:text}));
    }

    modifier notVotedNews(uint newsId) {
        require(newsVotesMapping[msg.sender].newsVote[newsId] != VoteType.upVote && newsVotesMapping[msg.sender].newsVote[newsId] != VoteType.downVote);
        _;
    }

    modifier notVotedNewsFact(uint newsId, uint factId) {
        require(newsFactVotesMapping[msg.sender][newsId].newsFactVote[factId] != VoteType.upVote && newsFactVotesMapping[msg.sender][newsId].newsFactVote[factId] != VoteType.downVote);
        _;
    }

    function upVoteNews(uint newsId) notVotedNews(newsId) public {
        news[newsId].upVotes ++;
        newsVotesMapping[msg.sender].newsVote[newsId] = VoteType.upVote;
    }

    function downVoteNews(uint newsId) notVotedNews(newsId) public {
        news[newsId].downVotes ++;
        newsVotesMapping[msg.sender].newsVote[newsId] = VoteType.downVote;
    }

    function upVoteNewsFact(uint newsId, uint factId) notVotedNewsFact(newsId, factId) public {
        news[newsId].facts[factId].upVotes ++;
        newsFactVotesMapping[msg.sender][newsId].newsFactVote[factId] = VoteType.upVote;
    }

    function downVoteNewsFact(uint newsId, uint factId) notVotedNewsFact(newsId, factId) public {
        news[newsId].facts[factId].downVotes ++;
        newsFactVotesMapping[msg.sender][newsId].newsFactVote[factId] = VoteType.downVote;
    }

    function getNews(uint newsId) public view returns(uint, uint, uint, string memory, string memory, string memory) {
       News storage n = news[newsId];
       return (n.id, n.upVotes, n.downVotes, n.url, n.title, n.description);
    }

    function getNewsCount() public view returns(uint){
        return news.length;
    }

    function getNewsFactCount(uint newsID) public view returns(uint){
        return news[newsID].facts.length;
    }

    function getNewsFact(uint newsId, uint factId) public view returns(uint, uint, uint, string memory) {
       Fact storage fact = news[newsId].facts[factId];
       return (fact.id, fact.upVotes, fact.downVotes, fact.text);
    }

}