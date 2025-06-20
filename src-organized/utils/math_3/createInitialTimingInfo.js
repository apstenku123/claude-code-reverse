/**
 * Creates an initial timing information object for a network or resource event.
 *
 * @param {Object} eventData - The source event data containing timing information.
 * @param {number} [eventData.startTime] - The start time of the event (optional).
 * @returns {Object} An object containing initialized timing and size properties for the event.
 */
function createInitialTimingInfo(eventData) {
  return {
    // The time the event started, or 0 if not provided
    startTime: eventData.startTime ?? 0,
    // Redirect timings are initialized to 0
    redirectStartTime: 0,
    redirectEndTime: 0,
    // The time after redirects, defaults to startTime or 0
    postRedirectStartTime: eventData.startTime ?? 0,
    // Service worker and network timings are initialized to 0
    finalServiceWorkerStartTime: 0,
    finalNetworkResponseStartTime: 0,
    finalNetworkRequestStartTime: 0,
    // End time and body sizes are initialized to 0
    endTime: 0,
    encodedBodySize: 0,
    decodedBodySize: 0,
    // Connection timing info is not available at initialization
    finalConnectionTimingInfo: null
  };
}

module.exports = createInitialTimingInfo;