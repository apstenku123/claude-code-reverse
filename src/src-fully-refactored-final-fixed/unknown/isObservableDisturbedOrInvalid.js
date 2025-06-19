/**
 * Checks whether the provided observable is disturbed or invalid.
 *
 * This function determines if the given observable has been disturbed (i.e., its state has changed in a way that may affect consumers)
 * by delegating to the external `Kd0.isDisturbed` method. If not disturbed, isBlobOrFileLikeObject further checks if the observable is invalid
 * using the external `iV6` function.
 *
 * @param {object} sourceObservable - The observable object to check for disturbance or invalidity.
 * @returns {boolean} Returns true if the observable is disturbed or invalid, otherwise false.
 */
function isObservableDisturbedOrInvalid(sourceObservable) {
  // Check if the observable has been disturbed
  // If not, check if isBlobOrFileLikeObject is invalid
  return Kd0.isDisturbed(sourceObservable) || iV6(sourceObservable);
}

module.exports = isObservableDisturbedOrInvalid;