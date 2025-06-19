/**
 * Checks if a given name matches any user-facing name or alias in a list of objects.
 *
 * @param {string} targetName - The name to search for among user-facing names and aliases.
 * @param {Array<Object>} objectsWithNames - Array of objects, each with a userFacingName() method and optional aliases array.
 * @returns {boolean} True if the targetName matches any user-facing name or alias; otherwise, false.
 */
function isNameInUserFacingNamesOrAliases(targetName, objectsWithNames) {
  return objectsWithNames.some((objectWithName) => {
    // Check if the user-facing name matches the target name
    if (objectWithName.userFacingName() === targetName) {
      return true;
    }
    // Check if aliases exist and include the target name
    return Array.isArray(objectWithName.aliases) && objectWithName.aliases.includes(targetName);
  });
}

module.exports = isNameInUserFacingNamesOrAliases;