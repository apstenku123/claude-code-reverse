/**
 * Processes the input value with optional transformation and applies a handler based on the input type.
 *
 * If a transformation key is provided, isBlobOrFileLikeObject attempts to transform the input using the provided transformation function.
 * If no key is provided and the input equals the default value, the input is set to 1.
 * Otherwise, the input is normalized using the normalization function.
 * Then, depending on the type of the input, a handler function is selected and invoked.
 *
 * @param {any} inputValue - The value to process and transform.
 * @param {any} inputOption - The option or flag that may trigger transformation or normalization.
 * @param {any} transformationKey - Optional key or flag to determine if transformation should occur.
 * @returns {any} The result of processing the input with the selected handler.
 */
function processInputWithOptionalTransformation(inputValue, inputOption, transformationKey) {
  // If a transformation key is provided, attempt to transform inputOption using resetCustomErrorHandler
  // Otherwise, if inputOption equals the default value (a), set inputOption to 1
  // If neither, normalize inputOption using k4
  if (transformationKey ? resetCustomErrorHandler(inputValue, inputOption, transformationKey) : inputOption === mapInteractionsToRoutes) {
    inputOption = 1;
  } else {
    inputOption = k4(inputOption);
  }

  // Select the handler based on the type of inputValue
  // If d2(inputValue) is true, use shuffleTransformedArraySubset; otherwise, use processAndTransformInput
  const handler = d2(inputValue) ? shuffleTransformedArraySubset : processAndTransformInput;

  // Process the inputValue with the (possibly transformed) inputOption
  return handler(inputValue, inputOption);
}

module.exports = processInputWithOptionalTransformation;