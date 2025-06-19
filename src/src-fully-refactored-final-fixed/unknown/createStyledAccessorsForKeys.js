/**
 * Creates an object mapping each key from the global yO2 object to a property descriptor
 * with a getter that returns a styled accessor for that key.
 *
 * @returns {Object} An object where each property corresponds to a key in yO2, and its value is
 *                   a property descriptor with a getter that returns the result of createStyledAccessor([key]).
 */
function createStyledAccessorsForKeys() {
  const styledAccessors = {};

  // Iterate over each key in the yO2 object
  Object.keys(yO2).forEach(function (key) {
    // Assign a property descriptor with a getter for each key
    styledAccessors[key] = {
      get: function () {
        // Return a styled accessor for the current key
        return createStyledAccessor([key]);
      }
    };
  });

  return styledAccessors;
}

module.exports = createStyledAccessorsForKeys;