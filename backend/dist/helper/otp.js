"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOTPValid = exports.generateOTP = void 0;
function generateOTP(length = 6) {
    const chars = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += chars[Math.floor(Math.random() * chars.length)];
    }
    return otp;
}
exports.generateOTP = generateOTP;
function isOTPValid(storedOtp, expiration, providedOtp) {
    return storedOtp === providedOtp && new Date() < expiration;
}
exports.isOTPValid = isOTPValid;
