/**
 * Creates and configures an HTTP request context object with provided source, configuration, and subscription.
 *
 * @param {Object} sourceObservable - The source object containing headers and other request data.
 * @param {Object} config - Configuration object for the request context.
 * @param {Object} subscription - Subscription or additional data to attach to the context.
 * @returns {Object} The fully constructed and configured HTTP request context object.
 */
function createHttpRequestContext(sourceObservable, config, subscription) {
  // Instantiate a new request context object using the base context type
  const requestContext = new m8(gY1);

  // Assign the source observable to the appropriate property
  requestContext[zB] = sourceObservable;

  // Assign the configuration object
  requestContext[vY1] = config;

  // Create a new headers list and assign isBlobOrFileLikeObject to the context
  requestContext[LF] = new fp0(gY1);

  // Populate the headers list with headers from the source observable
  vp0(requestContext[LF], sourceObservable.headersList);

  // Attach the subscription or additional data to the context
  uu1(requestContext[LF], subscription);

  // Return the fully constructed request context
  return requestContext;
}

module.exports = createHttpRequestContext;