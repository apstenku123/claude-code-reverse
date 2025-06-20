/**
 * Maps the provided observable to emit only ErrorEvent instances.
 *
 * @param {Observable} sourceObservable - The observable to be mapped.
 * @returns {Observable} An observable that emits only ErrorEvent instances from the source.
 */
function mapToErrorEvent(sourceObservable) {
  // Use the external 'isObjectType' function to filter/map to ErrorEvent
  return isObjectType(sourceObservable, "ErrorEvent");
}

module.exports = mapToErrorEvent;