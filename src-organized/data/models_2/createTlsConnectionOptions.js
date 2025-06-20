/**
 * Constructs TLS connection options for a gRPC client, handling overrides and special connection scenarios.
 *
 * @param {object} secureContext - The TLS secure context to use for the connection.
 * @param {object} config - Configuration object, may include checkServerIdentity and rejectUnauthorized.
 * @param {string} targetAuthority - The default authority/host for the connection.
 * @param {object} channelOptions - Channel options, may include gRPC-specific overrides.
 * @returns {object} TLS options object suitable for use with Node.js TLS APIs.
 */
function createTlsConnectionOptions(secureContext, config, targetAuthority, channelOptions) {
  // Initialize TLS options with the provided secure context
  const tlsOptions = {
    secureContext
  };

  // Optionally add checkServerIdentity from config
  if (config.checkServerIdentity) {
    tlsOptions.checkServerIdentity = config.checkServerIdentity;
  }

  // Optionally add rejectUnauthorized from config
  if (config.rejectUnauthorized !== undefined) {
    tlsOptions.rejectUnauthorized = config.rejectUnauthorized;
  }

  // Always set ALPNProtocols to HTTP/2
  tlsOptions.ALPNProtocols = ["h2"];

  // Handle grpc.ssl_target_name_override: override servername and checkServerIdentity
  if (channelOptions["grpc.ssl_target_name_override"]) {
    const overrideServerName = channelOptions["grpc.ssl_target_name_override"];
    // Use provided checkServerIdentity or fallback to Ys.checkServerIdentity
    const baseCheckServerIdentity = tlsOptions.checkServerIdentity ?? Ys.checkServerIdentity;
    // Wrap checkServerIdentity to use the override server name
    tlsOptions.checkServerIdentity = (hostname, cert) => {
      return baseCheckServerIdentity(overrideServerName, cert);
    };
    tlsOptions.servername = overrideServerName;
  } else if ("grpc.http_connect_target" in channelOptions) {
    // If using HTTP CONNECT proxy, parse the target and set servername accordingly
    const httpConnectUri = channelOptions["grpc.http_connect_target"];
    const parsedUri = IZ1.parseUri(httpConnectUri) ?? { path: "localhost" };
    const defaultAuthority = $updateProjectsAccessor.getDefaultAuthority(parsedUri);
    const hostPort = IZ1.splitHostPort(defaultAuthority);
    tlsOptions.servername = hostPort?.host ?? defaultAuthority;
  }

  // Enable TLS trace if requested
  if (channelOptions["grpc-node.tls_enable_trace"]) {
    tlsOptions.enableTrace = true;
  }

  // Determine the authority/host for the connection
  let effectiveAuthority = targetAuthority;
  if ("grpc.http_connect_target" in channelOptions) {
    const parsedUri = IZ1.parseUri(channelOptions["grpc.http_connect_target"]);
    if (parsedUri) {
      effectiveAuthority = parsedUri;
    }
  }
  const defaultAuthority = $updateProjectsAccessor.getDefaultAuthority(effectiveAuthority);
  const hostPort = IZ1.splitHostPort(defaultAuthority);
  const host = hostPort?.host ?? defaultAuthority;

  // Set host and servername to the resolved host
  tlsOptions.host = host;
  tlsOptions.servername = host;

  return tlsOptions;
}

module.exports = createTlsConnectionOptions;