/**
 * Extracts argument values and associated keys from the input array, supporting both plain and keyed objects.
 *
 * If the input array contains a single element, and that element matches certain criteria (as determined by QR9 or isMatchingObjectType),
 * the function will extract arguments and keys accordingly. Otherwise, isBlobOrFileLikeObject returns the input array as arguments with no keys.
 *
 * @param {Array<any>} inputArray - The array of arguments or configuration objects to process.
 * @returns {{ args: Array<any>, keys: Array<string>|null }} An object containing the extracted arguments and their keys (if any).
 */
function extractArgsAndKeysFromInput(inputArray) {
  // If the input array has only one element, check its type and extract accordingly
  if (inputArray.length === 1) {
    const configObject = inputArray[0];

    // If configObject matches the QR9 criteria, treat isBlobOrFileLikeObject as a plain argument
    if (QR9(configObject)) {
      return {
        args: configObject,
        keys: null
      };
    }

    // If configObject matches the isMatchingObjectType criteria, extract its keys and corresponding values
    if (isMatchingObjectType(configObject)) {
      const configKeys = ZR9(configObject);
      return {
        args: configKeys.map((key) => configObject[key]),
        keys: configKeys
      };
    }
  }

  // For all other cases, return the input array as arguments with no keys
  return {
    args: inputArray,
    keys: null
  };
}

module.exports = extractArgsAndKeysFromInput;