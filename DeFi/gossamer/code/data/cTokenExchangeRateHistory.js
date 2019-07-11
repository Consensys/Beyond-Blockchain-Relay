const fetch = require('node-fetch');

const dateObjToString = (dateObj) => {
  const dateStrArr = dateObj.toString().split(' ');
  const [, month, day] = dateStrArr;
  return `${month} ${day}`;
};

const formatExchangeRateArr = async (exchangeRateArr, startDate) => {
  let dateInUnix = startDate.getTime() / 1000;
  const formattedExchangeRateArr = exchangeRateArr.map((rate) => {
    const date = dateObjToString(new Date(dateInUnix * 1000));
    const dataObj = { exchangeRate: rate, date };
    dateInUnix += (60 * 60 * 24);
    return dataObj;
  });
  return formattedExchangeRateArr;
};

const getExchangeRateDataFromCompound = async (tokenAddress, startDate) => {
  const samplesPerDay = 1;
  const maxBlock = Math.floor(new Date().getTime() / 1000);
  let minBlock = Math.floor(startDate.getTime() / 1000);

  const dataPromisesArr = [];
  while (minBlock <= maxBlock) {
    const url = `https://api.compound.finance/api/v2/ctoken?addresses[]=${tokenAddress}&block_timestamp=${minBlock}`;

    const getObj = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        // 'compound-api-key': v2APIKEY,
      },
    };

    dataPromisesArr.push(fetch(url, getObj));
    minBlock += (60 * 60 * 24) / samplesPerDay;
  }

  const rawDataArr = await Promise.all(dataPromisesArr).then(data => data);
  const data = await Promise.all(rawDataArr.map(rawData => rawData.json())).then(finalData => finalData);
  return data;
};

const getCTokenExchangeRateHistory = async (tokenAddress, startDate) => {
  const data = await getExchangeRateDataFromCompound(tokenAddress, startDate);
  const exchangeRateArr = data.map(exchangeObj => exchangeObj.cToken[0].exchange_rate.value);
  const formattedRates = formatExchangeRateArr(exchangeRateArr, startDate);
  return formattedRates;
};

module.exports = getCTokenExchangeRateHistory;
