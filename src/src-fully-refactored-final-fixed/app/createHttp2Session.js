/**
 * Establishes and manages an HTTP/2 session between a client and server.
 * Handles connection lifecycle, error management, and exposes an interface for sending requests and controlling the session.
 *
 * @param {object} clientContext - The client context containing connection and stream configuration.
 * @param {object} socket - The underlying network socket to use for the HTTP/2 session.
 * @returns {object} An interface for interacting with the HTTP/2 session (send, destroy, etc).
 */
async function createHttp2Session(clientContext, socket) {
  // Set the socket reference on the client context
  clientContext[$createObjectTracker] = socket;

  // Emit a warning about experimental createUserMessageObject support (only once)
  if (!mh0) {
    mh0 = true;
    process.emitWarning(
      "createUserMessageObject support is experimental, expect them to change at any time.",
      { code: "UNDICI-createUserMessageObject" }
    );
  }

  // Establish the HTTP/2 connection
  const http2Session = ZY1.connect(clientContext[GY1], {
    createConnection: () => socket,
    peerMaxConcurrentStreams: clientContext[ph0]
  });

  // Initialize session state and references
  http2Session[MN] = 0;
  http2Session[qh] = clientContext;
  http2Session[$createObjectTracker] = socket;

  // Attach event listeners for session-level events
  P6.addListener(http2Session, "error", handleTlsCertificateAltNameError);
  P6.addListener(http2Session, "frameError", handleHttp2FrameError);
  P6.addListener(http2Session, "end", bX6);
  P6.addListener(http2Session, "goaway", handleGoawayFrame);
  P6.addListener(http2Session, "close", function onSessionClose() {
    // Destructure references for clarity
    const { [qh]: context } = this;
    const { [$createObjectTracker]: sessionSocket } = context;
    // Determine the error or closed reason
    const closeReason = this[$createObjectTracker][lV] || this[lV] || new Jr("closed", P6.getSocketInfo(sessionSocket));
    // Nullify the session reference on the context
    context[cV] = null;
    if (context.destroyed) {
      // Assert all streams are closed
      kX(context[$X6] === 0);
      // Remove all pending requests and error them
      const pendingRequests = context[ZR].splice(context[pV]);
      for (let i = 0; i < pendingRequests.length; i++) {
        const request = pendingRequests[i];
        P6.errorRequest(context, request, closeReason);
      }
    }
  });

  // Allow the session to not keep the event loop alive
  http2Session.unref();

  // Link the session to both the client context and the socket
  clientContext[cV] = http2Session;
  socket[cV] = http2Session;

  // Attach error handler to the socket
  P6.addListener(socket, "error", function onSocketError(error) {
    // Only allow certain TLS errors
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
    const closeReason = this[lV] || new Jr("closed", P6.getSocketInfo(this));
    // Remove socket reference from client context
    clientContext[$createObjectTracker] = null;
    // Destroy the session if isBlobOrFileLikeObject exists
    if (this[cV] != null) {
      this[cV].destroy(closeReason);
    }
    // Update context state
    clientContext[hd1] = clientContext[pV];
    kX(clientContext[YY1] === 0);
    clientContext.emit("disconnect", clientContext[GY1], [clientContext], closeReason);
    clientContext[DR]();
  });

  // Track if the socket has been closed
  let socketClosed = false;
  socket.on("close", () => {
    socketClosed = true;
  });

  // Return the HTTP/2 session interface
  return {
    version: "h2",
    defaultPipelining: Infinity,
    /**
     * Sends an HTTP/2 request using the session.
     * @param {...any} args - Request arguments
     * @returns {any}
     */
    write(...args) {
      return sendHttp2Request(clientContext, ...args);
    },
    /**
     * Resumes the session if paused.
     */
    resume() {
      manageObservableReferences(clientContext);
    },
    /**
     * Destroys the session and underlying socket.
     * @param {Error} error - The error or reason for destruction.
     * @param {Function} callback - Called when destruction is complete.
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

module.exports = createHttp2Session;