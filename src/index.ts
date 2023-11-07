import express, { Request, Response } from "express"
import { AvailabilityRequestBody, availabilityData } from "./helper/availability"
import { ReservationRequestBody, makeReservation } from "./helper/reserve"
import { BookingRequestBody, makeBooking } from "./helper/book"
import { CancelRequestBody, makeCancellation } from "./helper/cancel"

const app = express()
app.use(express.json()) // Middleware to parse JSON request bodies

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Just use postman!" })
})

/**
 * Availability endpoint
 * Returns a list of products with their availability
 * Request body:
 * {
 *      start_date: string (optional),
 *      end_date: string (optional),
 *      product_id: string (optional),
 *      quantity: number (optional),
 * }
 */
app.post("/availability", (req: Request, res: Response) => {
  const reqData = AvailabilityRequestBody.safeParse(req.body)
  if (!reqData.success) {
    return res.status(400).json(reqData.error)
  }

  const startDate = reqData.data.start_date ? new Date(reqData.data.start_date) : undefined
  const endDate = reqData.data.end_date ? new Date(reqData.data.end_date) : undefined

  return res.json(availabilityData(startDate, endDate, reqData.data.product_id))
})

/**
 * Reserve endpoint
 * Returns a confirmation of the reservation or an error message
 * Request body:
 * {
 *     "product_id": string (required),
 *     "date": string (required),
 *     "quantity": number (required),
 * }
 */
app.post("/reserve", (req: Request, res: Response) => {
  const reqData = ReservationRequestBody.safeParse(req.body)
  if (!reqData.success) {
    return res.status(400).json(reqData.error)
  }

  res.json(
    makeReservation(new Date(reqData.data.date), reqData.data.product_id, reqData.data.quantity)
  )
})

/**
 * Book endpoint
 * Returns a booking confirmation or an error message
 * Request body:
 * {
 *     "confirmation_code": string (required)
 * }
 */
app.post("/book", (req: Request, res: Response) => {
  const reqData = BookingRequestBody.safeParse(req.body)
  if (!reqData.success) {
    return res.status(400).json(reqData.error)
  }

  res.json(makeBooking(reqData.data.confirmation_code))
})

/**
 * Cancel endpoint
 * Returns a cancellation confirmation or an error message
 * Request body:
 * {
 *     "booking_ref": string (required)
 * }
 */
app.post("/cancel", (req: Request, res: Response) => {
  const reqData = CancelRequestBody.safeParse(req.body)
  if (!reqData.success) {
    return res.status(400).json(reqData.error)
  }

  res.json(makeCancellation(reqData.data.booking_ref))
})

app.listen(3000, () => {
  console.log("Server is running on port [3000]")
})
