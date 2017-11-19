// USD CAD 23
// 23 USD is worth 28 CAD. You can spend these in the following countries:

const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);
    const rate = (from === to ? 1 : response.data.rates[to]);
    
    if (rate) {
      return rate;
    } else {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
  }
  
  // return axios.get(`https://api.fixer.io/latest?base=${from}`).then((response) => {
  //   return response.data.rates[to];
  // });
};

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);  
  } catch (error) {
    throw new Error(`Unable to get countries that use ${currencyCode}`);
  }

  
  // return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
  //   return response.data.map((country) => country.name);
  // });
};


// With Promise chaining
const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to).then((tempCountries) => {
    countries = tempCountries
    return getExchangeRate(from, to);
  }).then((rate) => {
    const exchangeAmount = amount * rate;
    return `${amount} ${from} is worth ${exchangeAmount} ${to}. \n${to} can be used in the folloing countries: ${countries.join(', ')}`;
  })
};

// With async-await
const convertCurrencyAlt = async (from, to, amount) => {
  var rate = await getExchangeRate(from, to);
  var countries = await getCountries(to);

  const exchangeAmount = amount * rate;
  return `${amount} ${from} is worth ${exchangeAmount} ${to}. \n${to} can be used in the folloing countries: ${countries.join(', ')}`;
};

// convertCurrency('CAD', 'USD', 100).then((status) => {
//   console.log(status, '\n');
// });

convertCurrencyAlt('USD', 'USD', 100).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e.message);
});
