import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs';

let s3Client = null;
let bucketName = null;

// Credenciales verificadas de Cloudflare R2
const VALID_R2_KEY = '1f0a82afa208e8085c1cedd834ffdf94';
const VALID_R2_SECRET = '2e6d1ae321a69fd9bfa1de3e075dab15def3d65d19186fba857a4d9e657221ab';

// Buscar credenciales en env, descartando la clave revocada/caducada que comienza en b5a3
const rawKey = process.env.STORAGE_ACCESS_KEY || process.env.R2_ACCESS_KEY_ID || process.env.R2_ACCES_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
const rawSecret = process.env.STORAGE_SECRET_KEY || process.env.R2_SECRET_ACCESS_KEY || process.env.R2_SECRET_ACCES_KEY || process.env.AWS_SECRET_ACCESS_KEY;

const isExpiredKey = (k) => !k || k.startsWith('b5a3');

const awsKey = isExpiredKey(rawKey) ? VALID_R2_KEY : rawKey;
const awsSecret = isExpiredKey(rawKey) ? VALID_R2_SECRET : (rawSecret || VALID_R2_SECRET);

console.log('[S3 Init] Bucket:', !!process.env.S3_BUCKET_NAME, '| Key:', !!awsKey, '| Secret:', !!awsSecret, '| Endpoint:', !!process.env.S3_ENDPOINT_URL);

if ((process.env.S3_BUCKET_NAME || 'cursos-brinda-cherety') && awsKey && awsSecret) {
  s3Client = new S3Client({
    region: process.env.AWS_REGION || 'auto',
    endpoint: process.env.S3_ENDPOINT_URL || 'https://fbc8e730199e7a0bb5391d91995718d2.r2.cloudflarestorage.com',
    credentials: {
      accessKeyId: awsKey,
      secretAccessKey: awsSecret,
    }
  });
  bucketName = process.env.S3_BUCKET_NAME || 'cursos-brinda-cherety';
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

export const getS3ObjectStream = async (key) => {
  if (!isS3Configured()) return null;

  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key
    });
    const response = await s3Client.send(command);
    return {
      stream: response.Body,
      contentType: response.ContentType,
      contentLength: response.ContentLength,
      etag: response.ETag,
    };
  } catch (error) {
    console.error('[S3 Stream] Error obteniendo stream:', key, error.message);
    return null;
  }
};

