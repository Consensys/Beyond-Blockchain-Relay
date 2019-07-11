const fetch = require('node-fetch');

const calculateDaysBetween = (startDate, endDate) => {
  const startDateInUnix = startDate.getTime() / 1000;
  const endDateInUnix = endDate.getTime() / 1000;
  const oneDayInSecs = 60 * 60 * 24;
  const daysElapsed = Math.ceil((endDateInUnix - startDateInUnix) / oneDayInSecs);
  return daysElapsed;
};

const getInterestDataFromCompound = async (version, token, startDate, endDate, daysBetween) => {
  const samplesPerDay = 24;
  const buckets = samplesPerDay * daysBetween;
  const maxBlock = Math.round(endDate.getTime() / 1000);
  const minBlock = Math.round(startDate.getTime() / 1000);

  const cDAIAddress = '0xf5dce57282a584d2746faf1593d3121fcac444dc';
  const cUSDCAddress = '0x39aa39c021dfbae8fac545936693ac917d5e7563';
  const daiAddress = '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359';
  let tokenAddress;

  if (token === 'cDAI') {
    tokenAddress = cDAIAddress;
  } else if (token === 'cUSDC') {
    tokenAddress = cUSDCAddress;
  } else if (token === 'DAI') {
    tokenAddress = daiAddress;
  }

  let data;
  if (version === 1) {
    const url = `https://api.compound.finance/api/market_history/v1/graph?asset=${tokenAddress}&min_block_timestamp=${minBlock}&max_block_timestamp=${maxBlock}&num_buckets=${buckets}`;
    const getObj = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'compound-api-key': 'a7cf41b5c6b6c87ac00046c90c4758e7f515494aebd483698cfa06e876ee8a4d',
      },
    };
    const rawData = await fetch(url, getObj);
    data = await rawData.json();
  } else {
    const url = `https://api.compound.finance/api/v2/market_history/graph?asset=${tokenAddress}&min_block_timestamp=${minBlock}&max_block_timestamp=${maxBlock}&num_buckets=${buckets}`;
    const getObj = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        // 'compound-api-key': v2APIKEY,
      },
    };
    const rawData = await fetch(url, getObj);
    data = await rawData.json();
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

const getAverage = async (version, token, startDateStr, endDateStr) => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const days = calculateDaysBetween(startDate, endDate);
  const data = await getInterestDataFromCompound(version, token, startDate, endDate, days);
  const interestRateArr = data.supply_rates.map(supplyData => supplyData.rate);
  const averageRates = getAverageRate(days, days, interestRateArr);
  return averageRates[0];
};

(async () => {
  let result = await getAverage(1, 'DAI', '12/16/2018', '05/23/2019');
  console.log('DAI | 5 months | v1: ', result);
  result = await getAverage(2, 'cDAI', '05/26/2019', '06/16/2019');
  console.log('DAI | 3 weeks | v2: ', result);
  result = await getAverage(2, 'cUSDC', '05/26/2019', '06/16/2019');
  console.log('USDC | 3 weeks | v2: ', result);
  result = await getAverage(2, 'cDAI', '06/02/2019', '06/16/2019');
  console.log('DAI | 2 weeks | v2: ', result);
  result = await getAverage(2, 'cUSDC', '06/02/2019', '06/16/2019');
  console.log('USDC | 2 weeks | v2: ', result);
  result = await getAverage(2, 'cDAI', '06/09/2019', '06/16/2019');
  console.log('DAI | 1 week | v2: ', result);
  result = await getAverage(2, 'cUSDC', '06/09/2019', '06/16/2019');
  console.log('USDC | 1 week | v2: ', result);
})();
