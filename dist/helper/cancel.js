"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCancellation = exports.CancelRequestBody = void 0;
const zod_1 = require("zod");
//
// Cancel
//
exports.CancelRequestBody = zod_1.z.object({
    booking_ref: zod_1.z.string(),
});
const makeCancellation = (booking_ref) => {
    const [_, productId] = booking_ref.split("_");
    return {
        product_id: productId,
        booking_ref: `BOOK_${productId}`,
        cancellation_ref: `CANCEL_${productId}`,
        status: "Cancelled",
    };
};
exports.makeCancellation = makeCancellation;
//# sourceMappingURL=cancel.js.map