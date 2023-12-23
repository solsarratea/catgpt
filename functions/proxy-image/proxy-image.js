// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
import fetch from 'node-fetch'

const handler = async (event,context) => {
   try {
        const imageUrl = event.queryStringParameters.url;

        // Fetch the image
        const response = await fetch(imageUrl, { headers: event.headers });

        // Ensure a successful response
        if (!response.ok) {
            throw new Error(`Error fetching image: ${response.statusText}`);
        }

        // Convert the image data to base64
        const data = await response.buffer();
        const base64Data = data.toString('base64');

        // Get the content type of the original image
        const contentType = response.headers.get('Content-Type');

        return {
            statusCode: 200,
            headers: {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*', // Adjust as needed
            },
            body: base64Data,
            isBase64Encoded: true,
        };
    } catch (error) {
        console.error('Error fetching image:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error :-)' }),
        }
    }
}

module.exports = { handler }
