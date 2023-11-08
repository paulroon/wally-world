"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeBooking = exports.BookingRequestBody = void 0;
const zod_1 = require("zod");
//
// Booking
//
exports.BookingRequestBody = zod_1.z.object({
    confirmation_code: zod_1.z.string(),
});
const makeBooking = (confirmation_code) => {
    const [_, productId] = confirmation_code.split("_");
    return {
        product_id: productId,
        booking_ref: `BOOK_${productId}`,
        status: "Booked",
    };
};
exports.makeBooking = makeBooking;
//# sourceMappingURL=book.js.map