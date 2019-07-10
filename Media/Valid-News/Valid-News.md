# Innovations to reshape the News Economy

The world has always suffered from false claims. Last decade the suffering has increased, whilst at the same time, the opportunity to debunk false claims is not only technologically closer – it is also widely requested by the public.

The mission of Valid.news is to create a better information-environment on the Web, including improving the ecosystem of news distribution. At this stage, we have proposals on implementable solutions.

Information shape our worldview, each as individuals. Journalists, commentators and everyone else making claims are rarely taking the responsibility needed to communicate what is closest to the truth.

The article that follows goes through these solutions. Much of this paper was written as a Submission to Consensys’ bounty of [Reinventing the Online News Economy](https://explorer.bounties.network/bounty/3164). 

# Preferably, read this at [Valid.news](http://valid.news)

This paper is best read at [Valid.news](http://valid.news), which offer functionality like tooltip-hovers as well as labeled and expandable headers & text-blocks.

For now, Valid.news is still a Work In Progress, but you can continue reading at Valid.news/news-ecosystem or continue reading this PDF (without all features mentioned below).


## Judging criteria notes

We are addressing several problems and as seen with this demo-site that took a week to create, we have the entrepreneurial drive to develop all the big solutions proposed in this document. As for the [judging criterias](https://github.com/ConsenSys/Beyond-Blockchain-Relay/blob/master/judging-criteria.md), here is a few comments:

This is a solution for generalities of Digital Information Environment. We anticipate testing our ideas through launchable products in 1) blogging platform 2a) news aggregator 2b) review platform 3) debate-protocol. The first measurable experiments will be on this launched product (Valid.news) to judge usage-frequency and survey users on their opinions of the new-UX elements.

For us would not make sense defining a target industry, user, and use case with consideration of how broad our innovations in the Digital Information Environment are.

Blockchain adds value in that 1) the claims-database considering immutability 2) reputation considering transparency and trusted tokenization. There are very few Industry Subject Matter Expert, but Ted Nelson, J.C.R. Licklider and other computer scientists from late 1900s has been talking a lot about the solutions we propose.

Research of Digital Information Environment has been thoroughly done. Ex.

Wikipedia Page Previews has A/B-tested since 2015 and officially launched July 2018.   

[ChangeAView.com](ChangeAView.com) expanded from Reddit to with quote map functionality in March 2019.

The team is me, a serial-failing-entrepreneur, not seeing myself professionally as anything else than an Entrepreneur since 6 years old. You can see my CV on [LinkedIn](https://www.linkedin.com/in/allberg/).

No Code? No Problem. Love to hear that. I hope this paper showcase the real problems and that solutions are easy-to-develop and that Valid.news and others can get it out in the world. To develop this, I’d love to join as Product Visionary of Valid.news/Yourtopia.com on Tachyon III.

Within 6-12 months we will have launched much new UX features and we move away much traffic from Medium.com and news publishers to a more modern, truthful and social blogging platform.

Now, to the paper.


##  Quick Answers to Consensys questions 
For further description of the different features see the Solutions section below 

*   How might we create trust in media through _transparency_ in information and media systems? **Examples:**
    *   giving credit to original sources?
        *   Expandable UX
            *   Showing source, exact TextSelection, interpretation
        *   Aggregator/platform subscription business model 
    *   incentivizing fact-checking and quality?
        *   Expandable UX
            *   As above: Showing source, exact TextSelection, interpretation
            *   User can dig deeper into reasoning behind claims
            *   Clicking on link to go to another webpage is lots of effort. If the referenced article could just “pop up” in an “Iframe” it would be seamless. Especially if author highlighted the specific text they quoted from the other article. 
        *   Social UX
            *   Users can comment on claims. Highly debated claims get flagged. Real-identity & reputation to solve spam.
    *   building a curative reputation?
        *   Trust-graph
            *   I trust specific readers in specific topics, and the journalists they trust
        *   Social UX
            *   Journalists regularly flagged for providing false flags get lower reputation
    *   verifiable credentialing from sources?
        *   3<sup>rd</sup>-party quote ecosystem
            *   Users can flag if not exact quote. This lowers reputation of journal.
    *   developing a media/information supply chain?
        *   Aggregator/platform subscription business model <span style="text-decoration:underline;">Read more</span>
            *   (á Medium.com) with revenue-share. Governed by all stakeholders in supply-chain for setting fair rates.  \
Difficulty-to-implement: 8.
        *   Trust-graph
            *   Across reference-ecosystem, so trust between journalists, investigative journalists, researchers. As well with readers & peers.
*   How might we _incentivize_ sharing and support of “quality” content? **Examples**: 
    *   defining “quality” content in media
        *   Trust-graph
    *   rewarding sharing of wholly read content instead of click-bait sharing
        *   Most impact is regulation. Social media above >10M UVPM need to have this metrics in their algorithm.
        *   Other, minor solutions
            *   Browser-plugin \
Send data to social media sites
            *   Claim-protocol \
Rewrite clickbaits to accurate headlines
    *   developing “sharing” reputation and incentivizing accordingly
        *   Trust-graph
    *   incentivizing reading and commenting on work outside the realm of your political environment
        *   Trust-graph (a complex one)
        *   Expandable UX (to understand reasoning, vocabulary etc.)
        *   Social UX (to enable all sides to comment on everything)
*   How might we track and share _identity_ of an organization, including makeup, motivations, stakeholders, etc, such that a true, robust _reputation_ can emerge over time? **Examples:**
    *   sharing the “source code” of a major news organization
        *   Aggregator/platform-subscription business model  \
In order to get higher revenue share need to be transparent
    *   providing “nutrition facts” on the newsroom
        *   Trust-graph
    *   showing how a powerful owner/company stakeholder influences (or doesn’t) the news
        *   Trust-graph \
How high is the collective trust that the owner/stakeholder isn’t influencing news?

# The problem


## Everyone knows the problem

But fake news isn’t new. It’s just its influence has scaled – much larger than the scaling on prevention/solutions. At this point the Web3 Foundation, Yuval Noah Harari, the average Joe understand the problem. And so now is the time for humans to provide a solution. One solution is agreeing on the logical support and relevance of claims/narratives/information.


## Few accurately map out sub-problems

Because it’s difficult. The sub-problems are interconnected. Keeping your “brain-cache” fully focused on the ecosystem of human knowledge is an energy-consuming task few humans spend large sums of their biological resources on. Neither do I. But I spend a part of my resources on it. And that’s helped me to at least partly map out the sub-problems.


## My briefing of sub-problems

Incentives, Sensationalism, Regulatory and more


### Incentives. Difficult terrain of reputation. (Content)

Incentives of publishers to adopt sensationalism.

Reputation has potential to hold journalists accountable across web.

Creating reputation suffer from 1) difficulty of agreeing on opinions 2) anti-fraud (bots, interest groups).

Ensuring reputation-usage is difficult as web-content are managed by webpage owner, rarely enhanced by 3rd parties (ex. a browser-plugin or web-content from a semantic-web).


### **Regulatory tumult. Difficult terrain of truth. (Understanding)**

Regulate news-spreading (Facebook, Google News, Twitter, Reddit etc.) – What can you instruct them if you don’t even know what is fake news?

Regulate news-publishing. Again: what is fake news? Do you regulate to block a certain Agent (journalist / publisher)? Do you block topics? Do you block opinions? Free speech?

True news. Nobody (excluding Christian alt-right) use that [term](https://www.google.com/search?q=true+news). Because truth is complex. Most (or all) narratives and claims are highly context-specific. In order to make as truthful statement as possible, one would have to be highly specific in the context that claim is relevant or specific. Even the most verifiable claim “I exist” is subject to the context it is said in. So – true news isn’t the solution.


### **Solution: Consensus on most-true narrative per context**

Not only debunking false news. Narratives shape a large part of human experience & civilization. Personal development & group politics. How to be, how to collaborate among nations. Whether open world should ban Huawei, what workout exercises to do. Whether climate change is human-made, whether to marry your partner. Narratives shape us. An innovation in finding the most-true narrative per context has the ability to increase human well-being tremendously. But it also has the ability to re-shape geopolitics, local politics, business strategy, science, psychology, institutions, you name it. 


### **Large stakes: Everyone has a stake in narratives**

Each human individual has a huge set (millions) of world beliefs. Many we hold tight. Many we are open-minded on. Narrative-debate-innovation will affect everyone. There will be large resistance, in part because it is new, but also out of rational fear that it can be very dangerous. The world is great the way it is today. New innovations may prove to be net negative. We don’t want to prosper those innovations. Narrative-innovations might prove dangerous. There is also danger in not fighting fake news, geopolitical narrative manipulation (Chinese State Media propaganda going global) and not debunking extremist beliefs.


# **Solutions**

We have UX inventions to make the whole web social, what we call “the social web”.

On top of that, we have inventions for determining truthfulness percentage in a particular context, what we refer to as “claims protocol”.

These two inventions combined (social web + agree on truth) could algorithmically amplify definitionincrease visibility of of the most truthful data points, narratives, and thereby news stories.


## **UX**


### **Social Web**

Connecting every website and its content to a social graph


#### **Expandable**

The expandable functionality (as in this article) has ability to re-shape the web. It is very basic, the user can choose to hide/show content. With the right usage, it can communicate difficult topics to readers of all types, but also it can help structure a social web. It can for example insert comments in the middle of the text, right where they belong. The UX can be used for Definitions, Further explanations, References, 3rd-party content (comments, opinion, vocabulary definitions, news articles, claims etc.) and much more.

For now, all this content in by a single content-creator (me), but in the future, there can be a voting (governance) process of what content to present.

Expand-functionality is surprisingly under-utilized in the whole Web 2. Honestly, except for the classic “Read more” – I haven’t seen any other website utilizing this functionality. Reasons for under-utilization

Might be simply not seeing potential. Might be lack of design-thinking (now altho, its just copy & paste the design from this website). Also, a network-effect as no one else uses it, it hasn’t spread yet.

Use case: any publication of digital text. 

Ideal use case: If regularly used for all claims’ reasoning, definitions, references, comments.Design notes

Design: a simple [+] button, possibly accompanied by a label of collapsed text. Inline, or open new section.

In-line: expand collapsed content on the same line. Move pre-existing content further in on the paragraph (to the right or next line).

Section: a full-width button with a down-arrow. If hover button: in the same spot as down-arrow (which fades away) text appear saying “expand”. If clicked, section expands. Sticky bottom with an up-arrow, if hover says “collapse”.

Use case: Expandable/collapse content is a good way to make a difficult topic quick-to-read for those fully understanding all concepts, and offer deep-dives for those who need further explanation, or deep-dives for those further interest in the concepts, the underlying reasoning or provided facts. Beyond this, it is also a pillar-stone of the UX components of the social web.


#### **Quote Map**

A core part of the social web. Essentially the UX of the Agreeable Knowledge Graph (discussed LINK TO expand AKG later) without the required voting-mechanism of determining truth.


##### **Features**


###### **Multi-quote**

Multi-quote like classic vBulletin-forums. Surprisingly it didn’t survive the last evolutional period of the web. Basically, it is the ability to quote several text-selections of one or several posts.

This should be possible on Medium.com (but it isn’t). Same with Facebook, Twitter, Reddit (but it isn’t).

This functionality makes it easier to keep the collective conversation aligned.


###### **Quote-Rephrasing**

The person quoting can rephrase the quoted text to do argumenting-features like summarize (make it shorter), simplify (less difficult words), clarify (leave further comments) etc.

With expandable functionality, it will be easy to see original quote.

In its early versions rephrasing won’t be moderated. Moderation in future versions Later, through distributed moderator-power definitionforums today only have usually only have a few types of roles, ex. admin, moderator and user. Distributed moderator-power would bridge the gap so everyone get a little bit of admin & moderator power, through tokenization of such power that get distributed to users following a certain scheme Example scheme for power distribution Could be ex. through combining context-specific voting and a trust-graph (more trusted get more votes. Voting is done in a specific context to avoid authority bias). 


###### **Labeling text**

After the user select a text-snippet, they can label it. Labels are similar to a quote but with preset labels the user can choose from. Ex. labels can be “key point”, “story”, “reasoning”, “example”, “personal”. These labels will then show up in the text to future users, and content can become collapsed definitionHidden and shown if the user click a + button.


#### **Embed articles (internal/external)**

Author can show highlighted text from other article, on a specific line. With QuoteMap they can also seamlessly display their comment next to the selected text.

If the user wish to “read” more of the embeded article, there are buttons for show-more above/below, alternatively through Scroll, expand-buttons or external link.

This makes it easier for authors to reference others, with use cases such as debate articles (pointing out others being wrong).


### **Reading experience**

If many people comment on a text-section you as a new reader will be notified of the sentiment (ex. many people pointing out that there are false claim(s) in that text-section)


#### **Group-sentiment reading**

If many people comment on a text-section you as a new reader will be notified of the sentiment (ex. many people pointing out that there are false claim(s) in that text-section)


#### **Interactive reading**

Like active listening if you’re familiar with that concept? (Answers: yes/no)

Easy annotation of what you read (easily add notes/comments to any text selection(s) (note the plural mean you can select multiple text blocks and give 1 comment to all, ex. how these different text blocks relate).

Save TextBlocks as bookmarks (ex. things you want to read later/read again/comment on later)


#### **Modern UX**

Split-view reading like Visual Studio Code split-view that enable you to have

* same Article opened in 2 windows, scrolling on one whilst sticky on one

* links from an Article open in a split-view, so you keep the original reading closeby and can easily relate to where the link came from

3rd-party quoting ecosystem

Rephrasing/summarizing quote(s) from other article(s)

An Author can rephrase/summarize/analyze quote(s) from article(s), (whether on Valid.news or anywhere on web) (made possibly through quoting TextSelection(s) and a new author having their say on meaning etc.)

Section-linking

Author can from their article link to TextSelection(s) of 3rd-party-content. With the process described above, they can also attach their summary/analysis/rephrasing of the selected text.


#### **Concept navigation**

Concept-map if existing for that concept. Like a written description of the concept, but rather showing all of its relations to other concepts, with the ability for the user to click and dive deeper into any relation or other concept. Search-results showing all paragraphs where the searched term was mentioned. UX for seamless “show more” above and below, and also classic link for “show full article”.).


#### **Reading-list from a ToC**

In the Table of Content, next to each Header-link is ex. a “book-icon” that adds the content to the user’s reading-list. In the sidebar, the reading-list shows up as a new “personalized ToC” and the content in the article that’s on the reading-list will be in be normal font-color (ex. black) whilst else get less attention (ex. light gray).


## **Claims Protocol**


### **Argument Map**

Dependent on Quote Map. The debate design of 3rd-party quoting ecosystem can hold Authors more accountable for the claims they make (whether its Twitter/Reddit users, journalists or politicians). 


### **Trust-graph**

In essence metrics across people of trust in specific topics. Ex. ’Person 1’ trust ‘Person 2’ in ‘Topic A’ on scale ‘9’ with certainty ‘7’. Lots of design decisions. “I trust you. Especially on these topics. If you trust this article, I trust it to the same extent that I trust you.” With a social-graph of thousands of online-intellectuals adopting this (spread through Twitter, Reddit etc) + a UX for each Reviewer to give their reason why they trust an article + verified Real Identity (1-person-1-account to avoid spam from interest groups), a trust-graph can take prove to be a way of scoring credible news and quickly reach scale throughout the whole open Internet (excl. authoritarian Internet, for now).


#### **Reputation is already around us**

Reputation is so present in every-day life. We judge people by body language, clothes and else to ensure a great environment for ourselves. On the Internet, we form opinions of others through their writing style, their “digital social status” (mainly popularity (likes, followers etc.). On certain forums people get economical reputation metrics such as Reddit Karma. In a sense, we are already in real-life, and in web2 using reputation. The resistance to implementing more thoroughly on the web won’t be as strong as fight for the benefits. Combating fake news is tricky without reputation. Combating spam-email is tricky without e-mail reputation (something Internet’s e-mail protocol (IMAP) already contains, without the public being aware that their personal e-mail addresses already got a reputation).


#### **Journalists**

Elevator pitch: “Like Trustpilot for Journalists”. Problem is that Trustpilot/Google Reviews/Amazon Reviews and all other major review-services are 1) too easy gameable and 2) non-objective, but based on the incentive of who can collect most positive reviews, not based on who provide best service (ex. most truthful news).


#### **Solving the problems**


##### **1) too easy gameable**

First off, stop fake accounts. At first (before objectivity), start with 1-person-1-vote. Not 1 person > vote if you want / 1 person setup a bot net. The software design should desirably require people to leave reviews on the news they read. Possible in various ways, ex. if it’s a news aggregator people love 10x to competition, or if it there’s a shared protocol people can input data to. 


##### **2) be objective**

-“This journalist is great”, -“I love this article”. Not very constructive – but does it really matter? Are quotes like this any better: -“Very thoughtfully written”, -“I can tell you been doing your research”. How do we understand if the underlying value is good, rather than that it’s just that the Author is good at collecting positive reviews, just like the incentives of today for major online reviews platforms? We need to re-think the whole system. One alternative is that you choose who you trust and the articles they trust will be shown as trustable to you.


##### **Risks**

With high risks if being implemented and thereby also risky to be debating the topic (ecosystem of blackball innovations), one solution we should be cautious to discuss, as it could further divide our societies, but could also be a solution to trustworthy news, is a trust-graph. 

But be aware, reputation of articles, and thereby journalists will (if implemented wrongly) be set by mass-opinions. And as we’ve seen, mass-opinions has a fallacy of being short-sighted and easily manipulated (as seen in Italy, Hungary, USA, Brazil etc.). Top-down approach are just as dangerous (as seen in Mao 1.0 (China’s currently in Mao 2.0), USSR, Uighur, China’s mainland money-hunger etc.). In my opinion, the ideal approach of a trust-graph is an idea meritocracy – but that is hard to implement until we can get closer to defining the highly-complex objective reality.[/expandsub4] 


### **Knowledge Graph**

In front of you: all human knowledge. Accessible today through your smart phone or desktop. Yet so underutilized. Next generation of information technology will make sense of all human knowledge (as the wishes of the Internet was in the 90s). We’ll soon be able to determine what’s the conditions for something to % true – and with that, map what is % true to the context we live in (each as individuals, different societies, world views etc).

Collective Knowledge Graph = Endless Concept Maps + (Reputation + Tokenomics)


#### **Endless concept-maps**

Imagine all information the world knows in one mind-map. Basically, that’s the idea behind an endless concept map. What constraints is that everything is interconnected, but the connections are different in strength, and so only the strongest may become part of the mindmap, determined by a process sense-making.


##### Introduction

One way of achieving highly-truthful knowledge sharing is through mapping how information relates. The system can be described as an endless concept map, describing each concept and how its core building blocks are amended in a particular context, whereas each context also is defined as a concept. Overlays of concepts become intertwingled, to an endless extent (to the extent of what is computationally possible).

**Introduction:** One way of achieving highly-truthful knowledge sharing is through mapping how information relates. The system can be described as an endless concept map, describing each concept and how its core building blocks are amended in a particular context, whereas each context also is defined as a concept. Overlays of concepts become intertwingled, to an endless extent (to the extent of what is computationally possible). Endless concept-maps can work as a truth-storage format. Individual Agents (human individual, companies, nations, interest groups) can form their own maps. Collaborative maps form as another Agent comment/propose edit/interfere/ on another concept map. A consensus-making process combining the map-content and Agent reputation (and possibly tokenomics) can then resolve the map-content.

**Technical:** Knowledge is stored as a relation/pattern/line, that are connected to multiple nodes, with conditions on each node. The relation is the “final knowledge pattern”. The pattern-length is limited considering conditions can be endless, so it needs to be cut off to be relevant. There will be trillions of knowledge-relations. When mapping all relations (or the highest amount which is computationally possible) together to a single question, clear commonalities amongst the relations will show, and be used for understanding the answer to the question. 

**Example:** Ex. relations: “an elephant is blue” “an elephant is blue if alive and healthy” “an elephants color can change if it dies or get sick” “elephants that change color due to sickness is rare”. “rare mean low probability”. Ex. question: what is color of elephant? Ex. answer: “unless elephant is sick or dead, the color is likely blue”. 

**Comments:** Now, how do you create the relations? The claims basically. As an individual that has no fact-checking it is just create them on your own. But as a collective? Actually, it can be as simple as adding a relation to the system “I don’t believe in your claim, because of X Y Z”. Another person can then say “I believe in X Y Z and therefore this claim”. Rather than making the system 1-person-1-vote, a trust-graph, where peers give reputation to others based on the other agent’s 1) ability to create a prosperous world and 2) trust in that they are truthful. The trust-graph data can be used in the calculation of claim-merging, to likely give more truthful answers. Those who don’t trust the trust-graph can opt-out of including it in the calculation. Obviously, this is a completely new technology – one which doesn’t yet exist, unsure if its possible to develop – and if it is possible would have major implications of society. So while this might provide great benefits in the future, lets focus on the short-term solutions.


##### **Consensus-making Individual (without reputation)**

We often have conflicting views as an individual. How do we make a rational decision? To even make the slightest decision in a truly rational way requires enormous computation – something we’ve never done – and hopefully won’t for another few centuries (speed = dangerous)). To more effectively than human brain-processing resolve conflicting views, we can use an endless concept-map to map up the territory. We can then not only compare two different choices, but we can navigate the whole territory to get a navigation-path in the territory (ex. what is reversable & what has high impact and what time-frames are relevant to what) and use that territory in our final personal decision-making.


#### **Utilizing the claims**

Any user can point out false claim, anywhere on the web. The assumption is that everyone is speaking truth, until one argues otherwise and then that claim is assumed to be false claims until proven otherwise. Objectivity among investigators are of high importance to not create further polarization. Investigators should have agency to act, but remember that human knowledge of today are very far away from defining objective reality. What we can do quite efficiently however is to define most-truthful-claims in a certain context according to all presented knowledge. The investigators should be able to make statements as such. “Ex. if there are no aliens on planet earth now, the likelihood of there existing a global secret-society world order are very low”. There are certain contexts here, ex {time:now}, {alien_existing: no} and if so {secret-society: low probability}.


##### **Demand publishers to edit their content**

Requesting Publishers/Journalist to edit their article is a voting process on the protocol. Claim-protocol is about pointing out false-claims. The remarks goes into debate. If a claim in a certain publication is mapped as “necessary to edit” – all publishers of this claim are informed and if not changing their text, their reputation (as journalists, as editors, as publishers) are lowered. Trust protocol is about pointing out false-claims. This then goes into a debate. If a claim in a certain publication is mapped as “necessary to edit” – all publishers of this claim are informed and if not changing their text, their reputation (as journalists, as editors, as publishers) are lowered. Likely times when this might happen 1) the presentation of claim in this publication has high visibility 2) the claim has been mapped as mispresenting reality 2a) the claim is referencing false data/quote 2b) wrong interpretation of original meaning. This can be for text anywhere on the publication, whether it’s the title, the introduction or anywhere in the article.


##### **Discussion of claims**

Starts as soon as somebody enters it into the claims-protocol. Sub claims are logical reasoning, with links to references and arguments are also weighted by the Reputation from debaters. The claim inherits metrics from the sub-claims, and if a time-sensitive action needs to be done (ex. inform a journalist to correct themselves) such is pointed out in the system (ex. urgency to debate the claim). 

UX could be simple argument-maps such as on [DebateGraph.org](DebateGraph.org) but with modifications: metrics attached from Users to Claims – so slightly more complicated as these also get derived upwards. Sub-claims are transferable across Claims (to create further relations across Claims) to streamline Claim-debates in future.


##### **User reputation**

Real Identity of each Debater. A prioritization system for investigators to focus on those who often are correct in pointing out false claims and those who’re spamming are less prioritized. Thereby necessary for reputation of each user.
