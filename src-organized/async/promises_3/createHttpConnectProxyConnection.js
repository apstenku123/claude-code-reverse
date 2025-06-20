/**
 * Establishes a TCP connection to a target server through an HTTP CONNECT proxy.
 *
 * @param {object} subchannelAddress - The address object representing the TCP subchannel (host/port or socketPath).
 * @param {object} channelOptions - The channel options, must include 'grpc.http_connect_target' and optionally 'grpc.http_connect_creds'.
 * @returns {Promise<net.Socket|null>} Resolves with a connected socket if successful, or null if proxy config is missing or invalid.
 */
function createHttpConnectProxyConnection(subchannelAddress, channelOptions) {
  // Check if proxy target is specified in channel options
  if (!('grpc.http_connect_target' in channelOptions)) {
    return Promise.resolve(null);
  }

  const proxyTargetUri = channelOptions['grpc.http_connect_target'];
  const parsedProxyUri = ks.parseUri(proxyTargetUri);
  if (parsedProxyUri === null) {
    return Promise.resolve(null);
  }

  // Extract host and port from the proxy URI
  const proxyHostPort = ks.splitHostPort(parsedProxyUri.path);
  if (proxyHostPort === null) {
    return Promise.resolve(null);
  }

  // Use default port if not specified
  const proxyAddress = `${proxyHostPort.host}:${proxyHostPort.port !== null && proxyHostPort.port !== undefined ? proxyHostPort.port : w36.DEFAULT_PORT}`;

  // Prepare HTTP CONNECT request options
  const createRequestOptions = {
    method: 'CONNECT',
    path: proxyAddress
  };

  // Prepare headers for the CONNECT request
  const requestHeaders = {
    Host: proxyAddress
  };

  // Set connection options based on subchannel address type
  if (Kj0.isTcpSubchannelAddress(subchannelAddress)) {
    createRequestOptions.host = subchannelAddress.host;
    createRequestOptions.port = subchannelAddress.port;
  } else {
    createRequestOptions.socketPath = subchannelAddress.path;
  }

  // Add Proxy-Authorization header if credentials are provided
  if ('grpc.http_connect_creds' in channelOptions) {
    requestHeaders['Proxy-Authorization'] = 'Basic ' + Buffer.from(channelOptions['grpc.http_connect_creds']).toString('base64');
  }

  createRequestOptions.headers = requestHeaders;

  const proxyString = Kj0.subchannelAddressToString(subchannelAddress);
  dg(`Using proxy ${proxyString} to connect to ${createRequestOptions.path}`);

  // Return a promise that resolves with the established socket or rejects on error
  return new Promise((resolve, reject) => {
    const proxyRequest = K36.request(createRequestOptions);

    // Handle successful CONNECT response
    proxyRequest.once('connect', (response, socket, head) => {
      proxyRequest.removeAllListeners();
      socket.removeAllListeners();
      if (response.statusCode === 200) {
        dg(`Successfully connected to ${createRequestOptions.path} through proxy ${proxyString}`);
        // If there is leftover data, push isBlobOrFileLikeObject back to the socket
        if (head.length > 0) {
          socket.unshift(head);
        }
        dg(`Successfully established a plaintext connection to ${createRequestOptions.path} through proxy ${proxyString}`);
        resolve(socket);
      } else {
        js.log(
          mg.LogVerbosity.ERROR,
          `Failed to connect to ${createRequestOptions.path} through proxy ${proxyString} with status ${response.statusCode}`
        );
        reject();
      }
    });

    // Handle connection errors
    proxyRequest.once('error', error => {
      proxyRequest.removeAllListeners();
      js.log(
        mg.LogVerbosity.ERROR,
        `Failed to connect to proxy ${proxyString} with error ${error.message}`
      );
      reject();
    });

    proxyRequest.end();
  });
}

module.exports = createHttpConnectProxyConnection;