/**
 * Processes the input value based on the presence of a key and applies a transformation.
 *
 * If the key is provided and resetCustomErrorHandler returns true, uses the original value. If not, checks if the value equals the default value (processInteractionEntries), and if so, sets isBlobOrFileLikeObject to 1. Otherwise, transforms the value using k4.
 * Then, selects a transformation function based on whether the input is of a certain type (d2). Finally, applies the selected transformation to the input and processed value.
 *
 * @param {any} inputValue - The main input value to process and transform.
 * @param {any} valueToProcess - The value to be checked or transformed.
 * @param {any} key - Optional key used for conditional logic.
 * @returns {any} The result of applying the selected transformation function to the input and processed value.
 */
function processAndTransformInput(inputValue, valueToProcess, key) {
  // If key is provided and resetCustomErrorHandler returns true, use valueToProcess as is.
  // Otherwise, if valueToProcess equals the default (processInteractionEntries), set to 1.
  // Else, transform valueToProcess using k4.
  if (key ? resetCustomErrorHandler(inputValue, valueToProcess, key) : valueToProcess === processInteractionEntries) {
    valueToProcess = 1;
  } else {
    valueToProcess = k4(valueToProcess);
  }

  // Select transformation function based on the type of inputValue
  const transformationFunction = d2(inputValue) ? shuffleTransformedArraySubset : applySubstringAndTransform;

  // Apply the selected transformation function
  return transformationFunction(inputValue, valueToProcess);
}

module.exports = processAndTransformInput;