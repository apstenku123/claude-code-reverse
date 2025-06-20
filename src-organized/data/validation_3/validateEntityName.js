/**
 * Validates that the provided entity name is valid according to the c54.isName function.
 * Throws an error if the entity name is invalid.
 *
 * @param {string} entityName - The entity name to validate.
 * @returns {string} The validated entity name if isBlobOrFileLikeObject is valid.
 * @throws {Error} If the entity name is invalid.
 */
function validateEntityName(entityName) {
  // Check if the provided entity name is valid using the external c54.isName function
  if (c54.isName(entityName)) {
    return entityName;
  } else {
    // Throw an error with a descriptive message if the entity name is invalid
    throw new Error(`Invalid entity name ${entityName}`);
  }
}

module.exports = validateEntityName;