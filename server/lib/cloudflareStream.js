import fs from 'fs';
import axios from 'axios';
import * as tus from 'tus-js-client';

export async function uploadToCloudflareStream(filePath) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_STREAM_TOKEN;
  
  if (!accountId || !token) throw new Error("Faltan credenciales de Cloudflare Stream");

  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath);
    const size = fs.statSync(filePath).size;

    const upload = new tus.Upload(fileStream, {
      endpoint: `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      chunkSize: 50 * 1024 * 1024, // 50MB
      retryDelays: [0, 3000, 5000, 10000, 20000],
      uploadSize: size,
      onError: function (error) {
        reject(error);
      },
      onSuccess: async function () {
        try {
          // El URL de TUS termina con el UID del video
          const uid = upload.url.split('/').pop();
          
          // Obtener los detalles del video para sacar el customerCode
          const details = await axios.get(
            `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/${uid}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          const preview = details.data.result.preview;
          const match = preview.match(/customer-([a-zA-Z0-9]+)\.cloudflarestream\.com/);
          const customerCode = match ? match[1] : '';
          
          resolve(`${uid}:${customerCode}`);
        } catch (err) {
          reject(err);
        }
      }
    });

    upload.start();
  });
}
