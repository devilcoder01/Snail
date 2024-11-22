// prices-fetch-script.js
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

// Replace with your Alchemy API key:
const apiKey = "VzR6_MduUElR5YcR7PN94LWmJjVwZvNR";
const fetchURL = `https://api.g.alchemy.com/prices/v1/${apiKey}/tokens/by-symbol`;
// Define the symbols you want to fetch prices for.
const symbols = ["ETH", "BTC", "USDT"];

const params = new URLSearchParams();
symbols.forEach(symbol => params.append('symbols', symbol));
const urlWithParams = `${fetchURL}?${params.toString()}`;
console.log(params, urlWithParams)

const requestOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

fetch(urlWithParams, requestOptions)
  .then(response => response.json())
  .then(data => {
    console.log("Token Prices By Symbol:");
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => console.error('Error:', error));



const getCoinBalance = (symbol) => {
    const urlWithParams = `${fetchURL}?${symbol.toString()}`
    const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
    fetch(urlWithParams, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log("Token Prices By Symbol:");
          console.log(JSON.stringify(data, null, 2));
        })
        .catch(error => console.error('Error:', error));
}

// getCoinBalance("ETH")