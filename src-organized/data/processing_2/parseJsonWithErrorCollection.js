/**
 * Parses a JSON-like structure from a token stream, building the corresponding JS object/array,
 * and collects any parsing errors encountered during the process.
 *
 * @param {any} tokenStream - The input token stream or source to parse.
 * @param {Array<Object>} [errors=[]] - Optional array to collect error objects encountered during parsing.
 * @param {Object} [options=$i.DEFAULT] - Optional parsing options to customize behavior.
 * @returns {any} The parsed JavaScript object or array, or undefined if parsing fails.
 */
function parseJsonWithErrorCollection(tokenStream, errors = [], options = $i.DEFAULT) {
  let currentProperty = null; // Tracks the current property name when parsing objects
  let currentContainer = [];  // The current object or array being built
  let containerStack = [];    // Stack to keep track of nested containers

  /**
   * Adds a value to the current container (object or array) at the appropriate location.
   * @param {any} value - The value to add to the current container.
   */
  function addValueToContainer(value) {
    if (Array.isArray(currentContainer)) {
      // If current container is an array, push the value
      currentContainer.push(value);
    } else if (currentProperty !== null) {
      // If current container is an object, assign value to the current property
      currentContainer[currentProperty] = value;
    }
  }

  // Begin parsing using the provided parser with event callbacks
  parseJsonWithCallbacks(tokenStream, {
    onObjectBegin: () => {
      const newObject = {};
      addValueToContainer(newObject);
      containerStack.push(currentContainer); // Save current container to stack
      currentContainer = newObject;          // Set new object as current container
      currentProperty = null;                // Reset property tracker
    },
    onObjectProperty: propertyName => {
      currentProperty = propertyName;        // Set the property name for the next value
    },
    onObjectEnd: () => {
      currentContainer = containerStack.pop(); // Restore previous container
    },
    onArrayBegin: () => {
      const newArray = [];
      addValueToContainer(newArray);
      containerStack.push(currentContainer);  // Save current container to stack
      currentContainer = newArray;            // Set new array as current container
      currentProperty = null;                 // Reset property tracker
    },
    onArrayEnd: () => {
      currentContainer = containerStack.pop(); // Restore previous container
    },
    onLiteralValue: addValueToContainer,       // Add literal value to current container
    onError: (error, offset, length) => {
      // Collect error details into the errors array
      errors.push({
        error,
        offset,
        length
      });
    }
  }, options);

  // The root value is always the first element of the top-level array
  return currentContainer[0];
}

module.exports = parseJsonWithErrorCollection;