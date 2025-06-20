/**
 * Initializes and manages an HTTP/2 connection between a client and a socket.
 * Handles connection lifecycle, error propagation, and emits relevant events.
 *
 * @param {object} client - The HTTP/2 client instance to associate with the connection.
 * @param {object} socket - The underlying socket to use for the connection.
 * @returns {object} An interface for interacting with the HTTP/2 connection.
 */
async function initializeHttp2Connection(client, socket) {
  // Mark the socket as associated with the client
  client[$createObjectTracker] = socket;

  // Warn about experimental createUserMessageObject support if not already warned
  if (!mh0) {
    mh0 = true;
    process.emitWarning(
      "createUserMessageObject support is experimental, expect them to change at any time.",
      { code: "UNDICI-createUserMessageObject" }
    );
  }

  // Establish HTTP/2 connection
  const http2Session = ZY1.connect(client[GY1], {
    createConnection: () => socket,
    peerMaxConcurrentStreams: client[ph0]
  });

  // Initialize session properties
  http2Session[MN] = 0;
  http2Session[qh] = client;
  http2Session[$createObjectTracker] = socket;

  // Attach event listeners to the HTTP/2 session
  P6.addListener(http2Session, "error", handleTlsCertificateAltNameError);
  P6.addListener(http2Session, "frameError", handleHttp2FrameError);
  P6.addListener(http2Session, "end", bX6);
  P6.addListener(http2Session, "goaway", handleGoawayFrame);
  P6.addListener(http2Session, "close", function () {
    // On session close, clean up client state and propagate errors
    const { [qh]: sessionClient } = this;
    const { [$createObjectTracker]: sessionSocket } = sessionClient;
    const closeError = this[$createObjectTracker][lV] || this[lV] || new Jr("closed", P6.getSocketInfo(sessionSocket));
    sessionClient[cV] = null;
    if (sessionClient.destroyed) {
      kX(sessionClient[$X6] === 0);
      const pendingRequests = sessionClient[ZR].splice(sessionClient[pV]);
      for (let i = 0; i < pendingRequests.length; i++) {
        const request = pendingRequests[i];
        P6.errorRequest(sessionClient, request, closeError);
      }
    }
  });

  // Allow the session to not keep the Node.js event loop alive
  http2Session.unref();

  // Cross-reference the session on both client and socket
  client[cV] = http2Session;
  socket[cV] = http2Session;

  // Attach error handler to the socket
  P6.addListener(socket, "error", function (err) {
    // Only allow errors that are not certificate alt name errors
    kX(err.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
    this[lV] = err;
    this[qh][md1](err);
  });

  // Attach 'end' handler to the socket
  P6.addListener(socket, "end", function () {
    // Destroy the socket when the other side closes
    P6.destroy(this, new Jr("other side closed", P6.getSocketInfo(this)));
  });

  // Attach 'close' handler to the socket
  P6.addListener(socket, "close", function () {
    // Clean up client and session state on socket close
    const closeError = this[lV] || new Jr("closed", P6.getSocketInfo(this));
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

  // Return the HTTP/2 connection interface
  return {
    version: "h2",
    defaultPipelining: Infinity,
    /**
     * Write data to the HTTP/2 connection.
     * @param {...any} args - Arguments to pass to the write function.
     * @returns {any}
     */
    write(...args) {
      return sendHttp2Request(client, ...args);
    },
    /**
     * Resume the HTTP/2 connection.
     */
    resume() {
      manageObservableReferences(client);
    },
    /**
     * Destroy the HTTP/2 connection.
     * @param {Error} error - The error to destroy with.
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
     * Indicates if the socket is destroyed.
     * @returns {boolean}
     */
    get destroyed() {
      return socket.destroyed;
    },
    /**
     * Indicates if the connection is busy (always false for HTTP/2).
     * @returns {boolean}
     */
    busy() {
      return false;
    }
  };
}

module.exports = initializeHttp2Connection;