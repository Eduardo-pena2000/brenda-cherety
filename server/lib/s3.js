import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs';

let s3Client = null;
let bucketName = null;

if (process.env.S3_BUCKET_NAME && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
  s3Client = new S3Client({
    region: process.env.AWS_REGION || 'auto', // 'auto' para R2
    endpoint: process.env.S3_ENDPOINT_URL || undefined, // Ej: https://<account_id>.r2.cloudflarestorage.com
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  });
  bucketName = process.env.S3_BUCKET_NAME;
  console.log('S3/R2 configurado correctamente.');
}

export const isS3Configured = () => s3Client !== null;

export const uploadToS3 = async (localFilePath, key, mimeType) => {
  if (!isS3Configured()) return null;

  const fileStream = fs.createReadStream(localFilePath);
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: bucketName,
      Key: key,
      Body: fileStream,
      ContentType: mimeType,
    }
  });

  await upload.done();
  return key; // La clave S3
};

export const getSignedS3Url = async (key, expiresInSeconds = 3600) => {
  if (!isS3Configured()) return null;

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key
  });

  return await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
};
