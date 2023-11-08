import express from "express"
import routes from "../src/routes"
import serverless from "serverless-http"

const app = express()

app.use(express.json())
app.use(routes)

app.listen(3000, () => {
  console.log("Server is running on port [3000]")
})

export const handler = serverless(app)
