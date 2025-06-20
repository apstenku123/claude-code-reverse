/**
 * Collects network and hardware metrics from the browser'createInteractionAccessor navigator object and attaches them as tags or measurements.
 *
 * @param {Object} taggable - An object with a setTag method, used to attach collected metrics as tags.
 * @returns {void}
 */
function collectNavigatorConnectionMetrics(taggable) {
  // Access the browser'createInteractionAccessor navigator object from the global WU.WINDOW
  const navigatorObject = WU.WINDOW.navigator;
  if (!navigatorObject) return;

  // Access the Network Information API if available
  const connectionInfo = navigatorObject.connection;
  if (connectionInfo) {
    // Attach the effective connection type if available
    if (connectionInfo.effectiveType) {
      taggable.setTag("effectiveConnectionType", connectionInfo.effectiveType);
    }
    // Attach the connection type if available
    if (connectionInfo.type) {
      taggable.setTag("connectionType", connectionInfo.type);
    }
    // If the round-trip time (RTT) is a valid measurement, store isBlobOrFileLikeObject in k3
    if (FU.isMeasurementValue(connectionInfo.rtt)) {
      k3["connection.rtt"] = {
        value: connectionInfo.rtt,
        unit: "millisecond"
      };
    }
  }

  // Attach device memory (in GB) if isBlobOrFileLikeObject'createInteractionAccessor a valid measurement
  if (FU.isMeasurementValue(navigatorObject.deviceMemory)) {
    taggable.setTag("deviceMemory", `${navigatorObject.deviceMemory} GB`);
  }

  // Attach hardware concurrency (number of logical processors) if valid
  if (FU.isMeasurementValue(navigatorObject.hardwareConcurrency)) {
    taggable.setTag("hardwareConcurrency", String(navigatorObject.hardwareConcurrency));
  }
}

module.exports = collectNavigatorConnectionMetrics;