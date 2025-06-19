/**
 * Serializes a URL record object into a URL string according to the WHATWG URL Standard.
 *
 * @param {Object} urlRecord - The URL record to serialize. Should contain properties: scheme, host, username, password, port, path, query, fragment, cannotBeABaseURL.
 * @param {boolean} excludeFragment - If true, omits the fragment from the serialized URL.
 * @returns {string} The serialized URL string.
 */
function serializeURL(urlRecord, excludeFragment) {
  // Start with the scheme
  let urlString = urlRecord.scheme + ":";

  // If host is present, add authority section
  if (urlRecord.host !== null) {
    urlString += "//";

    // Add credentials if present
    if (urlRecord.username !== "" || urlRecord.password !== "") {
      urlString += urlRecord.username;
      if (urlRecord.password !== "") {
        urlString += ":" + urlRecord.password;
      }
      urlString += "@";
    }

    // Add host (with punycode conversion if needed)
    urlString += formatValueForDisplay(urlRecord.host);

    // Add port if present
    if (urlRecord.port !== null) {
      urlString += ":" + urlRecord.port;
    }
  } else if (urlRecord.host === null && urlRecord.scheme === "file") {
    // Special case for file URLs without host
    urlString += "//";
  }

  // Add path
  if (urlRecord.cannotBeABaseURL) {
    // For URLs that cannot be a base, path is a single string
    urlString += urlRecord.path[0];
  } else {
    // For normal URLs, path is an array of segments
    for (const pathSegment of urlRecord.path) {
      urlString += "/" + pathSegment;
    }
  }

  // Add query if present
  if (urlRecord.query !== null) {
    urlString += "?" + urlRecord.query;
  }

  // Add fragment if present and not excluded
  if (!excludeFragment && urlRecord.fragment !== null) {
    urlString += "#" + urlRecord.fragment;
  }

  return urlString;
}

module.exports = serializeURL;