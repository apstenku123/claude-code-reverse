/**
 * Handles HTTP '100-continue' expectation for incoming requests.
 * If the 'Expect: 100-continue' header is present, waits for either the 'continue' event or a timeout before proceeding.
 * If no error occurs, writes the request body using the provided utility.
 *
 * @async
 * @param {object} requestStream - The incoming request stream (e.g., http.IncomingMessage).
 * @param {object} createRequestOptions - The request options, including headers and body.
 * @param {number} [continueTimeout=M82] - Optional timeout in milliseconds to wait for 'continue' event. Defaults to M82.
 * @returns {Promise<void>} Resolves when the body is written or an error/timeout occurs.
 */
async function handleHttp100Continue(requestStream, createRequestOptions, continueTimeout = M82) {
  // Extract headers from createRequestOptions, defaulting to an empty object if not present
  const headers = createRequestOptions.headers ?? {};
  // Check for 'Expect: 100-continue' header (case-insensitive)
  const expectHeader = headers.Expect || headers.expect;
  let timeoutId = -1;
  let encounteredError = false;

  if (expectHeader === "100-continue") {
    // Wait for either the 'continue' event or a timeout
    await Promise.race([
      // Timeout promise: resolves after the specified timeout
      new Promise(resolve => {
        timeoutId = Number(setTimeout(resolve, Math.max(M82, continueTimeout)));
      }),
      // Event promise: resolves on 'continue' or 'error' events
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

  // If no error was encountered, write the request body
  if (!encounteredError) {
    j82(requestStream, createRequestOptions.body);
  }
}

module.exports = handleHttp100Continue;