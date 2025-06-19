/**
 * Parses an observable data structure using event-driven callbacks, collects errors, and returns the root object.
 *
 * @param {any} sourceObservable - The observable or data source to parse.
 * @param {Array} errorList - (Optional) An array to collect error objects encountered during parsing.
 * @param {any} subscriptionOptions - (Optional) Options or configuration for the subscription, defaults to $i.DEFAULT.
 * @returns {any} The root object or array parsed from the observable structure.
 */
function parseObservableStructure(sourceObservable, errorList = [], subscriptionOptions = $i.DEFAULT) {
  let currentProperty = null; // Tracks the current property name when parsing objects
  let currentContainer = []; // The current object or array being constructed
  const containerStack = []; // Stack to keep track of nested containers

  /**
   * Inserts a value into the current container (object or array).
   * If the container is an array, pushes the value.
   * If the container is an object, assigns the value to the current property.
   * @param {any} value - The value to insert.
   */
  function insertValue(value) {
    if (Array.isArray(currentContainer)) {
      currentContainer.push(value);
    } else if (currentProperty !== null) {
      currentContainer[currentProperty] = value;
    }
  }

  parseJsonWithCallbacks(sourceObservable, {
    onObjectBegin: () => {
      const newObject = {};
      insertValue(newObject);
      containerStack.push(currentContainer); // Save the current container
      currentContainer = newObject; // Set new object as current
      currentProperty = null; // Reset property tracker
    },
    onObjectProperty: (propertyName) => {
      currentProperty = propertyName; // Set the property for the next value
    },
    onObjectEnd: () => {
      currentContainer = containerStack.pop(); // Restore previous container
    },
    onArrayBegin: () => {
      const newArray = [];
      insertValue(newArray);
      containerStack.push(currentContainer); // Save the current container
      currentContainer = newArray; // Set new array as current
      currentProperty = null; // Reset property tracker
    },
    onArrayEnd: () => {
      currentContainer = containerStack.pop(); // Restore previous container
    },
    onLiteralValue: insertValue, // Insert literal values directly
    onError: (error, offset, length) => {
      errorList.push({
        error,
        offset,
        length
      });
    }
  }, subscriptionOptions);

  // The root object/array is always the first element in the initial container
  return currentContainer[0];
}

module.exports = parseObservableStructure;