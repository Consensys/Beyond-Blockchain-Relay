import React from 'react';
import Tooltip from '../widgets/Tooltip';
import SupplyTimer from '../widgets/SupplyTimer';

const Step6SupplyTransactionAction = props => <div className="supply-transaction-action-wrapper">
  <h2 className="caption-text send-grid-item-left-column">Please send</h2>
  <div className="send-grid-item-right-column horizontal-tight-row">
    <h2 className="medium-text">At least <strong>1&nbsp;&nbsp;</strong>
    <img src={`${props.token === 'DAI' ? 'https://settle.finance/blog/wp-content/uploads/2019/01/dai-logo.jpg' : 'https://www.centre.io/images/usdc/usdc-icon-86074d9d49.png'}`} height="25" width="25" />
    {props.token}</h2>
    <Tooltip
      height={10}
      width={10}
      message='It&apos;s OK if it&apos;s not exactly this amount - nothing bad will happen if you
      accidentally send more or less, we&apos;ll be able to receive it correctly!' />
      <div className="supply-transaction-action-links-container">
        <p className="small-text">30d Avg Interest Rate: <strong>{props.token === 'DAI' ? props.financialData.interestRate.DAI : props.financialData.interestRate.USDC}%</strong></p>
        <p className="small-text">Deposits/Withdrawals: <strong>Instant, 24/7</strong></p>
        <p className="small-text supply-transaction-link-text"><a href={`${props.token === 'DAI' ? '/getdai' : '/getusdc'}`} target="_blank" rel="noopener noreferrer">Need help buying {props.token}?</a></p>
    </div>
  </div>
  <h2 className="caption-text send-grid-item-left-column">to this Ethereum address</h2>
  <div className="send-grid-item-right-column horizontal-tight-row">
    <div className="ethereum-address-wrapper">
      <p className="medium-text">{props.userData.contractAddress
        ? `${props.userData.contractAddress.substring(0, 11)}...${props.userData.contractAddress.substring(33, 42)}` : null}
      </p>
    </div>
    <button className="button--copy" onClick={props.copyToClipboard}>{props.contractCopyButtonClicked ? 'Copied!' : 'Copy'}</button>
  </div>
  <h2 className="caption-text send-grid-item-left-column">within</h2>
  <div className="send-grid-item-right-column">
    <SupplyTimer />
  </div>
</div>;

export default Step6SupplyTransactionAction;
