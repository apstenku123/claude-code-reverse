/**
 * Creates and manages an HTTP/2 session adapter for a given client and socket.
 * Handles connection setup, error handling, cleanup, and exposes a uniform interface for HTTP/2 communication.
 *
 * @param {object} client - The client object representing the HTTP/2 connection context.
 * @param {object} socket - The underlying socket or stream to use for the HTTP/2 session.
 * @returns {object} An adapter object exposing HTTP/2 session methods and properties.
 */
async function createHttp2SessionAdapter(client, socket) {
  // Mark the socket as associated with the client
  client[$createObjectTracker] = socket;

  // Emit a warning if createUserMessageObject support is experimental and not yet warned
  if (!mh0) {
    mh0 = true;
    process.emitWarning(
      "createUserMessageObject support is experimental, expect them to change at any time.",
      { code: "UNDICI-createUserMessageObject" }
    );
  }

  // Establish a new HTTP/2 session using the provided socket
  const http2Session = ZY1.connect(client[GY1], {
    createConnection: () => socket,
    peerMaxConcurrentStreams: client[ph0]
  });

  // Initialize session properties
  http2Session[MN] = 0;
  http2Session[qh] = client;
  http2Session[$createObjectTracker] = socket;

  // Attach event listeners for session-level events
  P6.addListener(http2Session, "error", handleTlsCertificateAltNameError);
  P6.addListener(http2Session, "frameError", handleHttp2FrameError);
  P6.addListener(http2Session, "end", bX6);
  P6.addListener(http2Session, "goaway", handleGoawayFrame);
  P6.addListener(http2Session, "close", function onSessionClose() {
    // Destructure client and socket references from the session
    const { [qh]: sessionClient } = this;
    const { [$createObjectTracker]: sessionSocket } = sessionClient;
    // Determine the error or reason for closure
    const closeError = this[$createObjectTracker][lV] || this[lV] || new Jr("closed", P6.getSocketInfo(sessionSocket));
    // Clean up client state
    sessionClient[cV] = null;
    if (sessionClient.destroyed) {
      // Ensure all requests are cleaned up if the client is destroyed
      kX(sessionClient[$X6] === 0);
      const pendingRequests = sessionClient[ZR].splice(sessionClient[pV]);
      for (let i = 0; i < pendingRequests.length; i++) {
        const request = pendingRequests[i];
        P6.errorRequest(sessionClient, request, closeError);
      }
    }
  });

  // Prevent the session from keeping the Node.js event loop alive
  http2Session.unref();

  // Link the session to both client and socket for easy access
  client[cV] = http2Session;
  socket[cV] = http2Session;

  // Attach error handler to the socket
  P6.addListener(socket, "error", function onSocketError(error) {
    // Only allow specific TLS errors
    kX(error.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
    this[lV] = error;
    this[qh][md1](error);
  });

  // Attach end handler to the socket
  P6.addListener(socket, "end", function onSocketEnd() {
    P6.destroy(this, new Jr("other side closed", P6.getSocketInfo(this)));
  });

  // Attach close handler to the socket
  P6.addListener(socket, "close", function onSocketClose() {
    const closeError = this[lV] || new Jr("closed", P6.getSocketInfo(this));
    // Clean up client and session references
    client[$createObjectTracker] = null;
    if (this[cV] != null) {
      this[cV].destroy(closeError);
    }
    client[hd1] = client[pV];
    kX(client[YY1] === 0);
    client.emit("disconnect", client[GY1], [client], closeError);
    client[DR]();
  });

  // Track if the socket has been closed
  let socketClosed = false;
  socket.on("close", () => {
    socketClosed = true;
  });

  // Return the HTTP/2 session adapter interface
  return {
    version: "h2",
    defaultPipelining: Infinity,
    /**
     * Sends an HTTP/2 request using the session.
     * @param {...any} args - Arguments for the request.
     * @returns {any} The result of the HTTP/2 request.
     */
    write(...args) {
      return sendHttp2Request(client, ...args);
    },
    /**
     * Resumes the session if paused.
     */
    resume() {
      manageObservableReferences(client);
    },
    /**
     * Destroys the session and underlying socket.
     * @param {Error} error - The error or reason for destruction.
     * @param {Function} callback - Callback to invoke after destruction.
     */
    destroy(error, callback) {
      if (socketClosed) {
        queueMicrotask(callback);
      } else {
        socket.destroy(error).on("close", callback);
      }
    },
    /**
     * Indicates if the underlying socket is destroyed.
     * @returns {boolean}
     */
    get destroyed() {
      return socket.destroyed;
    },
    /**
     * Indicates if the session is busy (always false for HTTP/2).
     * @returns {boolean}
     */
    busy() {
      return false;
    }
  };
}

module.exports = createHttp2SessionAdapter;
