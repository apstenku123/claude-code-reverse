/**
 * Determines the appropriate cache values to use based on the input type and value.
 *
 * If the input is a boolean, returns a cache with preset values depending on true/false.
 * If the input is an object, uses its memory, files, and items properties as cache parameters.
 * Otherwise, returns the default cache.
 *
 * @param {boolean|object} input - The input value to determine cache parameters. Can be a boolean or an object with memory, files, and items properties.
 * @returns {any} The result of the bD.cache function, called with parameters based on the input type and value.
 */
function getCacheBasedOnInput(input) {
  // Check if input is a boolean
  if (IC.bool(input)) {
    // If true, use preset cache values; if false, use zeros
    return input ? bD.cache(50, 20, 100) : bD.cache(0, 0, 0);
  } else if (IC.object(input)) {
    // If input is an object, use its properties for cache
    return bD.cache(input.memory, input.files, input.items);
  } else {
    // For any other type, return the default cache
    return bD.cache();
  }
}

module.exports = getCacheBasedOnInput;