const fetch = require('node-fetch');

const calculateDaysFromStartToToday = (startDate) => {
  const startDateInUnix = startDate.getTime() / 1000;
  const nowInUnix = Date.now() / 1000;
  const oneDayInSecs = 60 * 60 * 24;
  const daysElapsed = Math.ceil((nowInUnix - startDateInUnix) / oneDayInSecs);
  return daysElapsed;
};

const dateObjToString = (dateObj) => {
  const dateStrArr = dateObj.toString().split(' ');
  const [, month, day] = dateStrArr;
  return `${month} ${day}`;
};

const formatInterestRateArr = async (interestRateArr, startDate) => {
  let dateInUnix = startDate.getTime() / 1000;
  const formattedInterestRateArr = interestRateArr.map((rate) => {
    const date = dateObjToString(new Date(dateInUnix * 1000));
    const dataObj = { interestRate: Math.round(Number(rate) * 10000) / 100, date };
    dateInUnix += (60 * 60 * 24);
    return dataObj;
  });
  return formattedInterestRateArr;
};

const getInterestDataFromCompound = async (tokenAddress, startDate, daysElapsed) => {
  const samplesPerDay = 24;
  const buckets = samplesPerDay * daysElapsed;
  const maxBlock = Math.round(new Date().getTime() / 1000);
  const minBlock = Math.round(startDate.getTime() / 1000);

  const url = `https://api.compound.finance/api/v2/market_history/graph?asset=${tokenAddress}&min_block_timestamp=${minBlock}&max_block_timestamp=${maxBlock}&num_buckets=${buckets}`;

  const getObj = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      // 'compound-api-key': v2APIKEY,
    },
  };
  let data = [];
  try {
    const rawData = await fetch(url, getObj);
    data = await rawData.json();
  } catch (error) {
    console.log('Error getting interest rates from Compound');
  }
  return data;
};

const averageArr = dataArr => (
  dataArr.reduce((averageObj, rate) => {
    let { average, dataPointCount } = averageObj;
    let sum = average * dataPointCount;
    sum += Number(rate);
    dataPointCount += 1;
    average = sum / dataPointCount;
    return { average, dataPointCount };
  }, { average: 0, dataPointCount: 0 })
);

// timePeriodToAverage is the num of days we want to average out (e.g., 1 = daily average, 7 = weekly average, 30 = monthly average)
const getAverageRate = (timePeriodToAverage, daysOfDataCollected, interestRateArr) => {
  const averageRates = [];
  const buckets = daysOfDataCollected / timePeriodToAverage;
  const dataPointsPerBucket = interestRateArr.length / buckets;
  for (let i = 0; i < buckets; i += 1) {
    const startIndex = i * dataPointsPerBucket;
    const endIndex = startIndex + dataPointsPerBucket;
    const bucketDataArr = interestRateArr.slice(startIndex, endIndex);
    const bucketAverageObj = averageArr(bucketDataArr);
    averageRates.push(bucketAverageObj.average);
  }
  return averageRates;
};

// making this the Compound v2 average rate for now
const getAverage = async (tokenAddress, timePeriodInDays) => {
  // const currentDateInUnix = Date.now() / 1000;
  // const startDateInUnix = currentDateInUnix - (60 * 60 * 24 * timePeriodInDays);
  // const startDate = new Date(startDateInUnix * 1000);
  const startDate = new Date('05/26/2019');
  const days = calculateDaysFromStartToToday(startDate);
  const data = await getInterestDataFromCompound(tokenAddress, startDate, days);
  if (data.supply_rates) {
    const interestRateArr = data.supply_rates.map(supplyData => supplyData.rate);
    const averageRates = getAverageRate(days, days, interestRateArr);
    return averageRates[0];
  }
  return null;
};

const getHistorical = async (tokenAddress, startDate) => {
  const days = calculateDaysFromStartToToday(startDate);
  const data = await getInterestDataFromCompound(tokenAddress, startDate, days);
  if (data.supply_rates) {
    const interestRateArr = data.supply_rates.map(supplyData => supplyData.rate);
    const averageRates = getAverageRate(1, days, interestRateArr);
    const formattedRates = formatInterestRateArr(averageRates, startDate);
    return formattedRates;
  }
  return [];
};


module.exports = { getAverage, getHistorical };
