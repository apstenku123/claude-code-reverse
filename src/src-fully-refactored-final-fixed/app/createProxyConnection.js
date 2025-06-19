/**
 * Establishes a TCP connection to a target server through an HTTP CONNECT proxy, using provided subchannel address and configuration.
 *
 * @param {object} subchannelAddress - The address object representing the target server (may be TCP or Unix socket).
 * @param {object} config - Configuration object containing proxy target and optional credentials.
 * @returns {Promise<Socket|null>} Resolves with the established socket if successful, or null if proxy configuration is missing or invalid.
 */
function createProxyConnection(subchannelAddress, config) {
  // Check if proxy target is specified in config
  if (!('grpc.http_connect_target' in config)) {
    return Promise.resolve(null);
  }

  const proxyTargetUri = config['grpc.http_connect_target'];
  const parsedUri = ks.parseUri(proxyTargetUri);
  if (parsedUri === null) {
    return Promise.resolve(null);
  }

  // Extract host and port from the proxy URI
  const proxyHostPort = ks.splitHostPort(parsedUri.path);
  if (proxyHostPort === null) {
    return Promise.resolve(null);
  }

  // Use default port if not specified
  const proxyHost = proxyHostPort.host;
  const proxyPort = proxyHostPort.port !== null && proxyHostPort.port !== undefined ? proxyHostPort.port : w36.DEFAULT_PORT;
  const proxyAddress = `${proxyHost}:${proxyPort}`;

  // Prepare HTTP CONNECT request options
  const createRequestOptions = {
    method: 'CONNECT',
    path: proxyAddress
  };

  // Prepare headers for the CONNECT request
  const requestHeaders = {
    Host: proxyAddress
  };

  // Set connection details based on the type of subchannel address
  if (Kj0.isTcpSubchannelAddress(subchannelAddress)) {
    createRequestOptions.host = subchannelAddress.host;
    createRequestOptions.port = subchannelAddress.port;
  } else {
    createRequestOptions.socketPath = subchannelAddress.path;
  }

  // Add proxy authorization header if credentials are provided
  if ('grpc.http_connect_creds' in config) {
    requestHeaders['Proxy-Authorization'] = 'Basic ' + Buffer.from(config['grpc.http_connect_creds']).toString('base64');
  }

  createRequestOptions.headers = requestHeaders;

  const subchannelAddressString = Kj0.subchannelAddressToString(subchannelAddress);
  dg(`Using proxy ${subchannelAddressString} to connect to ${createRequestOptions.path}`);

  // Return a promise that resolves with the established socket or rejects on error
  return new Promise((resolve, reject) => {
    const proxyRequest = K36.request(createRequestOptions);

    // Handle successful CONNECT response
    proxyRequest.once('connect', (response, socket, head) => {
      proxyRequest.removeAllListeners();
      socket.removeAllListeners();
      if (response.statusCode === 200) {
        dg(`Successfully connected to ${createRequestOptions.path} through proxy ${subchannelAddressString}`);
        // If there is leftover data, push isBlobOrFileLikeObject back to the socket
        if (head.length > 0) {
          socket.unshift(head);
        }
        dg(`Successfully established a plaintext connection to ${createRequestOptions.path} through proxy ${subchannelAddressString}`);
        resolve(socket);
      } else {
        js.log(
          mg.LogVerbosity.ERROR,
          `Failed to connect to ${createRequestOptions.path} through proxy ${subchannelAddressString} with status ${response.statusCode}`
        );
        reject();
      }
    });

    // Handle connection errors
    proxyRequest.once('error', error => {
      proxyRequest.removeAllListeners();
      js.log(
        mg.LogVerbosity.ERROR,
        `Failed to connect to proxy ${subchannelAddressString} with error ${error.message}`
      );
      reject();
    });

    proxyRequest.end();
  });
}

module.exports = createProxyConnection;