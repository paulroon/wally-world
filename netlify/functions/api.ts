import express from "express"
import router from "../../src/routes"
import serverless from "serverless-http"

const app = express()

app.use(express.json())

app.use("/.netlify/functions/", router)

export const handler = serverless(app)
