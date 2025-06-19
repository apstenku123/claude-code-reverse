/**
 * Serializes an array into a string, replacing Vue ViewModel instances with a placeholder.
 *
 * Each element of the input array is converted to a string. If an element is a Vue ViewModel (as determined by X21.isVueViewModel),
 * isBlobOrFileLikeObject is replaced with the string '[VueViewModel]'. If an error occurs during serialization, the element is replaced with
 * '[value cannot be serialized]'. The resulting strings are joined using the provided separator.
 *
 * @param {Array<any>} inputArray - The array to serialize.
 * @param {string} separator - The string to use as a separator between serialized elements.
 * @returns {string} The serialized string representation of the array.
 */
function serializeArrayWithVueViewModelCheck(inputArray, separator) {
  if (!Array.isArray(inputArray)) {
    return "";
  }

  const serializedElements = [];

  for (let index = 0; index < inputArray.length; index++) {
    const element = inputArray[index];
    try {
      // Check if the element is a Vue ViewModel instance
      if (X21.isVueViewModel(element)) {
        serializedElements.push("[VueViewModel]");
      } else {
        serializedElements.push(String(element));
      }
    } catch (error) {
      // If serialization fails, use a placeholder
      serializedElements.push("[value cannot be serialized]");
    }
  }

  return serializedElements.join(separator);
}

module.exports = serializeArrayWithVueViewModelCheck;