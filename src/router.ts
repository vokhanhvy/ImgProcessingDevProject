import express from 'express'
import { process } from './imageProcessing'

const router = express.Router()

router.get('/', async (req, res) => {
  const { filename, width, height } = req.query

  if (filename == null || width == null || height == null) {
    return res.status(400).json({ error: 'missing filename, width or height' })
  }
  try {
    const processedImageUrl = await process(
      filename as string,
      parseInt(width as string),
      parseInt(height as string),
    )

    if (processedImageUrl) {
      res.sendFile(processedImageUrl)
    } else {
      res.status(500).json({ error: 'fail' })
    }
  } catch (error) {
    res.status(500).json({ error: 'error' })
  }
})

export default router
