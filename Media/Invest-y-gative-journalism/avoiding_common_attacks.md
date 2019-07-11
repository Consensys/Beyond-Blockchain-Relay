## Avoiding Common Attacks

The value that the Ethreum blockchain stores presents one of the greatest incentives for attackers. Aside from exploiting the current protocol and smart contract design for funds, attackers may also seek to carry out malicious behaviour in order to prevent/grief users from interacting with the blockchain. I have tried to account for:

- (1) Reentrancy attacks;
- (2) DoS with (Unexpected) revert; and
- (3) DoS with Block Gas Limit

I have done so by:

- (1) incorporating the openzeppelin-solidity library, specifically the Ownable contract.
- (2) I have also incorporated a circuit breaker into my main smart contract.
- (3) Additionally, I have ensured that my dApp does not store any significant value in its contracts by avoiding using payable functions. 
