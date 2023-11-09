import { z } from "zod";
export declare const ReservationRequestBody: z.ZodObject<{
    date: z.ZodString;
    product_id: z.ZodString;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    product_id: string;
    quantity: number;
    date: string;
}, {
    product_id: string;
    quantity: number;
    date: string;
}>;
export declare const makeReservation: (date: Date, productId: string, quantity: number) => {
    product_id: string;
    confirmation_code: string;
    status: string;
};
