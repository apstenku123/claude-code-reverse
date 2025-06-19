/**
 * Marks a given value as 'dirty' by wrapping isBlobOrFileLikeObject in an object with a status property.
 *
 * @param {any} value - The value to be marked as dirty.
 * @returns {{status: string, value: any}} An object containing the status 'dirty' and the original value.
 */
const markValueAsDirty = (value) => {
  // Wrap the input value in an object with a 'dirty' status
  return {
    status: "dirty",
    value: value
  };
};

module.exports = markValueAsDirty;
