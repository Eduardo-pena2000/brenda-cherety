import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs';

let s3Client = null;
let bucketName = null;

// Buscar credenciales con múltiples prefijos por si el hosting bloquea alguno
const awsKey = process.env.STORAGE_ACCESS_KEY || process.env.R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
const awsSecret = process.env.STORAGE_SECRET_KEY || process.env.R2_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;

console.log('[S3 Init] Bucket:', !!process.env.S3_BUCKET_NAME, '| Key:', !!awsKey, '| Secret:', !!awsSecret, '| Endpoint:', !!process.env.S3_ENDPOINT_URL);

if (process.env.S3_BUCKET_NAME && awsKey && awsSecret) {
  s3Client = new S3Client({
    region: process.env.AWS_REGION || 'auto',
    endpoint: process.env.S3_ENDPOINT_URL || undefined,
    credentials: {
      accessKeyId: awsKey,
      secretAccessKey: awsSecret,
    }
  });
  bucketName = process.env.S3_BUCKET_NAME;
  console.log('S3/R2 configurado correctamente con bucket:', bucketName);
} else {
  console.warn('[S3 Init] ADVERTENCIA: S3/R2 NO configurado. Los archivos se guardarán solo localmente.');
}

export const isS3Configured = () => s3Client !== null;

export const uploadToS3 = async (localFilePath, key, mimeType) => {
  if (!isS3Configured()) {
    console.warn('[S3 Upload] S3 no configurado, saltando subida de:', key);
    return null;
  }

  try {
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
    console.log('[S3 Upload] Subido exitosamente:', key);
    return key;
  } catch (error) {
    console.error('[S3 Upload] Error subiendo archivo:', key, error.message);
    throw error;
  }
};

export const getSignedS3Url = async (key, expiresInSeconds = 3600) => {
  if (!isS3Configured()) return null;

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key
  });

  return await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
};
