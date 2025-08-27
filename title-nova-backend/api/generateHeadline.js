const axios = require('axios');

const NLP_CLOUD_KEYS = [
    process.env.NLP_CLOUD_KEY_1,
    process.env.NLP_CLOUD_KEY_2,
    process.env.NLP_CLOUD_KEY_3,
    process.env.NLP_CLOUD_KEY_4,
];
const MAX_RETRIES = NLP_CLOUD_KEYS.length;
const NLP_CLOUD_API_HEADLINE_GENERATOR_URL = 'https://api.nlpcloud.io/v1/t5-base-en-generate-headline/summarization';

exports.generateHeadline = async (req, res) => {
    const text = req.body.text
    // Validate input: whether text is empty or not
    if (!text.trim()) {
        return res.status(400).json({ errorMessage: 'Text input is required' });
    }

    let lastError; //used to retry requests with other API keys, if error==429(too many requests)

    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            const response = await axios.post(
                NLP_CLOUD_API_HEADLINE_GENERATOR_URL,
                {
                    text: text,
                },
                {
                    headers: {
                        'Authorization': `Token ${NLP_CLOUD_KEYS[i]}`,
                        'Content-Type': 'application/json'
                    },
                }
            );

            return res.status(200).json({
                headline: response.data.summary_text
            });

        } catch (err) {
            console.log("error, status:"+err.response?.status+"key:"+NLP_CLOUD_KEYS[i])
            lastError = err;

               // Non-retriable errors for THIS KEY ONLY (400, 401, 402)
    if ([400, 401, 402].includes(err.response?.status)) {
        console.log(`Key ${i+1} is invalid/out of credits (${err.response.status}). Trying next key...`);
        continue; // Move to next key
    }

    // Retriable errors (429, 502, 503, 504) - also move to next key
    if ([429, 502, 503, 504].includes(err.response?.status)) {
        console.log(`Key ${i+1} rate limited/temporary error (${err.response.status}). Trying next key...`);
        continue; // Move to next key
    }
        }
    }

    // Determine final error message
    const errorMessage = lastError?.response?.status === 401
        ? 'Invalid API key configuration'
        : 'Too many requests worldwide. Please try again after 1 minute.';

    res.status(lastError?.response?.status || 429).json({
        errorMessage
    });
};