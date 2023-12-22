// netlify/functions/proxy-image.js
const got = require('got');

exports.handler = async (event, context) => {
    const imageUrl = event.queryStringParameters.url;

    try {
        const response = await got(imageUrl);
        return {
            statusCode: 200,
            headers: {
                'Content-Type': response.headers['content-type'],
                'Access-Control-Allow-Origin': 'https://catgpt.solsarratea.world',
            },
            body: response.body,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};

