/**
 * Initializes an object using the createM7Instance utility function and sets its 'lanes' property.
 *
 * @param {any} baseObject - The object to initialize and modify.
 * @param {any} updateValue - The value to use during initialization.
 * @param {any} lanesValue - The value to assign to the 'lanes' property of the object.
 * @param {any} context - Additional context or configuration for initialization.
 * @returns {any} The initialized object with the 'lanes' property set.
 */
function initializeObjectWithLanes(baseObject, updateValue, lanesValue, context) {
  // Initialize the object using the createM7Instance utility function
  const initializedObject = createM7Instance(7, baseObject, context, updateValue);
  // Set the 'lanes' property on the initialized object
  initializedObject.lanes = lanesValue;
  return initializedObject;
}

module.exports = initializeObjectWithLanes;