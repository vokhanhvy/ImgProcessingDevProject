import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const src = path.resolve('image')
const output = path.resolve('thumbnail')

export const process = async (
  filename: string,
  width: number,
  height: number,
): Promise<string | null> => {
  const srcPath = path.join(src, filename)
  const outputPath = path.join(output, `${filename}-${width}x${height}.jpg`)
  if (!fs.existsSync(srcPath)) {
    return null
  }

  if (fs.existsSync(outputPath)) {
    return outputPath
  }

  try {
    await sharp(srcPath)
      .resize(width, height)
      .toFormat('jpg')
      .toFile(outputPath)
    return outputPath
  } catch (error) {
    console.error('error:', error)
    return null
  }
}
