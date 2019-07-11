# NewsLimited
extension to HumanityDAO

what is this ?

it's a extension to humanity dao to make it into a news curation dao 

how to use it ?

deploy humanity contracts 
pass address of registry in newslimited contract and newslimited contract address in foxcoin.sol

how does it works ?
well trusted journalists sign-up with humanity dao with their twitter accounts
they are then voted in or out on basis of consensus of dao.
overall this makes this dao a trusted dao composed of reputed journalists.
now when journalists tweet they select if it's a
normal tweet or rumor and pass it as string to news limited 
contract emits event of web link which is shown on front end 
people reading the front end then decide if they want to support the news creator or not 
they buy tokens on uniswap and send it to creator who gets this tokens plus more tokens minted.

this is very similar to support system of patreon but instead of levels it uses tokens 
news which get most supported are shown on top of page.

tokenomics 
//todo:write about two token models in depth,uniswap free news markets,token monetary policy etc.
 
why humanity native token is not used? 
well it could he but it will open up economics flaws in protocol 
a governance token should be separated from utility token
let's say if we use governance token to vote on articles and reward articles which win with more governance tokens
then there will be a point where this party will have majority of governance token supply and manipulate the whole DAO for personal gains.

why is upvotes/downvotes system not implemented ?
well currently all such Onchain systems are exploited 
for more details read about collusion,bihu system from vitalik blog

so upvotes downvotes won't be implemented? 
it will be and I m currently working on collusion resistant upvotes system 
//todo push collusion resistant upvotes system when it's ready.

//todo use encryption to only provide news to people who play for subscriptions.
//todo develop anonymous signalling protocol so dao journalists can propose news anonymously 

lot of work is yet to be done and can't be put forth in Span of few days.

couldn't we just use a TCR
because of this 
https://ethresear.ch/uploads/default/original/2X/f/f08841f6e60a40c7c3cb4c7f713f89a4df037ccf.png

//todo more to add here.

