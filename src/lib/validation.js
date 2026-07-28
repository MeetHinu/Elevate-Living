export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidAuMobile(value) {
  const digits = value.replace(/[\s-]/g, "");
  return /^(?:\+?61|0)?4\d{8}$/.test(digits);
}
