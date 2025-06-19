/**
 * Determines the type descriptor of a given value using a custom type mapping object (T2).
 * Handles primitives, arrays, promises, maps, sets, dates, null, NaN, and unknown types.
 *
 * @param {any} value - The value whose type descriptor is to be determined.
 * @returns {any} - The corresponding type descriptor from the T2 mapping object.
 */
function getTypeDescriptor(value) {
  switch (typeof value) {
    case "undefined":
      return T2.undefined;
    case "string":
      return T2.string;
    case "number":
      // Check for NaN explicitly
      return isNaN(value) ? T2.nan : T2.number;
    case "boolean":
      return T2.boolean;
    case "function":
      return T2.function;
    case "bigint":
      return T2.bigint;
    case "symbol":
      return T2.symbol;
    case "object":
      // Check for array
      if (Array.isArray(value)) {
        return T2.array;
      }
      // Check for null
      if (value === null) {
        return T2.null;
      }
      // Check for Promise-like objects (thenable and catchable)
      if (
        value.then && typeof value.then === "function" &&
        value.catch && typeof value.catch === "function"
      ) {
        return T2.promise;
      }
      // Check for Map instance
      if (typeof Map !== "undefined" && value instanceof Map) {
        return T2.map;
      }
      // Check for Set instance
      if (typeof Set !== "undefined" && value instanceof Set) {
        return T2.set;
      }
      // Check for Date instance
      if (typeof Date !== "undefined" && value instanceof Date) {
        return T2.date;
      }
      // Default object
      return T2.object;
    default:
      return T2.unknown;
  }
}

module.exports = getTypeDescriptor;
