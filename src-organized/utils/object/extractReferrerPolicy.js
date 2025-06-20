/**
 * Extracts the 'referrerPolicy' property from the given object.
 *
 * @param {Object} sourceObject - The object from which to extract the referrerPolicy property.
 * @returns {Object} An object containing only the referrerPolicy property from the source object.
 */
function extractReferrerPolicy(sourceObject) {
  // Return a new object with only the referrerPolicy property
  return {
    referrerPolicy: sourceObject.referrerPolicy
  };
}

module.exports = extractReferrerPolicy;