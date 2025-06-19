/**
 * Checks if the provided value is a Vue.js instance or a Vue component object.
 *
 * This function determines if the input is a non-null object and contains either
 * the '__isVue' or '_isVue' property, which are commonly used by Vue.js to flag
 * Vue instances or components.
 *
 * @param {object} possibleVueObject - The value to check for Vue instance/component markers.
 * @returns {boolean} True if the value is a Vue instance or component, false otherwise.
 */
function isVueInstance(possibleVueObject) {
  // Ensure the value is an object and not null
  const isObject = typeof possibleVueObject === "object" && possibleVueObject !== null;

  // Check for Vue-specific flags
  const hasVueFlag = isObject && (possibleVueObject.__isVue || possibleVueObject._isVue);

  // Return true if both conditions are met
  return !!hasVueFlag;
}

module.exports = isVueInstance;