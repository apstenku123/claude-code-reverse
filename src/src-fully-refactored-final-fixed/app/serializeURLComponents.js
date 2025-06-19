/**
 * Serializes a URL components object into a URL string.
 *
 * @param {Object} urlComponents - The object containing URL parts (scheme, host, username, password, port, path, query, fragment, etc.)
 * @param {boolean} excludeFragment - If true, the fragment will not be included in the output string
 * @returns {string} The serialized URL string
 */
function serializeURLComponents(urlComponents, excludeFragment) {
  let urlString = urlComponents.scheme + ":";

  // If host is present, add authority section
  if (urlComponents.host !== null) {
    urlString += "//";
    // Add userinfo if username or password is present
    if (urlComponents.username !== "" || urlComponents.password !== "") {
      urlString += urlComponents.username;
      if (urlComponents.password !== "") {
        urlString += ":" + urlComponents.password;
      }
      urlString += "@";
    }
    // Add host (with punycode conversion if needed)
    urlString += formatValueForDisplay(urlComponents.host);
    // Add port if present
    if (urlComponents.port !== null) {
      urlString += ":" + urlComponents.port;
    }
  } else if (urlComponents.host === null && urlComponents.scheme === "file") {
    // Special case for file URLs with no host
    urlString += "//";
  }

  // Add path
  if (urlComponents.cannotBeABaseURL) {
    // For URLs that cannot be a base, path is a single string
    urlString += urlComponents.path[0];
  } else {
    // For normal URLs, path is an array of segments
    for (const pathSegment of urlComponents.path) {
      urlString += "/" + pathSegment;
    }
  }

  // Add query if present
  if (urlComponents.query !== null) {
    urlString += "?" + urlComponents.query;
  }

  // Add fragment if present and not excluded
  if (!excludeFragment && urlComponents.fragment !== null) {
    urlString += "#" + urlComponents.fragment;
  }

  return urlString;
}

module.exports = serializeURLComponents;