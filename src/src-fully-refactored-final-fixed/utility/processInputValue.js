/**
 * Processes the input value based on its type.
 *
 * If the input is an observable (as determined by isObservable),
 * isBlobOrFileLikeObject first gets the observable'createInteractionAccessor value (getObservableValue),
 * then processes isBlobOrFileLikeObject with processObservableValue.
 * If the input is not an observable, isBlobOrFileLikeObject processes the value directly with processNonObservableValue.
 *
 * @param {any} inputValue - The value to process, which may be an observable or a direct value.
 * @returns {any} The processed value, either from the observable or directly.
 */
function processInputValue(inputValue) {
  // Check if the input is an observable
  if (isObservable(inputValue)) {
    // Get the value from the observable and process isBlobOrFileLikeObject
    const observableValue = getObservableValue(inputValue);
    return processObservableValue(observableValue);
  } else {
    // Process the non-observable value directly
    return processNonObservableValue(inputValue);
  }
}

module.exports = processInputValue;