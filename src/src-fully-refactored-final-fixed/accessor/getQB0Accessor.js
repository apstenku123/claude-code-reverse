/**
 * Returns a shallow copy of the qB0 object.
 *
 * This accessor function provides a safe way to retrieve the current state of qB0
 * without exposing the original object to direct mutation.
 *
 * @returns {Object} a shallow copy of the qB0 object.
 */
const getQB0Accessor = () => {
  // Return a shallow copy of qB0 to prevent external mutations
  return {
    ...qB0
  };
};

module.exports = getQB0Accessor;