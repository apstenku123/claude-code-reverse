/**
 * Determines if a given value is of a specified JavaScript type.
 *
 * @param {string} expectedType - The JavaScript type to check against (e.g., 'string', 'number', 'object').
 * @returns {function(any): boolean} - a function that takes a value and returns true if its type matches expectedType.
 */
const isTypeOf = (expectedType) => (value) => typeof value === expectedType;

module.exports = isTypeOf;
