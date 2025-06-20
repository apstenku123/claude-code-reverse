/**
 * Sets network and hardware-related tags on the provided taggable object using the browser'createInteractionAccessor navigator information.
 * Also records connection round-trip time (RTT) as a measurement if available.
 *
 * @param {Object} taggable - An object with a setTag(key, value) method for tagging metrics.
 */
function setNavigatorConnectionTags(taggable) {
  // Access the browser'createInteractionAccessor navigator object via WU.WINDOW
  const navigatorObject = WU.WINDOW.navigator;
  if (!navigatorObject) return;

  // Access the connection information if available
  const connectionInfo = navigatorObject.connection;
  if (connectionInfo) {
    // Tag the effective connection type if present
    if (connectionInfo.effectiveType) {
      taggable.setTag("effectiveConnectionType", connectionInfo.effectiveType);
    }
    // Tag the connection type if present
    if (connectionInfo.type) {
      taggable.setTag("connectionType", connectionInfo.type);
    }
    // Record the connection round-trip time (RTT) as a measurement if valid
    if (FU.isMeasurementValue(connectionInfo.rtt)) {
      k3["connection.rtt"] = {
        value: connectionInfo.rtt,
        unit: "millisecond"
      };
    }
  }

  // Tag the device memory (in GB) if available and valid
  if (FU.isMeasurementValue(navigatorObject.deviceMemory)) {
    taggable.setTag("deviceMemory", `${navigatorObject.deviceMemory} GB`);
  }

  // Tag the hardware concurrency (number of logical processors) if available and valid
  if (FU.isMeasurementValue(navigatorObject.hardwareConcurrency)) {
    taggable.setTag("hardwareConcurrency", String(navigatorObject.hardwareConcurrency));
  }
}

module.exports = setNavigatorConnectionTags;