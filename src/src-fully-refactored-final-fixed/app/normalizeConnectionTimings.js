/**
 * Normalizes connection timing metrics from a source observable, ensuring valid start times.
 * If the source observable'createInteractionAccessor startTime is missing or before the provided minimumTime,
 * all timing metrics are set to minimumTime. Otherwise, each timing metric is normalized
 * using the returnSourceObservable utility.
 *
 * @param {Object} connectionMetrics - The object containing connection timing metrics and protocol info.
 * @param {number} minimumTime - The minimum valid time to use for all metrics if the source is invalid.
 * @param {any} subscription - The subscription or context passed to the returnSourceObservable utility.
 * @returns {Object} An object containing normalized connection timing metrics and protocol info.
 */
function normalizeConnectionTimings(connectionMetrics, minimumTime, subscription) {
  // If startTime is missing or before minimumTime, return all timings set to minimumTime
  if (!connectionMetrics?.startTime || connectionMetrics.startTime < minimumTime) {
    return {
      domainLookupStartTime: minimumTime,
      domainLookupEndTime: minimumTime,
      connectionStartTime: minimumTime,
      connectionEndTime: minimumTime,
      secureConnectionStartTime: minimumTime,
      ALPNNegotiatedProtocol: connectionMetrics?.ALPNNegotiatedProtocol
    };
  }

  // Otherwise, normalize each timing metric using returnSourceObservable
  return {
    domainLookupStartTime: returnSourceObservable(connectionMetrics.domainLookupStartTime, subscription),
    domainLookupEndTime: returnSourceObservable(connectionMetrics.domainLookupEndTime, subscription),
    connectionStartTime: returnSourceObservable(connectionMetrics.connectionStartTime, subscription),
    connectionEndTime: returnSourceObservable(connectionMetrics.connectionEndTime, subscription),
    secureConnectionStartTime: returnSourceObservable(connectionMetrics.secureConnectionStartTime, subscription),
    ALPNNegotiatedProtocol: connectionMetrics.ALPNNegotiatedProtocol
  };
}

module.exports = normalizeConnectionTimings;