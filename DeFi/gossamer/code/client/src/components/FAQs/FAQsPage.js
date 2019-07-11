import React from 'react';
import ExternalLinkIcon from '../widgets/ExternalLinkIcon';

const FAQsPage = props => <div>
      {props.renderNavbar('howto')}
        <div className="page-wrapper">
          <div className="copy-page-wrapper">
            <h1 className="title-text--bold"> Frequently Asked Questions </h1>
            <div className="copy-unit-wrapper">
              <p className="big-text--bold"> Why did you build this? </p>
              <p className="medium-text">
                Like many new technologies being introduced to the market (<a href="https://haseebq.com/3-models-for-understanding-the-ico-bubble/#iii-bubbles-and-technological-revolutions" target="_blank" rel="noopener noreferrer">exuberance over the early Internet causing the dot-com bubble, anyone?</a><ExternalLinkIcon width={12} height={12} />), blockchain had its moment in the sun before it was ready. But today, the technology is finally starting to realize the <strong>potential</strong> that always seemed years away.
              </p>
              <p className="medium-text">
                Right now, most experts agree that the industry smart contracts are most ready to revolutionize is <a href="https://www.forbes.com/sites/jeffkauflin/2019/04/26/why-everyone-in-crypto-is-talking-about-defi/#3c5abe09723f" target="_blank" rel="noopener noreferrer">finance and money.</a><ExternalLinkIcon width={12} height={12} /> Blockchain-based finance lets you earn interest on savings, borrow money, transact instantly across countries and buy digital representations of gold or U.S. stocks. With much lower fees, since you&apos;re cutting out the middleman - the banks.
              </p>
            </div>
            <div className="copy-unit-wrapper">
              <p className="big-text--bold"> What if there&apos;s a hack, or a flash crash? </p>
              <p className="medium-text">
              Now, obviously there are risks of the unknown in blockchain. The most tangible low-probability event that could affect your money is the case of an Ethereum flash crash, where prices drop so drastically that the money in this particular liquidity pool  (the gap between the big money the bank makes from lending out and the small amount the bank pays you) is one of the main reasons why banks last year made  <a href="https://www.bloomberg.com/news/articles/2019-02-21/banks-crushed-profit-record-with-237-billion-in-2018-fdic-says" target="_blank" rel="noopener noreferrer">record-setting profits</a><ExternalLinkIcon width={12} height={12} />. That&apos;s why we&apos;re going to <strong>cut them out ✂️</strong>.
              </p>
            </div>
            <div className="copy-unit-wrapper">
              <p className="big-text--bold"> When do I start earning money?</p>
              <p className="medium-text">
                You start earning your interest immediately upon depositing your money, and the algorithms
                calculate and add interest to your account every 15 seconds. As a cherry on top, all of the borrowers that are eventually receiving your money are extremely safe - they put up more collateral than the value of their loan, so there&apos;s no downside in the event of a default.
              </p>
              <p className="medium-text">
                The flexibility of the algorithms also lets you deposit and withdraw within seconds - imagine if a giant crypto market buying opportunity popped up and it took you a full day to withdraw! Some things are best left to computers 🤷‍.
              </p>
            </div>
            <div className="copy-unit-wrapper">
              <p className="big-text--bold">
                So algorithms are lending my money out - is there a chance that the loans don&apos;t get paid back?
              </p>
              <p className="medium-text">
                Crypto lending today is primarily driven by speculation. Because cryptocurrencies are so volatile, almost all crypto loans are over-collateralized. In general, they require collateral ratios of 150%+ to secure a loan, which provides some safe guards for lenders to manage counterparty risk. So a potential borrower would need to put up at least $15,000 worth of crypto (BTC, ETH, etc) as collateral to get a $10,000 loan.

                Brokerage margin lending is the closest real-world comparison, justifying current crypto rates of 8–10%. As more potential lenders get comfortable with the technical risks, the supply of lenders will start to outweigh the demand of borrowers and margins will eventually compress.
              </p>
              <p className="medium-text">
                The algorithms are going to take your deposits, and securely allocate your money to other borrowers within this economy, and managing multiple layers of built-in protections to make sure the system is healthy and secure. For every dollar borrowers want to borrow, they actually have to give more than a dollar (right now, an average is $3!) up as collateral.
              </p>
              <p className="medium-text">
                While you don&apos;t even have to worry about the human borrowers on the other side (the algorithm deals with the risk and pays you, no matter what) it should give you confidence in the system that it&apos;s almost impossible for borrowers to not pay back their loans.

              </p>

              <p className="medium-text">More reading <a href="https://medium.com/wave-financial/crypto-lending-too-good-to-be-true-fc010e7fc86c">here</a></p>
            </div>
            <div className="copy-unit-wrapper">
              <p className="big-text--bold"> What are you doing with our money to earn interest? </p>
              <p className="medium-text">
              With our help, you&apos;re going to lend out your money on the Ethereum blockchain to a series of smart contracts. These smart contracts trustlessly and safely put lenders&apos; (you!) money with borrowers&apos; loan requests into a big pool of money.

              o that other people can borrow it. You&apos;re not actually lending to individual people, though - while there are lots of companies that do this today in the traditional financial world (Lending Club, Prosper, OnDeck) - there are some clear downsides when you apply that to crypto.
                1. It takes days for your loans to match to borrowers for you to start earning money
                2. There are often annoyingly long fixed loan terms (60-90 days) that keep you from withdrawing during that period (miss the next market boom)
                3. If the one or two people you matched with default on your loan, you&apos;re screwed.
               </p>
            </div>
            <div className="copy-unit-wrapper">
              <p className="big-text--bold" id="fees"> Do you charge fees? </p>
              <p className="medium-text">
                To pay for the costs of sending transactions and deploying contracts on your behalf, we do charge a small fee on your earnings. It ends up being a fraction of 1% of your deposit, or 9.5% of the new money you earn from your deposit (not your deposit itself).
              </p>
              <p className="medium-text">
                We&apos;re not doing this for the money - as developers, we would need to more than 50x the amount of deposits we currently manage to make barely over $30k in revenues, which wouldn&apos;t even pay rent.
              </p>
            </div>
            <div className="copy-unit-wrapper">
              <p className="big-text--bold"> Where I can I learn more about blockchain and finance? </p>
              <p className="medium-text"> Learn more <a href="https://tokeneconomy.co/mapping-the-decentralized-financial-system-7c5af65e0335">here</a>, <a href="https://www.visualcapitalist.com/decentralized-finance">here</a> </p>
            </div>
          </div>

        </div>

      </div>;

export default FAQsPage;
