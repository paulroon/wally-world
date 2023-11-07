import { z } from "zod"

//
// Booking
//

export const BookingRequestBody = z.object({
  confirmation_code: z.string(),
})

export const makeBooking = (confirmation_code: string) => {
  const [_, productId] = confirmation_code.split("_")
  return {
    product_id: productId,
    booking_ref: `BOOK_${productId}`,
    status: "Booked",
  }
}
