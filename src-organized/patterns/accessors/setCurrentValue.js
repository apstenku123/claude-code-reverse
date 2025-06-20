/**
 * Sets the current value and updates related global state variables.
 *
 * If the provided value is null, resets dependent global state variables to their default values.
 *
 * @param {*} newValue - The value to set as the current value. If null, resets related state.
 * @returns {void}
 */
function setCurrentValue(newValue) {
  // If the new value is null, reset dependent global state variables
  if (newValue === null) {
    globalDataCache = null;
    maxTimeout = -1;
    isLoaded = false;
  }
  // Set the current value global variable
  currentValue = newValue;
}

module.exports = setCurrentValue;