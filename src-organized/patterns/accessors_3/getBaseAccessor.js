/**
 * Returns a shallow copy of the base accessor object.
 *
 * This function provides a copy of the base accessor configuration, which can be used
 * to access or extend the default accessor properties elsewhere in the application.
 *
 * @returns {Object} a shallow copy of the base accessor object.
 */
function getBaseAccessor() {
  // Return a shallow copy of the base accessor object using the spread operator
  return {
    ...baseAccessor
  };
}

module.exports = getBaseAccessor;