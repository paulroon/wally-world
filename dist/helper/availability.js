"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availabilityData = exports.addNDays = exports.AvailabilityRequestBody = void 0;
const zod_1 = require("zod");
const util_1 = require("./util");
//
// Availability
//
exports.AvailabilityRequestBody = zod_1.z.object({
    start_date: zod_1.z.string().optional(),
    end_date: zod_1.z.string().optional(),
    product_id: zod_1.z.string().optional(),
    quantity: zod_1.z.number().int().positive().optional(),
});
const addNDays = (date, n) => {
    const newDate = new Date(date); // Avoid mutating the original date
    newDate.setDate(newDate.getDate() + n);
    return newDate;
};
exports.addNDays = addNDays;
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
];
const availabilityData = (startDate, endDate, productId) => {
    const today = new Date();
    const start = startDate || today;
    const end = endDate || (0, exports.addNDays)(today, 23);
    return Array.from({ length: 24 }, (_, i) => {
        const dateToAdd = (0, exports.addNDays)(today, i);
        return {
            product_id: `P100${i}`,
            name: `Product [${i}]`,
            start_date: (0, util_1.formatDate)(dateToAdd),
            prices,
            capacity: 10,
        };
    }).filter((item) => {
        const itemDate = new Date(item.start_date);
        const isAfterStart = itemDate >= start;
        const isBeforeEnd = itemDate <= end;
        const isProductIdMatch = productId ? item.product_id === productId : true;
        return isAfterStart && isBeforeEnd && isProductIdMatch;
    });
};
exports.availabilityData = availabilityData;
//# sourceMappingURL=availability.js.map