export function generateOTP(length: number = 6): string {
  const chars = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += chars[Math.floor(Math.random() * chars.length)];
  }
  return otp;
}

export function isOTPValid(
  storedOtp: string,
  expiration: Date,
  providedOtp: string
): boolean {
  return storedOtp === providedOtp && new Date() < expiration;
}
