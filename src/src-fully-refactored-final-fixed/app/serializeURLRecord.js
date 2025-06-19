/**
 * Serializes a URL record object into a URL string according to WHATWG URL Standard.
 *
 * @param {Object} urlRecord - The URL record to serialize. Should have properties: scheme, host, username, password, port, path, query, fragment, cannotBeABaseURL.
 * @param {boolean} excludeFragment - If true, omits the fragment from the serialized URL.
 * @returns {string} The serialized URL string.
 */
function serializeURLRecord(urlRecord, excludeFragment) {
  let serializedURL = urlRecord.scheme + ":";

  // If there is a host, add authority section
  if (urlRecord.host !== null) {
    serializedURL += "//";

    // If there is a username or password, add userinfo
    if (urlRecord.username !== "" || urlRecord.password !== "") {
      serializedURL += urlRecord.username;
      if (urlRecord.password !== "") {
        serializedURL += ":" + urlRecord.password;
      }
      serializedURL += "@";
    }

    // Add host (using external formatValueForDisplay function)
    serializedURL += formatValueForDisplay(urlRecord.host);

    // Add port if present
    if (urlRecord.port !== null) {
      serializedURL += ":" + urlRecord.port;
    }
  } else if (urlRecord.host === null && urlRecord.scheme === "file") {
    // For file URLs with no host, add authority slashes
    serializedURL += "//";
  }

  // Add path
  if (urlRecord.cannotBeABaseURL) {
    // For cannot-be-a-base URLs, path is a single string
    serializedURL += urlRecord.path[0];
  } else {
    // For normal URLs, path is an array of segments
    for (const pathSegment of urlRecord.path) {
      serializedURL += "/" + pathSegment;
    }
  }

  // Add query if present
  if (urlRecord.query !== null) {
    serializedURL += "?" + urlRecord.query;
  }

  // Add fragment if present and not excluded
  if (!excludeFragment && urlRecord.fragment !== null) {
    serializedURL += "#" + urlRecord.fragment;
  }

  return serializedURL;
}

module.exports = serializeURLRecord;