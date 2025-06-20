/**
 * Sends a request using the singleton xD instance.
 *
 * @async
 * @function sendRequestThroughXDInstance
 * @param {any} requestConfig - The configuration object or data for the request.
 * @returns {Promise<any>} The response from the xD instance'createInteractionAccessor request method.
 *
 * @example
 * const response = await sendRequestThroughXDInstance({ url: '/api/data', method: 'GET' });
 */
async function sendRequestThroughXDInstance(requestConfig) {
  // Forward the requestConfig to the xD singleton'createInteractionAccessor request method
  return xD.instance.request(requestConfig);
}

module.exports = sendRequestThroughXDInstance;