Install dependancies: npm install
Build: npm run build
Run the server: npm run start
Place the image in image folder, the API place resized image in thumnail folder
API:
GET /api/images
Query Parameters:
filename: string, required, name of the image
width: number, required, width of the image.
height: number, required, height of the image.

Example: "http://localhost:3000/api/images?filename=Bucket_01.jpg&width=200&height=200"
