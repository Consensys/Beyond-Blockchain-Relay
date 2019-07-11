# Healthraise.io Product Design Documentation and Development Roadmap

## 1 | Description

![Alt text](./documentation/health.gif)

Ethereum Health Platform project.

See [submission Readme](./submission.md)

## 2 |  Value Appraisal

* Use case problem definition by industry and target user
* Industry insights (marketing and market research)
* Proof of market disruption (market research)
* Testimonial from industry Subject Matter Expert (SME) serving as an advisor
* Evidence blockchain adds value to this solution over centralized methods (market research and marketing)
* Marketing -- how solution affects widespread industry orthodoxies.
* Business Strategy -- How the solution can be rolled out broadly to impact the industry
* Dev/R&D -- Testing  description of experiments (experiment design)

All submissions, including all code, must be open source for future use and reference by the community, and links to external documents must be provided in the Github repo submission. (They want an article as the Readme).


## 3 | Market Research

Healthcare is a subject of privacy between patient and provider.
* "While some health records were compromised due to malicious activity, a large portion was due to unintentional disclosures by staff."

https://saylordotorg.github.io/text_social-problems-continuity-and-change/s16-04-problems-of-health-care-in-the.html


## 4 | Idea Formulation

### 4.1 Idea Generation

Personal constraint: I want there to be an existing economic factor. Much like freelancing as a subject has embedded economy to it, I'm looking for a part of healthcare that deals with money, not simply data tracking.

* Crowdfunding for health providers
* A rating system for users to rate healthcare providers
* An over-the-counter marketplace for pharmaceuticals
* Fundraising for patients who don't have healthcare on a specific problem
* Crowdfunding for healthcare providers that includes a rating system by patients

https://saylordotorg.github.io/text_social-problems-continuity-and-change/s16-04-problems-of-health-care-in-the.html

Crowdfunding platform:

### 4.2 Market Definition

For this idea, the target market contains the following characteristics:
* Values health, and is looking for a reliable provider given reviews
* Values giving, typically involved in philanthropy or would like to go into philanthropy
* Is in need of healthcare, probably an urgent problem, but lack healthcare and the funds to do so
* So on both spectrum, has a lot of money, or has very little money, or requires money for research, must be general in economic targeting to both extremes
* What both extremes have in common is their value of health


### 4.3 Features:

- Crowdfunding for health providers and research
- Rating system for those healthcare providers (simple like dislike ratio on blockchain, with reviews offchain)
- Crowdfunding for patients, patient profiles
- Crowdfunding pools made by groups of uninsured patients
- Votes will be stored on the blockchain and require gas as to mitigate artificial inflation of upvotes and downvotes, as authentic representation of consensus appraisal is important due to the severity of medical malpractice.

## 5 | Wireframes

### 5.1 Round 1

#### 5.1.1 Iteration

![Alt text](./documentation/Screenshot_2.jpg)
![Alt text](./documentation/Screenshot_3.jpg)
![Alt text](./documentation/Screenshot_6.jpg)
![Alt text](./documentation/Screenshot_7.jpg)
![Alt text](./documentation/Screenshot_8.jpg)
![Alt text](./documentation/Screenshot_9.jpg)
![Alt text](./documentation/Screenshot_10.jpg)

#### 5.1.2 Appraisal

These will be appraised by individual comments and by visual ranking.

![Alt text](./documentation/Screenshot_7.jpg)

Circular design for profile makes centering photo at the top of the page clean. May use a similar design to this in final profiles.

![Alt text](./documentation/Screenshot_8.jpg)

Possibly the best design for curation of profiles and fundraising goals.

![Alt text](./documentation/Screenshot_3.jpg)

Much better navigation style for querying the listed features. Grid option is off. Better of it were 2 columns well spaced, rather than cut in the bottom.  Interesting to put likes below profile photo. Also, interesting decision to make profile photo so large.

![Alt text](./documentation/Screenshot_9.jpg)

Circles for the grid design are more aesthetically pleasing, possibly due to whitespace. However, looks more like a directory rather than a funding site. Needs more description possibly.

![Alt text](./documentation/Screenshot_6.jpg)

Grid composition like this removes much needed information, oversimplifies each topic. Would prefer more detail.

![Alt text](./documentation/Screenshot_10.jpg)

Unknown what utility having an extra column for information would bring to these tiles.

![Alt text](./documentation/Screenshot_2.jpg)

First structure which was made. Traditional navigation. Boring composition. Header navigation does poorly for query options.


## 6 | Branding Inspiration



### 6.1 Characteristics

The target market values health. Health is associated with cleanliness. Cleanliness has the following aspects:
- Lack of clutter
- Brightness (things become shiny when clean) -- must include white as a color

Health has the following characteristics:
- Function - A healthy body functions properly, so must the website
- Speed - A healthy body can move freely, the website must load fast
- Appearance - a healthy appearance is an attractive appearance

### 6.2 Color Palette

https://digitalskratch.com/color-psychology/

Orange is associated with orange foods such as oranges, however, green is associated with nature and health. Blue has a calming effect and inspires trust--popular among hospitals, as patients are often in an acutely stressful state.

* https://colorhunt.co/palette/141219 * * *
* https://colorhunt.co/palette/147250
* https://colorhunt.co/palette/147574

# 7 | Roadmap

## 7.1 Minimal Viable Product

### 7.1.1 Frontend

- [x] Initiate a React App client
- [x] Add menu and content containers
- [x] Add tiles
  - [x] Have space for profile image
  - [x] Add likes, dislikes bar (crude)
  - [x] Have user title and description
- [x] Fill menu
  - [x] Create a product title, add it
  - [x] Create an unordered list, style
  - [x] Add login with metamask button
- [x] Authentication
  - [x] Prompts user for their public address
  - [x] Saves user address
  - [x] Checks if account has been created in the server
  - [x] Creates account if it doesn't exist on the server
  - [x] Returns account if it exists in the database and after it has been created, contains nonce
  - [x] Metamask signs nonce with a message, user confirms
  - [x] Sends signature with address to server for json web token
  - [x] Recieves json web token
  - [ ] Create restricted routes based on the json web token
- [ ] Handle Review Creation
  - [ ] Allows upvotes and down votes, saved to the Ethereum blockchain
  - [ ] Allows written reviews, saved to the server database
- [ ] Smart contract interaction
  - [ ] Connect frontend to smart contract
  - [ ] Queries accounts from the smart contract, displays based on search
  - [ ] Allow upvoting and downvoting through the smart Contract
  - [ ] Allow the sending of funds through the smart contract

### 7.1.2 Server

- [x] Initiate an Express Server
- [x] Authentication
  - [x] Add mongoose connection
  - [x] Create user schema
  - [x] Create route that handles authentication
  - [x] Read url parameters from users routes
  - [x] Query if an account exists
  - [x] Create an account in the database when prompted
  - [x] Recieve signature from the client
  - [x] Create a json web token if user signed properly, send to client
  - [ ] Create restricted routes requiring json web token
- [ ] Updating User Accounts
  - [ ] Restrict user account manipulation by json web token requirement
  - [ ] Allow changing of bio and name
- [ ] Reviews
  - [x] Create review schema
  - [ ] Have a route that handles creating new reviews
  - [ ] Have a route that handles reading reviews for display on the frontend

### 7.1.3 Smart Contract

- [x] Initiate contract stack
- [x] Create an account structure
- [x] Make an array of account structures
- [x] Be able to querry an account based on a public key
- [x] Enable upvotes and downvotes actions
- [x] Enable sponsorship action
  - [x] Transfers funds
  - [x] Adds account raised by increment of funds transfered
- [x] Emit events
  - [x] on funds transfered
  - [x] on account created


## 7.2 Advanced Features

### 7.2.1 Smart Contract

- [ ] Query all accounts found using dApp
- [ ] Enable making an account a business account (a verified Health Organization)
  - [ ] Perform action only until 2 forms of identification seen (requires centralized solution to mitigate fradualent accounts)
  - [ ] Once account is verified, mark as verified manually
  - [ ] Charge ETH for making an account an organization account (mitigates fradualent accounts)

### 7.2.2 Frontend

- [ ] Animations