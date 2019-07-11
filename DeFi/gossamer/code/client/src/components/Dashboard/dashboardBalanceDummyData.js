
// SP at 7%
// Marcus at 2.25%
// AmEx HYSavings 2.1%
// Us at 9.5%
// Vanguard at 8%
// Wealthfront Cash Account at 2.51

const startingPrincipal = 10000;

const balanceFunction = (n, interval) => (
  startingPrincipal + (n * interval)
);

const balanceData = [
  {
    date: '6/2019', us: balanceFunction(0, 23.75), Marcus: balanceFunction(0, 5.625), AmEx: balanceFunction(0, 5.25), Vanguard: balanceFunction(0, 21.25), SP: balanceFunction(0, 17.5),
  },
  {
    date: '9/2019', us: balanceFunction(3, 23.75), Marcus: balanceFunction(3, 5.625), AmEx: balanceFunction(3, 5.25), Vanguard: balanceFunction(3, 21.25), SP: balanceFunction(3, 17.5),
  },
  {
    date: '12/2019', us: balanceFunction(6, 23.75), Marcus: balanceFunction(6, 5.625), AmEx: balanceFunction(6, 5.25), Vanguard: balanceFunction(6, 21.25), SP: balanceFunction(6, 17.5),
  },
  {
    date: '3/2020', us: balanceFunction(9, 23.75), Marcus: balanceFunction(9, 5.625), AmEx: balanceFunction(9, 5.25), Vanguard: balanceFunction(9, 21.25), SP: balanceFunction(9, 17.5),
  },
  {
    date: '6/2020', us: balanceFunction(12, 23.75), Marcus: balanceFunction(12, 5.625), AmEx: balanceFunction(12, 5.25), Vanguard: balanceFunction(12, 21.25), SP: balanceFunction(12, 17.5),
  },
  {
    date: '9/2020', us: balanceFunction(15, 23.75), Marcus: balanceFunction(15, 5.625), AmEx: balanceFunction(15, 5.25), Vanguard: balanceFunction(15, 21.25), SP: balanceFunction(15, 17.5),
  },
  {
    date: '12/2020', us: balanceFunction(18, 23.75), Marcus: balanceFunction(18, 5.625), AmEx: balanceFunction(18, 5.25), Vanguard: balanceFunction(18, 21.25), SP: balanceFunction(18, 17.5),
  },
  {
    date: '3/2021', us: balanceFunction(21, 23.75), Marcus: balanceFunction(21, 5.625), AmEx: balanceFunction(21, 5.25), Vanguard: balanceFunction(21, 21.25), SP: balanceFunction(21, 17.5),
  },
  {
    date: '6/2021', us: balanceFunction(24, 23.75), Marcus: balanceFunction(24, 5.625), AmEx: balanceFunction(24, 5.25), Vanguard: balanceFunction(24, 21.25), SP: balanceFunction(24, 17.5),
  },
  {
    date: '9/2021', us: balanceFunction(27, 23.75), Marcus: balanceFunction(27, 5.625), AmEx: balanceFunction(27, 5.25), Vanguard: balanceFunction(27, 21.25), SP: balanceFunction(27, 17.5),
  },
  {
    date: '12/2021', us: balanceFunction(30, 23.75), Marcus: balanceFunction(30, 5.625), AmEx: balanceFunction(30, 5.25), Vanguard: balanceFunction(30, 21.25), SP: balanceFunction(30, 17.5),
  },
  {
    date: '3/2022', us: balanceFunction(33, 23.75), Marcus: balanceFunction(33, 5.625), AmEx: balanceFunction(33, 5.25), Vanguard: balanceFunction(33, 21.25), SP: balanceFunction(33, 17.5),
  },
  {
    date: '6/2022', us: balanceFunction(36, 23.75), Marcus: balanceFunction(36, 5.625), AmEx: balanceFunction(36, 5.25), Vanguard: balanceFunction(36, 21.25), SP: balanceFunction(36, 17.5),
  },
];

export default balanceData;
