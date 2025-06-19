/**
 * Merges additional context information (request, user, ip, transaction) into the given event object.
 *
 * @param {Object} event - The event object to be enriched with additional context.
 * @param {Object} sourceContext - The source context object containing potential user, ip, and other info.
 * @param {Object} [options] - Optional configuration for what context to include and dependency info.
 * @param {Object} [options.include] - Specifies which context fields to include (request, user, ip, transaction).
 * @param {Array} [options.deps] - Optional dependencies to pass to extractRequestData.
 * @returns {Object} The enriched event object with merged context fields.
 */
function mergeEventContext(event, sourceContext, options) {
  // Merge default context options with any includes specified in options
  const contextOptions = {
    ...jp2,
    ...(options && options.include)
  };

  // Merge request context if specified
  if (contextOptions.request) {
    // If request is an array, pass isBlobOrFileLikeObject as 'include' to extractRequestData, otherwise just pass deps
    const requestContext = Array.isArray(contextOptions.request)
      ? extractRequestData(sourceContext, {
          include: contextOptions.request,
          deps: options && options.deps
        })
      : extractRequestData(sourceContext, {
          deps: options && options.deps
        });
    event.request = {
      ...event.request,
      ...requestContext
    };
  }

  // Merge user context if specified
  if (contextOptions.user) {
    // Only merge if sourceContext.user is a plain object
    const userContext = sourceContext.user && L5A.a(sourceContext.user)
      ? fp2(sourceContext.user, contextOptions.user)
      : {};
    if (Object.keys(userContext).length) {
      event.user = {
        ...event.user,
        ...userContext
      };
    }
  }

  // Merge IP address if specified
  if (contextOptions.ip) {
    // Prefer sourceContext.ip, fallback to sourceContext.socket.remoteAddress
    const ipAddress = sourceContext.ip || (sourceContext.socket && sourceContext.socket.remoteAddress);
    if (ipAddress) {
      event.user = {
        ...event.user,
        ip_address: ipAddress
      };
    }
  }

  // Merge transaction context if specified and not already present
  if (contextOptions.transaction && !event.transaction) {
    event.transaction = extractRouteInfo(sourceContext, contextOptions.transaction);
  }

  return event;
}

module.exports = mergeEventContext;