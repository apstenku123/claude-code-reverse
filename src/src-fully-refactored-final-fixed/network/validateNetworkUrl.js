/**
 * Validates a given URL object to ensure isBlobOrFileLikeObject meets security and network requirements.
 *
 * The function enforces the following rules:
 * - The URL must use HTTPS, unless isBlobOrFileLikeObject matches specific loopback or container host addresses.
 * - Allows loopback addresses (127.0.0.0/8, [::1], [0000:...:1], localhost).
 * - Allows ECS/EKS container hosts (169.254.170.2, 169.254.170.23, [fd00:ec2::23]).
 *
 * Throws a CredentialsProviderError if the URL does not meet these requirements.
 *
 * @param {URL} url - The URL object to validate.
 * @param {Object} logger - Logger instance for error context.
 * @throws {oD4.CredentialsProviderError} If the URL is not accepted.
 */
function validateNetworkUrl(url, logger) {
  // External constants for allowed hostnames
  // tD4: ECS container host ("169.254.170.2")
  // eD4: EKS container host ("169.254.170.23")
  // AY4: EKS IPv6 container host ("[fd00:ec2::23]")
  // oD4: Error provider
  if (url.protocol === "https:") {
    // HTTPS URLs are always accepted
    return;
  }

  if (
    url.hostname === tD4 || // ECS container host
    url.hostname === eD4 || // EKS container host
    url.hostname === AY4    // EKS IPv6 container host
  ) {
    return;
  }

  if (url.hostname.includes("[")) {
    // IPv6 loopback addresses
    if (
      url.hostname === "[::1]" ||
      url.hostname === "[0000:0000:0000:0000:0000:0000:0000:0001]"
    ) {
      return;
    }
  } else {
    // IPv4 loopback and localhost
    if (url.hostname === "localhost") {
      return;
    }

    // Check for IPv4 loopback (127.x.x.x)
    const hostnameParts = url.hostname.split(".");
    /**
     * Checks if a string represents a valid IPv4 octet (0-255)
     * @param {string} octet
     * @returns {boolean}
     */
    const isValidIPv4Octet = (octet) => {
      const value = parseInt(octet, 10);
      return value >= 0 && value <= 255;
    };

    if (
      hostnameParts[0] === "127" &&
      isValidIPv4Octet(hostnameParts[1]) &&
      isValidIPv4Octet(hostnameParts[2]) &&
      isValidIPv4Octet(hostnameParts[3]) &&
      hostnameParts.length === 4
    ) {
      return;
    }
  }

  // If none of the allowed cases matched, throw an error
  throw new oD4.CredentialsProviderError(
    `URL not accepted. It must either be HTTPS or match one of the following:\n  - loopback CIDR 127.0.0.0/8 or [::1/128]\n  - ECS container host 169.254.170.2\n  - EKS container host 169.254.170.23 or [fd00:ec2::23]`,
    {
      logger: logger
    }
  );
}

module.exports = validateNetworkUrl;