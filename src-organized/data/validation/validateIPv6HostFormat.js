/**
 * Validates the IPv6 format of the host and hostname properties of a URL-like object.
 * Throws an error if the IPv6 address is not properly formatted (e.g., missing brackets or invalid characters).
 *
 * @param {Object} urlObject - An object representing a URL, expected to have 'hostname', 'host', and optionally 'href' properties.
 * @returns {Object} The original urlObject if validation passes.
 * @throws {Bq1} Throws a Bq1 error if the IPv6 format is invalid, including the input for context.
 */
function validateIPv6HostFormat(urlObject) {
  // Check if the hostname starts with '[' (indicating IPv6), but is not a valid IPv6 address in brackets
  if (/^\[/.test(urlObject.hostname) && !/^\[[:0-9a-f]+\]$/i.test(urlObject.hostname)) {
    throw new Bq1({
      input: urlObject.href || urlObject
    });
  }

  // Check if the host starts with '[' (indicating IPv6), but is not a valid IPv6 address with optional port
  if (/^\[/.test(urlObject.host) && !/^\[[:0-9a-f]+\](?:\:\d+)?$/i.test(urlObject.host)) {
    throw new Bq1({
      input: urlObject.href || urlObject
    });
  }

  return urlObject;
}

module.exports = validateIPv6HostFormat;