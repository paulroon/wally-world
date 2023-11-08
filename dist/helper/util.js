"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
function formatDate(date) {
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
}
exports.formatDate = formatDate;
//# sourceMappingURL=util.js.map