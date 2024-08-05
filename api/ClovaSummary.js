// src/api/clovaSummary.js
import axios from 'axios';

const CLIENT_ID = 'rpkrqf4fkc';
const CLIENT_SECRET = 'UVV2nxAxytaTWuRetmikSIYIfDfyB3drsdG9ge9m';

const getSummary = async (text) => {
  const url = 'https://naveropenapi.apigw.ntruss.com/text-summary/v1/summarize';
  const headers = {
    'X-NCP-APIGW-API-KEY-ID': CLIENT_ID,
    'X-NCP-APIGW-API-KEY': CLIENT_SECRET,
    'Content-Type': 'application/json',
  };
  const body = {
    document: {
      content: text,
    },
    option: {
      language: 'ko',
      model: 'general',
      tone: 0,
      summaryCount: 3,
    },
  };

  try {
    const response = await axios.post(url, body, { headers });
    return response.data.summary;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return null;
  }
};

export default getSummary;
