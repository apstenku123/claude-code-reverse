/**
 * Processes the input value with an optional transformation and applies a handler based on the input type.
 *
 * @param {any} inputValue - The main value to process.
 * @param {any} transformValue - The value to be transformed or used as-is, depending on conditions.
 * @param {any} optionalKey - An optional key or flag that determines processing logic.
 * @returns {any} The result of applying the selected handler to the processed input and value.
 */
function processInputWithOptionalTransform(inputValue, transformValue, optionalKey) {
  // If optionalKey is provided and resetCustomErrorHandler returns truthy, or transformValue equals sourceObservable,
  // set transformValue to 1. Otherwise, transform transformValue using transformValueTransformer.
  if (optionalKey ? resetCustomErrorHandler(inputValue, transformValue, optionalKey) : transformValue === sourceObservable) {
    transformValue = 1;
  } else {
    transformValue = transformValueTransformer(transformValue);
  }

  // Select the handler function based on whether inputValue is of a certain type.
  const handler = isInputValueSpecialType(inputValue) ? specialTypeHandler : defaultHandler;

  // Apply the handler to the inputValue and the (possibly transformed) transformValue.
  return handler(inputValue, transformValue);
}

module.exports = processInputWithOptionalTransform;
