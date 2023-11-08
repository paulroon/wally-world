import { z } from "zod"
import { formatDate } from "./util"

//
// Availability
//

export const AvailabilityRequestBody = z.object({
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  product_id: z.string().optional(),
  quantity: z.number().int().positive().optional(),
})

const addNDays = (date: Date, n: number): Date => {
  const newDate = new Date(date) // Avoid mutating the original date
  newDate.setDate(newDate.getDate() + n)
  return newDate
}

const prices = [
  {
    type: "ADULT",
    currency: "GBP",
    amount: 100,
  },
  {
    type: "CHILD",
    currency: "GBP",
    amount: 20,
  },
  {
    type: "TEEN",
    currency: "GBP",
    amount: 500,
  },
]

export const availabilityData = (startDate?: Date, endDate?: Date, productId?: string) => {
  const today = new Date()
  const start = startDate || today
  const end = endDate || addNDays(today, 23)

  return Array.from({ length: 24 }, (_, i) => {
    const dateToAdd = addNDays(today, i)
    return {
      product_id: `P100${i}`,
      name: `Product [${i}]`,
      start_date: formatDate(dateToAdd),
      prices,
      capacity: 10,
    }
  }).filter((item) => {
    const itemDate = new Date(item.start_date)
    const isAfterStart = itemDate >= start
    const isBeforeEnd = itemDate <= end
    const isProductIdMatch = productId ? item.product_id === productId : true
    return isAfterStart && isBeforeEnd && isProductIdMatch
  })
}
