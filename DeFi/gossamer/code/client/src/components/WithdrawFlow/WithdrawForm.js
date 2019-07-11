import React from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import CountUp from 'react-countup';
import Tooltip from '../widgets/Tooltip';
import schemas from '../../actions/validationSchemas';

const WithdrawForm = props => (
  <div className="withdraw-form-wrapper">
    <Formik
      validationSchema={schemas.withdraw(props.userData.primaryToken, props.userData.principal, props.userData.interestAccumulated, props.transactionAmountToPrincipal, props.transactionAmountToInterest)}
      validateOnChange={true}
      validateOnBlur={true}
      initialValues={{ transactionAmountToPrincipal: 0, transactionAmountToInterest: 0 }}
      onSubmit={() => {
        props.handleFormikSubmit();
        props.changeUserStatus('withdraw initiated');
      }}
    >
      { ({ isSubmitting, setFieldTouched }) => (
        <Form>
          <div className="grid">
            <p className="caption-text grid-item-left">Available to withdraw</p>
            <div className="withdraw-dai-input">
              <div className="horizontal-tight-row">
                <h2 className="big-text--bold grid-item-right">
                  <CountUp start={0} end={props.userData.balanceToken} duration={1} decimals={7}
                  delay={0} />
                </h2>
                {props.renderTokenIcon()}
                <h2 className="caption-text">{`${props.userData.primaryToken} `}</h2>
              </div>
            </div>
            <p className="caption-text grid-item-left">Your wallet address to receive withdrawal</p>
            <div className="grid-item-right">
              <div className="ethereum-address-wrapper">
                <p className="medium-text">{props.userData.userAddress ? `${props.userData.userAddress.substring(0, 11)}...
                ${props.userData.userAddress.substring(33, 42)}` : 'No user address set'}
                </p>
              </div>
              <Tooltip
                message="This is the wallet address you locked in as your secure withdrawal address,
                when you first deposited. For security reasons, this is the only wallet address you can withdraw to."
                height={12}
                width={16} />
            </div>

            <div className="dashboard-data-unit-caption grid-item-left">
              <p className="caption-text">withdraw from your deposits</p>
              <Tooltip
                message="The amount of money that you've purely deposited. Doesn't include any earned interest."
                height={12}
                width={16}
              />
            </div>
            <div className="withdraw-dai-input">
              <div className="withdraw-input-available-wrapper">
                <div className="col-3 input-effect grid-item-right">
                  <Field
                    name="transactionAmountToPrincipal"
                    type="text"
                    render={({ field }) => (
                      <input
                        {...field}
                        className="input-field-effect input-number"
                        placeholder="ex. 5"
                        onBlur={() => {
                          props.handleFormikChange({ name: field.name, value: field.value });
                          setFieldTouched('transactionAmountToPrincipal', true);
                        }}
                      />
                    )}
                  />
                  <span className="focus-border" />
                </div>
                <p className="timestamp-text">Available: {props.userData.principal} {props.userData.primaryToken}</p>
              </div>
                {props.renderTokenIcon()}
              <h2 className="caption-text">{`${props.userData.primaryToken} `}</h2>
            </div>

            <div className="dashboard-data-unit-caption grid-item-left">
              <p className="caption-text">withdraw from your earned interest</p>
              <Tooltip
                message="The amount you've earned as interest through us, not including any money you've deposited."
                height={12}
                width={16}
              />
            </div>

            <div className="withdraw-dai-input">
              <div className="withdraw-input-available-wrapper">
                <div className="col-3 input-effect grid-item-right">
                  <Field
                    name="transactionAmountToInterest"
                    type="text"
                    render={({ field }) => (
                      <input
                        {...field}
                        className="input-field-effect input-number"
                        placeholder="ex. 3"
                        onBlur={() => {
                          props.handleFormikChange({ name: field.name, value: field.value });
                          setFieldTouched('transactionAmountToInterest', true);
                        }}
                      />
                    )}
                  />
                  <span className="focus-border" />
                </div>
                <p className="timestamp-text">Available: {props.userData.interestAccumulated} {props.userData.primaryToken}</p>
              </div>
              {props.renderTokenIcon()}
              <h2 className="caption-text">{`${props.userData.primaryToken} `}</h2>
            </div>
          </div>
          <button className="button" onClick={props.showModal}>Withdraw my money</button>
          <Rodal
            visible={props.modalVisible}
            onClose={props.hideModal}
            closeOnEsc={true}
            showMask={true}
            animation="slideDown"
            width={800}
            height={500}
          >
            <div className="withdraw-modal-wrapper">
              <h1 className="title-text--bold">Are you sure you want to withdraw&nbsp;
              {`${Number(props.transactionAmountToPrincipal) + Number(props.transactionAmountToInterest)}
                ${props.userData.primaryToken}`}?
              </h1>
              <p className="medium-text">You&apos;re already set to make some serious, consistent gains over the medium term.</p>
              <p className="medium-text">Your entire portfolio doesn&apos;t have to be about getting rich quick. If you withdraw now, you&apos;re losing out on real money.</p>
              <ErrorMessage name="transactionAmountToPrincipal" >
                {errorMessage => <div className="error-text">{errorMessage}</div>}
              </ErrorMessage>
              <ErrorMessage name="transactionAmountToInterest" >
                {errorMessage => <div className="error-text">{errorMessage}</div>}
              </ErrorMessage>
              <button className="button" type="submit" disabled={isSubmitting}>Withdraw anyway</button>
              <p className="small-text">
                Clicking this button will initiate a transfer on the Ethereum blockchain.
                Your money will be sent to your wallet address within a few minutes, depending on how clogged the Ethereum network is.
              </p>
            </div>
          </Rodal>
        </Form>
      )}
    </Formik>
  </div>

);

export default WithdrawForm;
