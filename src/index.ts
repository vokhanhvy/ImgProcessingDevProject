//let message: string = 'Hello World'
//console.log(message)
import express, { Application } from 'express'
import route from './router'

const PORT = process.env.PORT || 3000
const app: Application = express()
app.use('/api/images', route)

app.listen(PORT, () => {
  console.log(`Server is start at port ${PORT}`)
})
export default app
