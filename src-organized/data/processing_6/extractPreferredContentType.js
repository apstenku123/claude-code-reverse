function extractPreferredContentType(headers) {
  let lastCharset = null; // Stores the last seen charset parameter
  let lastEssence = null; // Stores the last seen content type essence
  let preferredContentType = null; // Stores the preferred content type object

  // Retrieve all 'content-type' header values from the headers object
  const contentTypeHeaders = Bh0("content-type", headers);
  if (contentTypeHeaders === null) return "failure";

  for (const rawContentType of contentTypeHeaders) {
    const parsedContentType = KF6(rawContentType);
    // Skip if parsing failed or if the essence is '*/*'
    if (parsedContentType === "failure" || parsedContentType.essence === "*/*") continue;

    preferredContentType = parsedContentType;
    // If the essence has changed, update lastCharset and lastEssence
    if (preferredContentType.essence !== lastEssence) {
      lastCharset = null;
      if (preferredContentType.parameters.has("charset")) {
        lastCharset = preferredContentType.parameters.get("charset");
      }
      lastEssence = preferredContentType.essence;
    } else if (!preferredContentType.parameters.has("charset") && lastCharset !== null) {
      // If the essence is the same and charset is missing, propagate the last seen charset
      preferredContentType.parameters.set("charset", lastCharset);
    }
  }

  if (preferredContentType == null) return "failure";
  return preferredContentType;
}

module.exports = extractPreferredContentType;