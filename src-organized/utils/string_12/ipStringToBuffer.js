/**
 * Converts a dot-separated string of numbers (such as an IPv4 address) into a Buffer.
 *
 * @param {string} ipAddressString - a string containing numbers separated by dots (e.g., '192.168.0.1').
 * @returns {Buffer} a Buffer containing the numeric values from the input string.
 */
function ipStringToBuffer(ipAddressString) {
  // Split the input string by '.' to get an array of number strings
  const numberStrings = ipAddressString.split('.');

  // Convert each string to an integer
  const byteValues = numberStrings.map((numberString) => Number.parseInt(numberString, 10));

  // Create a Uint8Array from the array of integers
  const uint8Array = Uint8Array.from(byteValues);

  // Convert the Uint8Array to a Buffer and return
  return Buffer.from(uint8Array);
}

module.exports = ipStringToBuffer;