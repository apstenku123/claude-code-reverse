/**
 * Validates that a given URL is either HTTPS or matches an accepted set of local or container hostnames.
 * Throws a CredentialsProviderError if the URL is not accepted.
 *
 * @param {URL} url - The URL object to validate.
 * @param {Object} logger - Logger instance to be passed to the error for context.
 * @throws {oD4.CredentialsProviderError} If the URL is not HTTPS or an accepted local/container host.
 */
function validateLocalhostOrAcceptedHostUrl(url, logger) {
  // List of accepted container hostnames (external constants)
  // tD4: ECS container host (e.g., '169.254.170.2')
  // eD4: EKS container host (e.g., '169.254.170.23')
  // AY4: EKS IPv6 container host (e.g., '[fd00:ec2::23]')
  if (url.protocol === "https:") return;

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
      return;
    }
  } else {
    // Handle IPv4 loopback and localhost
    if (url.hostname === "localhost") return;

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

module.exports = validateLocalhostOrAcceptedHostUrl;