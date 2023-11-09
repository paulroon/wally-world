import { z } from "zod";
export declare const CancelRequestBody: z.ZodObject<{
    booking_ref: z.ZodString;
}, "strip", z.ZodTypeAny, {
    booking_ref: string;
}, {
    booking_ref: string;
}>;
export declare const makeCancellation: (booking_ref: string) => {
    product_id: string;
    booking_ref: string;
    cancellation_ref: string;
    status: string;
};
