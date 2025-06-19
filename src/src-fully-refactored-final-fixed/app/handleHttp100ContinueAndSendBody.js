/**
 * Handles HTTP '100-continue' expectation: waits for 'continue' or 'error' events before sending the request body.
 *
 * @async
 * @function handleHttp100ContinueAndSendBody
 * @param {object} requestStream - The HTTP request stream (e.g., http.ClientRequest) to listen for events on.
 * @param {object} createRequestOptions - The request options object, expected to have 'headers' and 'body' properties.
 * @param {number} [continueTimeout=M82] - Optional timeout in milliseconds to wait for the 'continue' event before proceeding (defaults to global M82).
 * @returns {Promise<void>} Resolves when the body has been sent or an error occurred.
 */
async function handleHttp100ContinueAndSendBody(requestStream, createRequestOptions, continueTimeout = M82) {
  // Extract headers from createRequestOptions, defaulting to an empty object if not present
  const headers = createRequestOptions.headers ?? {};
  // Check for 'Expect: 100-continue' header (case-insensitive)
  const expectHeader = headers.Expect || headers.expect;

  let timeoutId = -1;
  let encounteredError = false;

  // If the client expects a '100-continue' response, wait for either 'continue' or 'error' event, or timeout
  if (expectHeader === "100-continue") {
    await Promise.race([
      // Timeout promise: resolves after the specified timeout
      new Promise(resolve => {
        timeoutId = Number(setTimeout(resolve, Math.max(M82, continueTimeout)));
      }),
      // Event promise: resolves on 'continue' or 'error' event
      new Promise(resolve => {
        requestStream.on("continue", () => {
          clearTimeout(timeoutId);
          resolve();
        });
        requestStream.on("error", () => {
          encounteredError = true;
          clearTimeout(timeoutId);
          resolve();
        });
      })
    ]);
  }

  // Only send the body if no error was encountered during the wait
  if (!encounteredError) {
    j82(requestStream, createRequestOptions.body);
  }
}

module.exports = handleHttp100ContinueAndSendBody;