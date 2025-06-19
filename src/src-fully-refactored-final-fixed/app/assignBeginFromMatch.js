/**
 * Assigns the value of the 'match' property to 'begin' on the given route object, if present.
 * Throws an error if 'begin' or 'end' properties are already set, as they are not supported with 'match'.
 *
 * @param {Object} routeObject - The route object to process. May contain 'match', 'begin', or 'end' properties.
 * @param {Object} options - Additional configuration options (currently unused).
 * @returns {void}
 * @throws {Error} If 'begin' or 'end' properties are set on the route object.
 */
function assignBeginFromMatch(routeObject, options) {
  // If there is no 'match' property, do nothing
  if (!routeObject.match) return;

  // If 'begin' or 'end' are already set, throw an error
  if (routeObject.begin || routeObject.end) {
    throw new Error("begin & end are not supported with match");
  }

  // Assign the value of 'match' to 'begin' and remove 'match'
  routeObject.begin = routeObject.match;
  delete routeObject.match;
}

module.exports = assignBeginFromMatch;