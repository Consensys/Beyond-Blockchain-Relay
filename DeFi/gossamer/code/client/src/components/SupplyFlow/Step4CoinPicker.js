import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import {
  Bar, BarChart, Label, LabelList, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import ExternalLinkIcon from '../widgets/ExternalLinkIcon';
import TooltipWidget from '../widgets/Tooltip';

export default class Step4CoinPicker extends React.Component {
  state = {
    modalVisible: false,
  }

  renderTitle = () => {
    let header;
    if (this.props.userData.userHasSuppliedBefore) {
      header = (<h2 className="big-text--bold">Looks like you have supplied ${this.props.userData.primaryToken} before.
      For this early test period, we only support the ability to earn with one type of stablecoin per user,
      so you&apos;ll have to stick with ${this.props.token} for now. If that&apos;s a problem for you,
       drop us an email or chat to let us know!</h2>);
    } else {
      header = (<React.Fragment>
        <h2 className="big-text--bold">
          To get you the highest interest rates, we&apos;re going to lend out your money in the form of stablecoins - Dai or USDC.
          Which would you like to make your first deposit in?
        </h2>
      </React.Fragment>);
    }
    return header;
  }

  showModal = (event) => {
    event.preventDefault();
    this.setState({ modalVisible: true });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render = () => (
    <div>
      <ScrollAnimation animateIn='fadeIn' animateOnce={true} delay={500} >
        <div>
          {this.renderTitle()}
        </div>
      </ScrollAnimation>
      <ScrollAnimation animateIn='bounceInUp' animateOnce={true} delay={1500} >
        <div className="coin-picker-icons-wrapper">
          <div className={`picker-dai-icon ${this.props.token === 'DAI' ? 'active-icon' : null}`}
          onClick={() => this.props.handleTokenSelection('DAI')}>
            <h2 className={`${this.props.token === 'DAI' ? 'active-text' : 'hide'}`}>Your choice</h2>
            <h2 className="medium-text">A bit more experimental, but higher historical returns</h2>
            <img src="https://settle.finance/blog/wp-content/uploads/2019/01/dai-logo.jpg"
              alt="Dai" height="60" width="60" />
            <h2 className="big-text--bold">Dai</h2>
            <div className="dashboard-data-unit-caption">
              <p className="big-text"><strong>{this.props.financialData.interestRate.DAI}%</strong> APR</p>
              <TooltipWidget
                height={10}
                width={10}
                message={`This is the average interest rate of Dai on the Compound lending platform over the last 2 months.
                This is a good indicator of your future average interest rate. So after 365 days, we believe your deposit
                will increase by ${this.props.financialData.interestRate.DAI}%.`}
              />
            </div>
            <p className="small-text">30-day rolling average</p>

            <ul>
              <li className="medium-text left-text-align">
                <strong>1 Dai</strong> = <strong>$1 USD</strong>
              </li>
              <li className="medium-text left-text-align">
                A decentralized stablecoin and a favorite of the Ethereum community. Every Dai is backed by $1.50 in ETH.
              </li>
              <li className="medium-text left-text-align">
                Learn more about Dai <a href="https://makerdao.com/en/dai/" target="_blank" rel="noopener noreferrer">
                here</a><ExternalLinkIcon width={10} height={10} />.
              </li>
              <li className="medium-text left-text-align">
                Find out where to buy <strong>Dai</strong>&nbsp;<a href='/getdai' target="_blank" rel="noopener noreferrer">
                here</a><ExternalLinkIcon width={10} height={10} />.
              </li>
            </ul>
          </div>
          <div className={`picker-usdc-icon ${this.props.token === 'USDC' ? 'active-icon' : null}`}
            onClick={() => this.props.handleTokenSelection('USDC')}>
            <h2 className={`${this.props.token === 'USDC' ? 'active-text' : 'hide'}`}>Your choice</h2>
            <h2 className="medium-text">Lower historical returns, but guaranteed by Coinbase</h2>
            <img src="https://www.centre.io/images/usdc/usdc-icon-86074d9d49.png"
              alt="USDC" height="60" width="60" />
            <h2 className="big-text--bold">USDC</h2>
            <div className="dashboard-data-unit-caption">
              <p className="big-text"><strong>{this.props.financialData.interestRate.USDC}%</strong> APR</p>
              <TooltipWidget
                height={10}
                width={10}
                message={`This is the average interest rate of USDC on the Compound lending platform over the last 2 months.
                This is a good indicator of your future average interest rate. So after 365 days, we believe your deposit will
                increase by ${this.props.financialData.interestRate.USDC}%.`}/>
            </div>
            <p className="small-text">30-day rolling average</p>
            <ul>
              <li className="medium-text left-text-align">
                <strong>1 USDC</strong> = <strong>$1 USD</strong>
              </li>
              <li className="medium-text left-text-align">
                A new, centralized stablecoin built by a consortium led by Coinbase. Every USDC is backed by $1 in a bank account.
              </li>
              <li className="medium-text left-text-align">
                Learn more about USDC <a href="https://www.coinbase.com/usdc" target="_blank" rel="noopener noreferrer">
                here</a><ExternalLinkIcon width={10} height={10} />.
              </li>
              <li className="medium-text left-text-align">
                Find out where to buy it <a href='/getusdc' target="_blank" rel="noopener noreferrer">
                here</a><ExternalLinkIcon width={10} height={10} />.
              </li>
            </ul>
          </div>
        </div>
        <button className="button next-step-button" onClick={this.showModal}>I&apos;ve made my choice</button>
      </ScrollAnimation>
      <Rodal
          visible={this.state.modalVisible}
          onClose={() => this.props.changeStep('current', '+')}
          closeOnEsc={true}
          showMask={true}
          enterAnimation="slideDown"
          leaveAnimation="slideDown"
          width={800}
          height={650}
        >
          <div className="supply-modal-wrapper">
            <h1 className="big-text--bold">Great! You selected {this.props.token}.</h1>
            <h2 className="medium-text supply-flow-text-wrapper">
              We estimate that you&apos;ll be able to earn an interest rate of <strong>{this.props.token === 'DAI'
              ? this.props.financialData.interestRate.DAI : this.props.financialData.interestRate.USDC}%</strong>,
              which we think is better than most investments you can get in the traditional finance world. For reference:
            </h2>
            <img className="supply-flow-transaction-infographic" height="240" width="700" src="https://dapp-lending.s3-us-west-1.amazonaws.com/APRsGraph" />

            <p className="medium-text supply-flow-text-wrapper">Turns out, there are stable yet lucrative ways to
            revolutionize finance 😉</p>
            <button className="button" onClick={() => this.props.changeStep('+')}>Next 👉</button>
          </div>
        </Rodal>
    </div>
  )
}

/*
<Label dataKey="investment" position="bottom" />
<Bar type="monotone" dataKey="Marcus by Goldman Sachs savings account" stroke="#FA7268" animationDuration={1000} />
                  <Bar type="monotone" dataKey="Wealthfront Cash Account" stroke="#FA7268" animationDuration={1000} />
                  <Bar type="monotone" dataKey="Vanguard mutual fund" stroke="#FA7268" animationDuration={1000} />
                  <Bar type="monotone" dataKey="Average yearly stock market return" stroke="#FA7268" animationDuration={1000} />
                  <LabelList dataKey="investment" position="top" offset={15} formatter={value => (`${value}%`)}/>
real graph
<ResponsiveContainer className="chart-container supply-comparison-graph-wrapper" width='100%' height={400}>
                <BarChart
                  // className="line-chart-container"
                  data={[
                    { investment: 'Checking accts', rate: 0.2 },
                    { investment: 'Wealthfront savings acct', rate: 2.25 },
                    { investment: 'Marcus savings acct', rate: 2.25 },
                    { investment: 'S&P (historical)', rate: 7 },
                    { investment: 'Our app', rate: 8 },
                  ]}
                  margin={{
                    top: 20, right: 20, left: 20, bottom: 30,
                  }}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="investment" label={{ value: 'Investments', offset: '0', position: 'insideLeft' }} />
                  <YAxis domain={[0, 10]} tickFormatter={value => (`${value}%`)} label={{ value: 'APR (annual rate of return)', angle: -90, position: 'left' }} />
                  <Bar type="monotone" dataKey="rate" fill="#8884d8" animationDuration={1000}>
                  </Bar>

                </BarChart>
              </ResponsiveContainer>

                  */
