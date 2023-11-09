import express from "express"
import routes from "../routes"
import serverless from "serverless-http/serverless-http"

const app = express()

app.use(express.json())

app.use("/", routes)

export const handler = serverless(app)
