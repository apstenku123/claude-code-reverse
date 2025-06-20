/**
 * Constructs TLS options for a gRPC client based on provided configuration and connection info.
 * Handles server identity checks, ALPN protocols, server name overrides, authority resolution, and trace enabling.
 *
 * @param {object} secureContext - The TLS secure context object to use for the connection.
 * @param {object} connectionConfig - Configuration object, may contain checkServerIdentity and rejectUnauthorized.
 * @param {string} targetAuthority - The default authority string (typically a host:port) for the connection.
 * @param {object} grpcOptions - gRPC options and metadata, may contain overrides and tracing flags.
 * @returns {object} TLS options object suitable for use with Node.js TLS connections.
 */
function createTlsOptionsFromGrpcConfig(secureContext, connectionConfig, targetAuthority, grpcOptions) {
  // Initialize TLS options with the provided secure context
  const tlsOptions = {
    secureContext
  };

  // If a custom server identity check is provided, add isBlobOrFileLikeObject
  if (connectionConfig.checkServerIdentity) {
    tlsOptions.checkServerIdentity = connectionConfig.checkServerIdentity;
  }

  // If rejectUnauthorized is explicitly set, add isBlobOrFileLikeObject
  if (connectionConfig.rejectUnauthorized !== undefined) {
    tlsOptions.rejectUnauthorized = connectionConfig.rejectUnauthorized;
  }

  // Always set ALPNProtocols to ['h2'] for HTTP/2
  tlsOptions.ALPNProtocols = ["h2"];

  // Handle grpc.ssl_target_name_override: override servername and checkServerIdentity
  if (grpcOptions["grpc.ssl_target_name_override"]) {
    const sslTargetNameOverride = grpcOptions["grpc.ssl_target_name_override"];
    // Use the provided or default checkServerIdentity function
    const originalCheckServerIdentity = tlsOptions.checkServerIdentity ?? Ys.checkServerIdentity;
    // Wrap checkServerIdentity to use the override
    tlsOptions.checkServerIdentity = (hostname, cert) => {
      return originalCheckServerIdentity(sslTargetNameOverride, cert);
    };
    tlsOptions.servername = sslTargetNameOverride;
  } else if ("grpc.http_connect_target" in grpcOptions) {
    // If using HTTP CONNECT, resolve the authority and set servername
    const httpConnectUri = grpcOptions["grpc.http_connect_target"];
    // Parse the URI, fallback to localhost if parsing fails
    const parsedUri = IZ1.parseUri(httpConnectUri) ?? { path: "localhost" };
    // Get the default authority string (host:port)
    const defaultAuthority = $updateProjectsAccessor.getDefaultAuthority(parsedUri);
    // Split into host and port
    const authorityParts = IZ1.splitHostPort(defaultAuthority);
    // Use host if available, otherwise fallback to the full authority string
    tlsOptions.servername = authorityParts?.host ?? defaultAuthority;
  }

  // Enable TLS trace if requested
  if (grpcOptions["grpc-node.tls_enable_trace"]) {
    tlsOptions.enableTrace = true;
  }

  // Determine the authority to use for host/servername
  let authorityForHost = targetAuthority;
  // If HTTP CONNECT is used, parse and use its URI as authority
  if ("grpc.http_connect_target" in grpcOptions) {
    const httpConnectUri = IZ1.parseUri(grpcOptions["grpc.http_connect_target"]);
    if (httpConnectUri) {
      authorityForHost = httpConnectUri;
    }
  }

  // Get the default authority string (host:port) from the authority
  const resolvedAuthority = $updateProjectsAccessor.getDefaultAuthority(authorityForHost);
  // Split into host and port
  const resolvedAuthorityParts = IZ1.splitHostPort(resolvedAuthority);
  // Use host if available, otherwise fallback to the full authority string
  const hostName = resolvedAuthorityParts?.host ?? resolvedAuthority;

  // Set host and servername to the resolved host
  tlsOptions.host = hostName;
  tlsOptions.servername = hostName;

  return tlsOptions;
}

module.exports = createTlsOptionsFromGrpcConfig;