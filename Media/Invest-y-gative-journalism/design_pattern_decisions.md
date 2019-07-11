## Design Pattern Decisions

This dApp aspires to true decentralization by design.

It does so by moving away from centralized server platforms and using the InterPlanetary File System's peer-to-peer network to serve its files and the Ethereum blockchain to serve proofs that the data exists.

There are no payable functions in the contracts.

However, I have utilized openzeppelin-solidity ownable contract. As well, I have incorporated a circuitbreaker to ward against potential DOS attacks and re entry attacks.  
