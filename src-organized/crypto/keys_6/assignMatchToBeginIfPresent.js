/**
 * Assigns the 'match' property of the source object to 'begin', if present, and removes 'match'.
 * Throws an error if 'begin' or 'end' properties are already set, as they are not supported with 'match'.
 *
 * @param {Object} sourceObject - The object potentially containing 'match', 'begin', and 'end' properties.
 * @param {Object} config - Additional configuration object (currently unused).
 * @returns {void}
 * @throws {Error} If 'begin' or 'end' properties are present on the source object when 'match' is set.
 */
function assignMatchToBeginIfPresent(sourceObject, config) {
  // If there is no 'match' property, do nothing
  if (!sourceObject.match) return;

  // If 'begin' or 'end' are already set, throw an error as this combination is not supported
  if (sourceObject.begin || sourceObject.end) {
    throw new Error("begin & end are not supported with match");
  }

  // Assign 'match' value to 'begin' and remove 'match' property
  sourceObject.begin = sourceObject.match;
  delete sourceObject.match;
}

module.exports = assignMatchToBeginIfPresent;