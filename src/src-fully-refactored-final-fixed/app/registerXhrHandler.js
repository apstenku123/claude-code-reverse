/**
 * Registers a handler for XHR events and ensures instrumentation is applied.
 *
 * @function registerXhrHandler
 * @description Adds the provided XHR event handler to the R21 system and ensures that XHR instrumentation is set up.
 * @param {Function} xhrEventHandler - The function to handle XHR events.
 * @returns {void}
 */
function registerXhrHandler(xhrEventHandler) {
  // Register the provided handler for 'xhr' events
  R21.addHandler("xhr", xhrEventHandler);
  // Ensure XHR instrumentation is applied (instrumentXMLHttpRequest is assumed to be the instrumentation logic)
  R21.maybeInstrument("xhr", instrumentXMLHttpRequest);
}

module.exports = registerXhrHandler;