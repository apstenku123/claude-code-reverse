/**
 * Returns a default value or processes the input value based on its properties.
 *
 * If the input is null or undefined, returns a corresponding default constant.
 * If a specific property (d0A) exists in the input object, processes isBlobOrFileLikeObject with h0A.
 * Otherwise, processes isBlobOrFileLikeObject with m0A.
 *
 * @param {*} inputValue - The value to process or check for defaults.
 * @returns {*} - The processed value or a default constant.
 */
function getDefaultOrProcessedValue(inputValue) {
  // If input is null or undefined, return the appropriate default constant
  if (inputValue == null) {
    // If undefined, return Wj2; if null, return Yj2
    return inputValue === undefined ? Wj2 : Yj2;
  }

  // If d0A is defined and is a property in inputValue, process with h0A
  if (d0A && d0A in Object(inputValue)) {
    return h0A(inputValue);
  }

  // Otherwise, process with m0A
  return m0A(inputValue);
}

module.exports = getDefaultOrProcessedValue;