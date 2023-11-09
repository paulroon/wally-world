"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const availability_1 = require("../helper/availability");
const reserve_1 = require("../helper/reserve");
const book_1 = require("../helper/book");
const cancel_1 = require("../helper/cancel");
const router = (0, express_1.Router)({ strict: true });
router.get("/", (req, res) => {
    res.send(`<div style="display: flex; align-items: center; justify-content: center;">
      <h2>Wally-World!</h2>
      <img src="https://i.etsystatic.com/20854952/r/il/4d1f39/2020697240/il_fullxfull.2020697240_5jck.jpg" width="500" />
    </div>`);
});
/**
 * Availability endpoint
 * Returns a list of products with their availability
 * Request body:
 * {
 *      start_date: string (optional),
 *      end_date: string (optional),
 *      product_id: string (optional),
 *      quantity: number (optional),
 * }
 */
router.post("/availability", (req, res) => {
    const reqData = availability_1.AvailabilityRequestBody.safeParse(req.body);
    if (!reqData.success) {
        return res.status(400).json(reqData.error);
    }
    const startDate = reqData.data.start_date ? new Date(reqData.data.start_date) : undefined;
    const endDate = reqData.data.end_date ? new Date(reqData.data.end_date) : undefined;
    return res.json((0, availability_1.availabilityData)(startDate, endDate, reqData.data.product_id));
});
router.get("/availability", (req, res) => {
    const today = new Date();
    const startDate = today;
    const endDate = (0, availability_1.addNDays)(today, 365);
    return res.json((0, availability_1.availabilityData)(startDate, endDate));
});
/**
 * Reserve endpoint
 * Returns a confirmation of the reservation or an error message
 * Request body:
 * {
 *     "product_id": string (required),
 *     "date": string (required),
 *     "quantity": number (required),
 * }
 */
router.post("/reserve", (req, res) => {
    const reqData = reserve_1.ReservationRequestBody.safeParse(req.body);
    if (!reqData.success) {
        return res.status(400).json(reqData.error);
    }
    res.json((0, reserve_1.makeReservation)(new Date(reqData.data.date), reqData.data.product_id, reqData.data.quantity));
});
/**
 * Book endpoint
 * Returns a booking confirmation or an error message
 * Request body:
 * {
 *     "confirmation_code": string (required)
 * }
 */
router.post("/book", (req, res) => {
    const reqData = book_1.BookingRequestBody.safeParse(req.body);
    if (!reqData.success) {
        return res.status(400).json(reqData.error);
    }
    res.json((0, book_1.makeBooking)(reqData.data.confirmation_code));
});
/**
 * Cancel endpoint
 * Returns a cancellation confirmation or an error message
 * Request body:
 * {
 *     "booking_ref": string (required)
 * }
 */
router.post("/cancel", (req, res) => {
    const reqData = cancel_1.CancelRequestBody.safeParse(req.body);
    if (!reqData.success) {
        return res.status(400).json(reqData.error);
    }
    res.json((0, cancel_1.makeCancellation)(reqData.data.booking_ref));
});
exports.default = router;
//# sourceMappingURL=index.js.map