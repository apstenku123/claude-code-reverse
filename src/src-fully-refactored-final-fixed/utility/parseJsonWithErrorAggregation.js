/**
 * Parses a JSON-like input using a callback-driven parser, building the resulting object/array structure and aggregating any parsing errors.
 *
 * @param {string} jsonString - The JSON-like string to parse.
 * @param {Array<Object>} [errors=[]] - An array to collect error objects encountered during parsing.
 * @param {Object} [options=$i.DEFAULT] - Optional parser configuration options.
 * @returns {any} The parsed JavaScript object or array, or undefined if parsing fails.
 */
function parseJsonWithErrorAggregation(jsonString, errors = [], options = $i.DEFAULT) {
  let currentProperty = null; // Tracks the current property name when parsing objects
  let currentContainer = [];  // The current object or array being constructed
  const containerStack = [];  // Stack to keep track of nested containers

  /**
   * Aggregates values into the current container, handling both arrays and objects.
   * @param {any} value - The value to add to the current container.
   */
  function aggregateValue(value) {
    if (Array.isArray(currentContainer)) {
      // If the current container is an array, push the value
      currentContainer.push(value);
    } else if (currentProperty !== null) {
      // If the current container is an object, assign the value to the current property
      currentContainer[currentProperty] = value;
    }
  }

  // Use the parser with callbacks for each structural event
  parseJsonWithCallbacks(jsonString, {
    onObjectBegin: () => {
      const newObject = {};
      aggregateValue(newObject); // Add the new object to the parent container
      containerStack.push(currentContainer); // Save the parent container
      currentContainer = newObject; // Set the new object as the current container
      currentProperty = null; // Reset property tracker
    },
    onObjectProperty: (propertyName) => {
      currentProperty = propertyName; // Set the property name for the next value
    },
    onObjectEnd: () => {
      currentContainer = containerStack.pop(); // Restore the parent container
    },
    onArrayBegin: () => {
      const newArray = [];
      aggregateValue(newArray); // Add the new array to the parent container
      containerStack.push(currentContainer); // Save the parent container
      currentContainer = newArray; // Set the new array as the current container
      currentProperty = null; // Reset property tracker
    },
    onArrayEnd: () => {
      currentContainer = containerStack.pop(); // Restore the parent container
    },
    onLiteralValue: aggregateValue, // Add literal values (strings, numbers, etc.)
    onError: (error, offset, length) => {
      // Collect error details in the errors array
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

module.exports = parseJsonWithErrorAggregation;