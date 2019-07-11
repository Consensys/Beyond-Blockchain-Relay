pragma solidity ^0.5.8;

import { CErc20, CToken, ReentrancyGuard } from "./CERC20.sol";
import { ERC20Interface } from "./ERC20.sol";
import "./SafeMath.sol";


/// @title Lender Contract Wallet
/// @author Tarik Bellamine & Kevin Kim
/// @notice The contract is intended to be used as a user contract wallet that will allow users to easily interact with Compound's money
/// market contracts through the Lender UI

contract LenderContractWallet is ReentrancyGuard {
  using SafeMath for uint256;

  address public userAddress;
  address public feeHoldingAddress;
  mapping(address => bool) public adminAddresses;
  mapping(address => uint256) public principalSupplied;

  /// @notice The constructor's purpose is to define the user address that will receive funds when the withdrawl function is called as
  /// well as specifiying the admin accounts that have permission to call this contract's functions on the user's behalf, all done here
  /// so it is immutible from the point of contract creation
  /// @param _userAddress The user's wallet address
  /// @param _adminAddress1 The Lender admin wallet that will receive user fees and can call this contract's functions
  /// @param _adminAddress2 The Lender admim wallet that can call this contract's functions. All other admin addresses are identical to this
  constructor(address _userAddress, address _adminAddress1, address _adminAddress2, address _adminAddress3, address _adminAddress4) public {
    userAddress = _userAddress;
    feeHoldingAddress = _adminAddress1;
    adminAddresses[_adminAddress1] = true;
    adminAddresses[_adminAddress2] = true;
    adminAddresses[_adminAddress3] = true;
    adminAddresses[_adminAddress4] = true;
  }

  /// @notice Modifier that restricts the ability to call functions to just the user and admin addresses
  modifier onlyUserAndAdmins() {
    require(
      (adminAddresses[msg.sender] || userAddress == msg.sender),
      "Only admin or user can access this contract's functions."
    );
    _;
  }

/// -------------- Approve --------------- ///

  /// @notice Approves the token contract to send a large amount of tokens to the cToken contract
  /// @param _tokenAddress The token contract addressthat will initiate the transfer
  /// @param _cTokenAddress The Compound cToken contract address that will receive the tokens transferred
  function approveCTokenContract(address _tokenAddress, address _cTokenAddress) public onlyUserAndAdmins {
    ERC20Interface _Token = ERC20Interface(_tokenAddress);
    _Token.approve(_cTokenAddress,  -1);
  }

/// -------------- Supply --------------- ///

  /// @notice Updates the principalSupplied mapping in state that contains the user's balance of the various assets they have supplied
  /// @param _tokenAddress The token contract's address thats balance will be incremented or decremented
  /// @param _Token The token interface corresponding to the previous param
  /// @param _increment Whether the user's token balance should be incremented (true) or decremented (false)
  /// @param _interestEarnedOnWithdrawalAmount The amount of interest that the user has earned through lending, which needs to be subtracted from
  /// the total balance that is being withdrawn to ensure only principal is getting tracked (i.e., totalBalance = principal + interest)
  function updatePrincipalSupplied(address _tokenAddress, ERC20Interface _Token, bool _increment, uint256 _interestEarnedOnWithdrawalAmount) private {
    if (_increment) {
      principalSupplied[_tokenAddress] = principalSupplied[_tokenAddress].add(_Token.balanceOf(address(this)));
    } else {
      principalSupplied[_tokenAddress] = principalSupplied[_tokenAddress].sub(_Token.balanceOf(address(this)).sub(_interestEarnedOnWithdrawalAmount));
    }
  }

  /// @notice Supplies the entirety of this contract's token balance to Compound's money market contracts and adds the amount supplied to
  /// the princapalHolder in state
  /// @param _tokenAddress The address of the token this contract has and wants to supply
  /// @param _cTokenAddress The address of the Compound cToken contract that will receive the tokens transferred
  function supplyToMoneyMarket(address _tokenAddress, address _cTokenAddress) public onlyUserAndAdmins nonReentrant {
    ERC20Interface _Token = ERC20Interface(_tokenAddress);
    CErc20 _CToken = CErc20(_cTokenAddress);
    require(_Token.balanceOf(address(this)) > 0, "There are currently no tokens to supply");
    updatePrincipalSupplied(_tokenAddress, _Token, true, 0);
    require(_CToken.mint(_Token.balanceOf(address(this))) == 0, "Error supplying tokens to Compound");
    assert(_Token.balanceOf(address(this)) == 0 && _CToken.balanceOf(address(this)) > 0);
  }

/// -------------- Withdraw --------------- ///

  /// @notice Calculates the proportion of total interest that is being withdrawn. The equaton in layman terms is:
  /// interestEarnedOnWithdrawal = currentBalance - (principal * (cTokensBeingWithdrawn / totalCTokens))
  /// @param _tokenAddress The address of the token being withdrawn
  /// @param _Token The token interface corresponding to the previous param
  /// @param _cTokensRequested The amount of cTokens the user would like to withdraw
  /// @param _cTokensRequested The amount of cTokens this smart contract has
  /// @return The amount of cTokens that is proportional interest earned on the amount being withdrawn
  function calculateInterestOnAmountWithdrawn(address _tokenAddress, ERC20Interface _Token, uint _cTokensRequested, uint _totalCTokens) private view returns (uint256) {
    uint256 currentBalance = _Token.balanceOf(address(this));
    uint256 proportionOfBalance = _cTokensRequested.mul(principalSupplied[_tokenAddress]).div(_totalCTokens);
    /// Need this check for rounding errors that can arrise with low decimal tokens (e.g., USDC)
    if (proportionOfBalance > currentBalance) {
      return 0;
    }
    return currentBalance.sub(proportionOfBalance);
  }

  /// @notice Withdraws a specified amount from Compound's money market contracts to this contract, subtracts the amount of principal being withdrawn
  /// from the principal holder in state, transfers 9.5% of interest earned fee to the Lender admin wallet, then transfers the user the remaining contract balance
  /// @param _tokenAddress The address of the token the user is requesting
  /// @param _cTokenAddress The cToken contract address corresponding to the requested token
  /// @param _cTokensRequested The requested amount to withdraw from the money market denominated in cTokens
  function withdrawFromMoneyMarket(address _tokenAddress, address _cTokenAddress, uint256 _cTokensRequested) public onlyUserAndAdmins nonReentrant {
    ERC20Interface _Token = ERC20Interface(_tokenAddress);
    CErc20 _CToken = CErc20(_cTokenAddress);

    require(_CToken.balanceOf(address(this)) > 0, "There are currently no tokens to withdraw");
    require(_cTokensRequested > 0, "Must withdraw more than 0 tokens");

    uint256 _totalCTokens = _CToken.balanceOf(address(this)); /// Need this for later because cToken balance of the contract changes after redeeming to underlying
    if (_cTokensRequested > _totalCTokens) {
      _cTokensRequested = _totalCTokens;
    }
    require(_CToken.redeem(_cTokensRequested) == 0, "Error redeeming cTokens from Compound");
    uint256 _interestEarnedOnWithdrawalAmount = calculateInterestOnAmountWithdrawn(_tokenAddress, _Token, _cTokensRequested, _totalCTokens);
    updatePrincipalSupplied(_tokenAddress, _Token, false, _interestEarnedOnWithdrawalAmount);

    _Token.transfer(feeHoldingAddress, _interestEarnedOnWithdrawalAmount.mul(95).div(1000));
    _Token.transfer(userAddress, _Token.balanceOf(address(this)));
    assert(_Token.balanceOf(address(this)) == 0);
  }
}
