import { Request, Response, Router } from "express"
import { AvailabilityRequestBody, addNDays, availabilityData } from "../helper/availability"
import { ReservationRequestBody, makeReservation } from "../helper/reserve"
import { BookingRequestBody, makeBooking } from "../helper/book"
import { CancelRequestBody, makeCancellation } from "../helper/cancel"

const router: Router = Router({ strict: true })

router.get("/", (req: Request, res: Response) => {
  res.send(
    `<div style="width: 100vw; height: 100vh; background-color: #4d0000; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.etsystatic.com/20854952/r/il/4d1f39/2020697240/il_fullxfull.2020697240_5jck.jpg" width="100%" />
    </div>`
  )
})

/**
 * Availability endpoint
 * Returns a list of products with their availability
 * Request body:
 * {
 *      start_date: string (optional),
 *      end_date: string (optional),
 *      product_id: string (optional),
 *      capacity: number (optional),
 * }
 */
router.post("/availability", (req: Request, res: Response) => {
  const reqData = AvailabilityRequestBody.safeParse(req.body)
  if (!reqData.success) {
    return res.status(400).json(reqData.error)
  }

  const startDate = reqData.data.start_date ? new Date(reqData.data.start_date) : undefined
  const endDate = reqData.data.end_date ? new Date(reqData.data.end_date) : undefined
  const capacity = reqData.data.capacity ? reqData.data.capacity : 1

  return res.json(availabilityData(startDate, endDate, reqData.data.product_id, capacity))
})
router.get("/availability", (req: Request, res: Response) => {
  const today = new Date()
  const startDate = today
  const endDate = addNDays(today, 365)

  return res.json(availabilityData(startDate, endDate, undefined, 1))
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
router.post("/reserve", (req: Request, res: Response) => {
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
router.post("/book", (req: Request, res: Response) => {
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
router.post("/cancel", (req: Request, res: Response) => {
  const reqData = CancelRequestBody.safeParse(req.body)
  if (!reqData.success) {
    return res.status(400).json(reqData.error)
  }

  res.json(makeCancellation(reqData.data.booking_ref))
})

export default router
