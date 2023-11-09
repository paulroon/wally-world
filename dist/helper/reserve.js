"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeReservation = exports.ReservationRequestBody = void 0;
const zod_1 = require("zod");
//
// Reservation
//
exports.ReservationRequestBody = zod_1.z.object({
    date: zod_1.z.string(),
    product_id: zod_1.z.string(),
    quantity: zod_1.z.number().int().positive(),
});
const makeReservation = (date, productId, quantity) => {
    return {
        product_id: productId,
        confirmation_code: `RES_${productId}`,
        status: "confirmed",
    };
};
exports.makeReservation = makeReservation;
//# sourceMappingURL=reserve.js.map