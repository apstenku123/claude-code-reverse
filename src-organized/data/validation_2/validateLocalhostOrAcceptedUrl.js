/**
 * Validates whether a given URL is either HTTPS or matches an accepted set of localhost/container host patterns.
 * Throws a CredentialsProviderError if the URL is not accepted.
 *
 * @param {URL} url - The URL object to validate.
 * @param {Object} logger - Logger instance for error context.
 * @throws {oD4.CredentialsProviderError} If the URL is not accepted.
 */
function validateLocalhostOrAcceptedUrl(url, logger) {
  // List of accepted hostnames for container hosts
  // (Assumed to be defined elsewhere: tD4, eD4, AY4)
  if (url.protocol === "https:") {
    // Accept HTTPS URLs
    return;
  }

  // Accept specific container hostnames
  if (
    url.hostname === tD4 ||
    url.hostname === eD4 ||
    url.hostname === AY4
  ) {
    return;
  }

  // Handle IPv6 loopback addresses
  if (url.hostname.includes("[")) {
    if (
      url.hostname === "[::1]" ||
      url.hostname === "[0000:0000:0000:0000:0000:0000:0000:0001]"
    ) {
      // Accept IPv6 loopback
      return;
    }
  } else {
    // Handle IPv4 loopback and localhost
    if (url.hostname === "localhost") {
      // Accept localhost
      return;
    }

    // Check for IPv4 loopback in the form 127.x.x.x
    const hostnameParts = url.hostname.split(".");
    const isValidIPv4Octet = (octet) => {
      const parsed = parseInt(octet, 10);
      return parsed >= 0 && parsed <= 255;
    };
    if (
      hostnameParts[0] === "127" &&
      isValidIPv4Octet(hostnameParts[1]) &&
      isValidIPv4Octet(hostnameParts[2]) &&
      isValidIPv4Octet(hostnameParts[3]) &&
      hostnameParts.length === 4
    ) {
      // Accept 127.x.x.x loopback
      return;
    }
  }

  // If none of the above, throw an error
  throw new oD4.CredentialsProviderError(
    `URL not accepted. It must either be HTTPS or match one of the following:\n  - loopback CIDR 127.0.0.0/8 or [::1/128]\n  - ECS container host 169.254.170.2\n  - EKS container host 169.254.170.23 or [fd00:ec2::23]`,
    {
      logger: logger
    }
  );
}

module.exports = validateLocalhostOrAcceptedUrl;