/**
 * Initializes a network timing information object with default values.
 *
 * This function takes an object containing at least a `startTime` property and returns
 * a new object representing the initial state of various network timing metrics.
 * All properties are set to zero or null, except for those that can be initialized
 * from the provided `startTime`.
 *
 * @param {Object} timingSource - An object that may contain a `startTime` property representing the start time of the network event.
 * @param {number} [timingSource.startTime] - The start time of the network event (optional).
 * @returns {Object} An object containing initialized network timing metrics.
 */
function initializeNetworkTimingInfo(timingSource) {
  return {
    // The time when the network event started, defaulting to 0 if not provided
    startTime: timingSource.startTime ?? 0,
    // The time when a redirect started (not applicable, so set to 0)
    redirectStartTime: 0,
    // The time when a redirect ended (not applicable, so set to 0)
    redirectEndTime: 0,
    // The time after all redirects, initialized to startTime or 0
    postRedirectStartTime: timingSource.startTime ?? 0,
    // The time when the final service worker started (not applicable, so set to 0)
    finalServiceWorkerStartTime: 0,
    // The time when the final network response started (not applicable, so set to 0)
    finalNetworkResponseStartTime: 0,
    // The time when the final network request started (not applicable, so set to 0)
    finalNetworkRequestStartTime: 0,
    // The time when the network event ended (not applicable, so set to 0)
    endTime: 0,
    // The size of the encoded body (not applicable, so set to 0)
    encodedBodySize: 0,
    // The size of the decoded body (not applicable, so set to 0)
    decodedBodySize: 0,
    // Additional timing info for the final connection (not applicable, so set to null)
    finalConnectionTimingInfo: null
  };
}

module.exports = initializeNetworkTimingInfo;
