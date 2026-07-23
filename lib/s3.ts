import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

const BUCKET = process.env.WAMEED_S3_BUCKET
const REGION = process.env.WAMEED_S3_REGION

const s3 = new S3Client({
  region: REGION || 'eu-central-1',
  credentials: {
    accessKeyId: process.env.WAMEED_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.WAMEED_AWS_SECRET_ACCESS_KEY || '',
  },
})

const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}

const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

export function isAllowedImageType(mimeType: string): boolean {
  return mimeType in ALLOWED_TYPES
}

export function getMaxSizeBytes(): number {
  return MAX_SIZE_BYTES
}

export async function uploadImage(file: Buffer, mimeType: string): Promise<string> {
  if (!BUCKET) {
    throw new Error('WAMEED_S3_BUCKET environment variable is not set')
  }
  if (!isAllowedImageType(mimeType)) {
    throw new Error(`Unsupported image type: ${mimeType}`)
  }

  const ext = ALLOWED_TYPES[mimeType]
  // crypto.randomUUID() for the key: avoids trusting any part of the
  // user-supplied filename (no path traversal risk, no collisions).
  const key = `blog/${crypto.randomUUID()}.${ext}`

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file,
      ContentType: mimeType,
      CacheControl: 'public, max-age=31536000, immutable',
    })
  )

  return `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`
}

export async function deleteImage(url: string): Promise<void> {
  if (!BUCKET) return
  const prefix = `https://${BUCKET}.s3.${REGION}.amazonaws.com/`
  if (!url.startsWith(prefix)) return // not one of ours — don't touch it

  const key = url.slice(prefix.length)
  await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }))
}
