/**
 * Establishes a WebSocket connection by performing the HTTP upgrade handshake,
 * validating the server'createInteractionAccessor response, and handling protocol and extension negotiation.
 * 
 * @param {Object} urlObject - The URL object representing the WebSocket endpoint.
 * @param {string[]} subprotocols - Array of subprotocols to request from the server.
 * @param {Object} httpClient - HTTP client instance for making the request.
 * @param {Function} errorHandler - Function to call with error messages.
 * @param {Function} onConnectionEstablished - Callback invoked when the connection is successfully established.
 * @param {Object} options - Additional options, such as headers and dispatcher.
 * @returns {Promise<any>} Result of the connection process.
 */
function establishWebSocketConnection(
  urlObject,
  subprotocols,
  httpClient,
  errorHandler,
  onConnectionEstablished,
  options
) {
  // Clone and adjust the protocol for HTTP handshake
  const httpUrlObject = { ...urlObject };
  httpUrlObject.protocol = urlObject.protocol === "ws:" ? "http:" : "https:";

  // Prepare the HTTP request for the WebSocket upgrade
  const requestConfig = oE6({
    urlList: [httpUrlObject],
    client: httpClient,
    serviceWorkers: "none",
    referrer: "no-referrer",
    mode: "websocket",
    credentials: "include",
    cache: "no-store",
    redirect: "error"
  });

  // Attach custom headers if provided
  if (options.headers) {
    const headersList = AU6(new eE6(options.headers));
    requestConfig.headersList = headersList;
  }

  // Generate a random Sec-WebSocket-Key for the handshake
  const secWebSocketKey = Yp1.randomBytes(16).toString("base64");
  requestConfig.headersList.append("sec-websocket-key", secWebSocketKey);
  requestConfig.headersList.append("sec-websocket-version", "13");

  // Add requested subprotocols to the headers
  for (const protocol of subprotocols) {
    requestConfig.headersList.append("sec-websocket-protocol", protocol);
  }

  // Request permessage-deflate extension
  const perMessageDeflateExtension = "permessage-deflate; client_max_window_bits";
  requestConfig.headersList.append("sec-websocket-extensions", perMessageDeflateExtension);

  // Send the HTTP upgrade request and process the response
  return tE6({
    request: requestConfig,
    useParallelQueue: true,
    dispatcher: options.dispatcher,
    processResponse(response) {
      // Check for network errors or non-101 Switching Protocols status
      if (response.type === "error" || response.status !== 101) {
        errorHandler(errorHandler, "Received network error or non-101 status code.");
        return;
      }

      // Ensure the server responded with the requested subprotocols if any were sent
      if (subprotocols.length !== 0 && !response.headersList.get("Sec-WebSocket-Protocol")) {
        errorHandler(errorHandler, "Server did not respond with sent protocols.");
        return;
      }

      // Validate the Upgrade header
      if (response.headersList.get("Upgrade")?.toLowerCase() !== "websocket") {
        errorHandler(errorHandler, 'Server did not set Upgrade header to "websocket".');
        return;
      }

      // Validate the Connection header
      if (response.headersList.get("Connection")?.toLowerCase() !== "upgrade") {
        errorHandler(errorHandler, 'Server did not set Connection header to "upgrade".');
        return;
      }

      // Validate the Sec-WebSocket-Accept header using the expected hash
      const secWebSocketAccept = response.headersList.get("Sec-WebSocket-Accept");
      const expectedAcceptHash = Yp1.createHash("sha1").update(secWebSocketKey + uE6).digest("base64");
      if (secWebSocketAccept !== expectedAcceptHash) {
        errorHandler(errorHandler, "Incorrect hash received in Sec-WebSocket-Accept header.");
        return;
      }

      // Validate the Sec-WebSocket-Extensions header
      const extensionsHeader = response.headersList.get("Sec-WebSocket-Extensions");
      let negotiatedExtensions;
      if (extensionsHeader !== null) {
        negotiatedExtensions = sE6(extensionsHeader);
        if (!negotiatedExtensions.has("permessage-deflate")) {
          errorHandler(errorHandler, "Sec-WebSocket-Extensions header does not match.");
          return;
        }
      }

      // Validate the Sec-WebSocket-Protocol header if present
      const negotiatedProtocol = response.headersList.get("Sec-WebSocket-Protocol");
      if (negotiatedProtocol !== null) {
        if (!BU6("sec-websocket-protocol", requestConfig.headersList).includes(negotiatedProtocol)) {
          errorHandler(errorHandler, "Protocol was not set in the opening handshake.");
          return;
        }
      }

      // Attach event listeners to the socket
      response.socket.on("data", Gl0);
      response.socket.on("close", handleWebSocketClose);
      response.socket.on("error", Dl0);

      // Publish open event if there are subscribers
      if (lh.open.hasSubscribers) {
        lh.open.publish({
          address: response.socket.address(),
          protocol: negotiatedProtocol,
          extensions: extensionsHeader
        });
      }

      // Invoke the connection established callback
      onConnectionEstablished(response, negotiatedExtensions);
    }
  });
}

module.exports = establishWebSocketConnection;
