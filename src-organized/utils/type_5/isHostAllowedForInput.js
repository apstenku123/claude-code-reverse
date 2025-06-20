/**
 * Determines if a given input is allowed based on a host check.
 *
 * If the input is exactly true, returns true immediately.
 * If the input is an array, returns true if any element in the array passes the KEY() host check.
 * Otherwise, returns false.
 *
 * @param {boolean|Array<any>} input - Either a boolean flag or an array of items to check.
 * @param {string} urlString - The URL string whose host will be checked against the input array.
 * @returns {boolean} True if the input is allowed based on the host check, false otherwise.
 */
function isHostAllowedForInput(input, urlString) {
  // Parse the URL to extract the host
  const url = new URL(urlString);

  // If input is strictly true, allow immediately
  if (input === true) {
    return true;
  }

  // If input is an array, check if any element passes the KEY() host check
  if (Array.isArray(input) && input.some(element => KEY(element, url.host))) {
    return true;
  }

  // Otherwise, not allowed
  return false;
}

module.exports = isHostAllowedForInput;