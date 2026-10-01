import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const token = process.env.CLOUDFLARE_STREAM_TOKEN;

async function test() {
  try {
    const res = await axios.get(`https://api.cloudflare.com/client/v4/accounts/${accountId}/stream`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log("SUCCESS:");
    console.log(res.data);
  } catch (err) {
    console.log("ERROR STATUS:", err.response?.status);
    console.log("ERROR DATA:", JSON.stringify(err.response?.data, null, 2));
  }
}

test();
