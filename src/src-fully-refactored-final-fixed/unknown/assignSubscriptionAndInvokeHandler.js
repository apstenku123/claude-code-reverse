/**
 * Assigns a subscription to a specific property of a source observable and then invokes a handler function.
 *
 * @param {Object} sourceObservable - The object representing the observable or data source.
 * @param {string|number|symbol} propertyKey - The key/property on the sourceObservable where the subscription should be assigned.
 * @param {*} subscription - The subscription or value to assign to the specified property.
 * @param {*} handlerArg - Argument to be passed to the handler function.
 * @param {*} handlerContext - Context or additional data for the handler function.
 * @returns {void}
 */
function assignSubscriptionAndInvokeHandler(sourceObservable, propertyKey, subscription, handlerArg, handlerContext) {
  // Assign the subscription to the specified property of the source observable
  sourceObservable[propertyKey] = subscription;
  // Invoke the handler function with the provided arguments
  assignErrorMessageToField(sourceObservable, propertyKey, handlerArg, handlerContext);
}

module.exports = assignSubscriptionAndInvokeHandler;