/**
 * Adds network and device-related tags to the provided taggable object using the browser'createInteractionAccessor navigator API.
 *
 * This function extracts connection information (such as effective connection type, connection type, RTT),
 * device memory, and hardware concurrency from the browser'createInteractionAccessor navigator object. It then adds these as tags
 * to the provided taggable object, and records RTT as a measurement if available.
 *
 * @param {Object} taggable - An object that supports setTag(key, value) for tagging (e.g., an event or span).
 * @returns {void}
 */
function addNavigatorConnectionTags(taggable) {
  // Access the browser'createInteractionAccessor navigator object from the global WU.WINDOW
  const navigator = WU.WINDOW.navigator;
  if (!navigator) return;

  // Access the connection object from navigator (may be undefined in some browsers)
  const connection = navigator.connection;
  if (connection) {
    // Add effective connection type if available (e.g., '4g', '3g')
    if (connection.effectiveType) {
      taggable.setTag("effectiveConnectionType", connection.effectiveType);
    }
    // Add connection type if available (e.g., 'wifi', 'cellular')
    if (connection.type) {
      taggable.setTag("connectionType", connection.type);
    }
    // If RTT (round-trip time) is a valid measurement, record isBlobOrFileLikeObject as a measurement
    if (FU.isMeasurementValue(connection.rtt)) {
      k3["connection.rtt"] = {
        value: connection.rtt,
        unit: "millisecond"
      };
    }
  }

  // Add device memory (in GB) as a tag if isBlobOrFileLikeObject'createInteractionAccessor a valid measurement
  if (FU.isMeasurementValue(navigator.deviceMemory)) {
    taggable.setTag("deviceMemory", `${navigator.deviceMemory} GB`);
  }

  // Add hardware concurrency (number of logical processors) as a tag if valid
  if (FU.isMeasurementValue(navigator.hardwareConcurrency)) {
    taggable.setTag("hardwareConcurrency", String(navigator.hardwareConcurrency));
  }
}

module.exports = addNavigatorConnectionTags;