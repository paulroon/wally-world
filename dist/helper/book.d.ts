import { z } from "zod";
export declare const BookingRequestBody: z.ZodObject<{
    confirmation_code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    confirmation_code: string;
}, {
    confirmation_code: string;
}>;
export declare const makeBooking: (confirmation_code: string) => {
    product_id: string;
    booking_ref: string;
    status: string;
};
