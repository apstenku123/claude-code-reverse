/**
 * Adds request data to an event, including additional subscription options if provided.
 *
 * @param {Object} sourceObservable - The observable or source object to which the request data relates.
 * @param {Object} config - Configuration object for the request/event.
 * @param {Object} [subscription={}] - Optional subscription options to include in the event data.
 * @returns {any} The result of YDA.addRequestDataToEvent with the provided parameters.
 */
function addRequestDataToEventWithInclude(sourceObservable, config, subscription = {}) {
  // Call the external YDA method, passing the subscription options under the 'include' key
  return YDA.addRequestDataToEvent(sourceObservable, config, {
    include: subscription
  });
}

module.exports = addRequestDataToEventWithInclude;