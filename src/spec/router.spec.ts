import request from 'supertest'
import app from '../index'
import fs from 'fs'
import { process } from '../imageProcessing'

describe('GET /api/images', () => {
  it('return 400 if missing parameter in url', async () => {
    const res = await request(app).get('/api/images')
    expect(res.status).toBe(400)
  })

  it('return 500 if has error', async () => {
    const res = await request(app).get(
      '/api/images?filename=testing.jpg&width=200&height=200',
    )
    expect(res.status).toBe(500)
  })
  it('return 200 and show processed image if success', async () => {
    const res = await request(app).get(
      '/api/images?filename=Bucket_01.jpg&width=200&height=200',
    )
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/image\/jpeg/)
  })
})

describe('Image Process', () => {
  const filename = 'Bucket_01.jpg'
  const width = 200
  const height = 200
  const output = `./thumbnails/${filename}-${width}x${height}.jpg`

  afterEach(() => {
    if (fs.existsSync(output)) {
      fs.unlinkSync(output)
    }
  })

  it('create resized image', async () => {
    if (fs.existsSync(output)) {
      fs.unlinkSync(output)
    }

    await process(filename, width, height)
    const fileExists = fs.existsSync(output)
    if (!fileExists) {
      console.error(`File not found: ${output}`)
    }
    expect(fileExists).toBe(true)
  })
})
