/**
 * Establishes a WebSocket handshake with the given server, handling protocol negotiation,
 * extension negotiation, and validating the server'createInteractionAccessor response headers. If the handshake is successful,
 * invokes the provided callback with the server response and negotiated extensions.
 *
 * @param {object} requestUrl - The URL object for the WebSocket connection (will be cloned and protocol swapped).
 * @param {string[]} subprotocols - Array of subprotocols to offer to the server.
 * @param {object} httpClient - HTTP client instance used to make the request.
 * @param {function} errorHandler - Function to call with error messages if the handshake fails.
 * @param {function} handshakeCallback - Callback to invoke with the server response and negotiated extensions if successful.
 * @param {object} options - Additional options, including headers and dispatcher.
 * @returns {Promise<any>} - Returns the result of the tE6 function, which manages the handshake process.
 */
function establishWebSocketHandshake(requestUrl, subprotocols, httpClient, errorHandler, handshakeCallback, options) {
  // Clone the URL object and set the protocol to HTTP(s) for the handshake
  const handshakeUrl = { ...requestUrl };
  handshakeUrl.protocol = requestUrl.protocol === "ws:" ? "http:" : "https:";

  // Prepare the initial request configuration
  const requestConfig = oE6({
    urlList: [handshakeUrl],
    client: httpClient,
    serviceWorkers: "none",
    referrer: "no-referrer",
    mode: "websocket",
    credentials: "include",
    cache: "no-store",
    redirect: "error"
  });

  // If custom headers are provided, process and attach them
  if (options.headers) {
    const processedHeaders = AU6(new eE6(options.headers));
    requestConfig.headersList = processedHeaders;
  }

  // Generate a random Sec-WebSocket-Key for the handshake
  const websocketKey = Yp1.randomBytes(16).toString("base64");
  requestConfig.headersList.append("sec-websocket-key", websocketKey);
  requestConfig.headersList.append("sec-websocket-version", "13");

  // Add all requested subprotocols to the handshake headers
  for (const protocol of subprotocols) {
    requestConfig.headersList.append("sec-websocket-protocol", protocol);
  }

  // Request permessage-deflate extension
  const websocketExtensions = "permessage-deflate; client_max_window_bits";
  requestConfig.headersList.append("sec-websocket-extensions", websocketExtensions);

  // Initiate the handshake using tE6, providing a response processor
  return tE6({
    request: requestConfig,
    useParallelQueue: true,
    dispatcher: options.dispatcher,
    processResponse(serverResponse) {
      // Check for network errors or non-101 Switching Protocols responses
      if (serverResponse.type === "error" || serverResponse.status !== 101) {
        errorHandler(handshakeCallback, "Received network error or non-101 status code.");
        return;
      }

      // If subprotocols were requested, ensure the server responded with one
      if (subprotocols.length !== 0 && !serverResponse.headersList.get("Sec-WebSocket-Protocol")) {
        errorHandler(handshakeCallback, "Server did not respond with sent protocols.");
        return;
      }

      // Validate the Upgrade header
      if (serverResponse.headersList.get("Upgrade")?.toLowerCase() !== "websocket") {
        errorHandler(handshakeCallback, 'Server did not set Upgrade header to "websocket".');
        return;
      }

      // Validate the Connection header
      if (serverResponse.headersList.get("Connection")?.toLowerCase() !== "upgrade") {
        errorHandler(handshakeCallback, 'Server did not set Connection header to "upgrade".');
        return;
      }

      // Validate the Sec-WebSocket-Accept header using the expected hash
      const acceptKey = serverResponse.headersList.get("Sec-WebSocket-Accept");
      const expectedAcceptKey = Yp1.createHash("sha1").update(websocketKey + uE6).digest("base64");
      if (acceptKey !== expectedAcceptKey) {
        errorHandler(handshakeCallback, "Incorrect hash received in Sec-WebSocket-Accept header.");
        return;
      }

      // Parse and validate the Sec-WebSocket-Extensions header
      const serverExtensions = serverResponse.headersList.get("Sec-WebSocket-Extensions");
      let negotiatedExtensions;
      if (serverExtensions !== null) {
        negotiatedExtensions = sE6(serverExtensions);
        if (!negotiatedExtensions.has("permessage-deflate")) {
          errorHandler(handshakeCallback, "Sec-WebSocket-Extensions header does not match.");
          return;
        }
      }

      // Validate the Sec-WebSocket-Protocol header if present
      const negotiatedProtocol = serverResponse.headersList.get("Sec-WebSocket-Protocol");
      if (negotiatedProtocol !== null) {
        if (!BU6("sec-websocket-protocol", requestConfig.headersList).includes(negotiatedProtocol)) {
          errorHandler(handshakeCallback, "Protocol was not set in the opening handshake.");
          return;
        }
      }

      // Attach event listeners to the socket for data, close, and error events
      serverResponse.socket.on("data", Gl0);
      serverResponse.socket.on("close", handleWebSocketClose);
      serverResponse.socket.on("error", Dl0);

      // If there are subscribers to the 'open' event, publish the connection details
      if (lh.open.hasSubscribers) {
        lh.open.publish({
          address: serverResponse.socket.address(),
          protocol: negotiatedProtocol,
          extensions: serverExtensions
        });
      }

      // Invoke the handshake callback with the server response and negotiated extensions
      handshakeCallback(serverResponse, negotiatedExtensions);
    }
  });
}

module.exports = establishWebSocketHandshake;