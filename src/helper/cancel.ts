import { z } from "zod"

//
// Cancel
//

export const CancelRequestBody = z.object({
  booking_ref: z.string(),
})

export const makeCancellation = (booking_ref: string) => {
  const [_, productId] = booking_ref.split("_")
  return {
    product_id: productId,
    booking_ref: `BOOK_${productId}`,
    cancellation_ref: `CANCEL_${productId}`,
    status: "Cancelled",
  }
}
