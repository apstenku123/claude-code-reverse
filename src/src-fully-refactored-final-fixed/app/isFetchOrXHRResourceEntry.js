/**
 * Determines if the given PerformanceResourceTiming entry represents a fetch or XMLHttpRequest resource.
 *
 * @param {PerformanceResourceTiming} resourceEntry - The performance entry to check.
 * @returns {boolean} True if the entry is a resource initiated by fetch or XMLHttpRequest, false otherwise.
 */
function isFetchOrXHRResourceEntry(resourceEntry) {
  // Check if the entry is a resource
  const isResourceType = resourceEntry.entryType === "resource";

  // Check if the entry has an initiatorType property
  const hasInitiatorType = "initiatorType" in resourceEntry;

  // Check if nextHopProtocol is a string
  const hasStringNextHopProtocol = typeof resourceEntry.nextHopProtocol === "string";

  // Check if the initiatorType is either 'fetch' or 'xmlhttprequest'
  const isFetchOrXHR = resourceEntry.initiatorType === "fetch" || resourceEntry.initiatorType === "xmlhttprequest";

  // Return true only if all conditions are met
  return isResourceType && hasInitiatorType && hasStringNextHopProtocol && isFetchOrXHR;
}

module.exports = isFetchOrXHRResourceEntry;