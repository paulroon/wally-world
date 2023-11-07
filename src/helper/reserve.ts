import { z } from "zod"

//
// Reservation
//

export const ReservationRequestBody = z.object({
  date: z.string(),
  product_id: z.string(),
  quantity: z.number().int().positive(),
})

export const makeReservation = (date: Date, productId: string, quantity: number) => {
  return {
    product_id: productId,
    confirmation_code: `RES_${productId}`,
    status: "confirmed",
  }
}
