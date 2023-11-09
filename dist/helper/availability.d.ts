import { z } from "zod";
export declare const AvailabilityRequestBody: z.ZodObject<{
    start_date: z.ZodOptional<z.ZodString>;
    end_date: z.ZodOptional<z.ZodString>;
    product_id: z.ZodOptional<z.ZodString>;
    quantity: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    start_date?: string | undefined;
    end_date?: string | undefined;
    product_id?: string | undefined;
    quantity?: number | undefined;
}, {
    start_date?: string | undefined;
    end_date?: string | undefined;
    product_id?: string | undefined;
    quantity?: number | undefined;
}>;
export declare const addNDays: (date: Date, n: number) => Date;
export declare const availabilityData: (startDate?: Date, endDate?: Date, productId?: string) => {
    product_id: string;
    name: string;
    start_date: string;
    prices: {
        type: string;
        currency: string;
        amount: number;
    }[];
    capacity: number;
}[];
