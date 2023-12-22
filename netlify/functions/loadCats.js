// netlify/functions/loadCats.js
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const numberOfCats = 50;
  const catApiUrl = `https://api.thecatapi.com/v1/images/search?limit=${numberOfCats}`;

  try {
    const response = await fetch(catApiUrl, {
      headers: {
        'Access-Control-Allow-Origin': 'https://catgpt.solsarratea.world',
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const catData = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(catData),
    };
  } catch (error) {
    console.error('Error loading cats:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

