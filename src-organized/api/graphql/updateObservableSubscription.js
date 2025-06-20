/**
 * Updates the observable'createInteractionAccessor subscriptions or value based on the configuration type.
 *
 * @param {Array} observableData - The observable data structure to update. The structure is expected to be an array where:
 *   - observableData[0] is a numeric value (e.g., a count or state)
 *   - observableData[1] and observableData[2] are arrays (e.g., lists of subscriptions)
 * @param {number} updateType - Determines how to update the observable:
 *   - 0: Increment the first element by the subscription value
 *   - 1 or 2: Push the subscription into the corresponding array at index 1 or 2
 * @param {*} subscription - The value to add or push, depending on the updateType
 * @returns {*} The result of calling getArrayOrBufferLength on the updated element
 */
function updateObservableSubscription(observableData, updateType, subscription) {
  switch (updateType) {
    case 0:
      // Increment the first element by the subscription value
      observableData[0] += subscription;
      return getArrayOrBufferLength(observableData[0]);
    case 1:
    case 2:
      // Push the subscription into the corresponding array (index 1 or 2)
      observableData[updateType].push(subscription);
      return getArrayOrBufferLength(observableData[updateType]);
    default:
      // Optionally handle unexpected updateType values
      throw new Error(`Invalid updateType: ${updateType}`);
  }
}

module.exports = updateObservableSubscription;