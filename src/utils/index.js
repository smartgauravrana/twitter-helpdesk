export const isEmpty = value =>
  value === null ||
  value === undefined ||
  (Array.isArray(value) && !value.length) ||
  (typeof value === "object" && !Object.keys(value).length) ||
  (typeof value === "string" && !value.trim().length);