# Idle - Get the best out of your lend, with just one token
Live demo on Mainnet [https://idle.finance](https://idle.finance)
This is a PoC for Gitcoin Beyond Blockchain Hackathon. (Use at your own risk)

We are tokeninzing the **best interest rate** across different lending protocols on the Ethereum money market.
This product allows investor to optimize profitability.
By buying and holding **IdleDAI** (an ERC20) tokens your underlying DAI position will be automatically rebalanced when the best rate changes to always give you the most profitable return.

Currently we are integrated with Compound V2 and Fulcrum and we are supporting DAI stablecoin as first asset.

## Decentralized rebalance
Every time a user interacts with the platform (mint or redeem idleTokens), there will being an **automated rebalance** of the whole pool, if needed.

If, for sometime, there are no interactions with the contract and users spot an higher rate than the Idle current tracked one, there will be an available action that allows users to rebalance the entire pool position In order to optimize their personal returns, users are encouraged to rebalance their own positions, rebalancing consequently also all the others.

We will also periodically rebalance Idle pool, if any interaction with the contract has not been done for long time.

It can be considered a sort of decentralized rebalance and uses the Adam Smith' invisible hand principle, which can be summarised as the unintended social benefits of an individual's self-interested actions. In this case, this will be the users willingness to earn the highest yield on the market.

## Edge cases

#### Interest Rate Slippage
During the rebalancing process, we are converting the entire pool from one protocol to another, potentially lowering the target interest rate, with the possible scenario where this rate falls below the previous one. We planned to implement a preventive check in order to get rid of this issue.

#### Failed iTokens Redeem

When redeeming IdleTokens, there is the possibility that Fulcrum' liquidity won't be enough. In that case user will be entiteled to redeem the remaining funds directly on Fulcrum contract.

## Next steps:

- Implement solutions for edge cases
- Other assets integrations
- Other lending protocols integrations
- Improve further UI/UX on boarding
- Direct fiat-to-crypto gateway

## Built with
- truffle-react
- web3-react (for Fortmatic, Metamask, Portis, Trezor and Ledger integration)
- rimble-ui
- Compound V2
- Fulcrum

## Made by

@bugduino
@samster91
@panteo92
@lucaguglielmi
