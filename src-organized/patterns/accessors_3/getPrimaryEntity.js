/**
 * Retrieves the primary entity value from the module scope.
 *
 * @returns {*} The current value of primaryEntity.
 */
function getPrimaryEntity() {
  // Return the primary entity value (imported or defined elsewhere)
  return primaryEntity;
}

module.exports = getPrimaryEntity;