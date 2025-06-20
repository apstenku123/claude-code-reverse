/**
 * Initializes and manages an HTTP/1 connection, attaching event handlers for error, readable, end, and close events.
 * Provides an interface for writing, resuming, destroying, and checking the busy state of the connection.
 *
 * @param {object} client - The HTTP client instance managing the connection state and requests queue.
 * @param {object} socket - The underlying socket or stream representing the connection.
 * @returns {object} An interface for interacting with the HTTP/1 connection.
 */
async function initializeHttp1Connection(client, socket) {
  // Assign the client reference to the socket for later access
  socket[Nh] = client;

  // Ensure the shared handler is initialized
  if (!jd1) {
    jd1 = await xd1;
    xd1 = null;
  }

  // Initialize socket state flags
  socket[Yr] = false; // isWriting
  socket[GR] = false; // isBusy
  socket[nY] = false; // isUpgrading
  socket[Fr] = false; // isClosed

  // Attach a connection handler to the socket
  socket[d3] = new fh0(client, socket, jd1);

  // Attach error event handler
  tD1(socket, "error", function onError(error) {
    // Only allow specific TLS error to propagate
    l9(error.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
    const connectionHandler = this[d3];
    // Handle connection reset
    if (error.code === "ECONNRESET" && connectionHandler.statusCode && !connectionHandler.shouldKeepAlive) {
      connectionHandler.onMessageComplete();
      return;
    }
    // Store the error and propagate to the request handler
    this[jX] = error;
    this[kd1][FX6](error);
  });

  // Attach readable event handler
  tD1(socket, "readable", function onReadable() {
    const connectionHandler = this[d3];
    if (connectionHandler) {
      connectionHandler.readMore();
    }
  });

  // Attach end event handler
  tD1(socket, "end", function onEnd() {
    const connectionHandler = this[d3];
    if (connectionHandler.statusCode && !connectionHandler.shouldKeepAlive) {
      connectionHandler.onMessageComplete();
      return;
    }
    // Destroy the socket if the other side closed
    E4.destroy(this, new QY1("other side closed", E4.getSocketInfo(this)));
  });

  // Attach close event handler
  tD1(socket, "close", function onClose() {
    const requestHandler = this[kd1];
    const connectionHandler = this[d3];
    if (connectionHandler) {
      // If no error and message complete, finalize
      if (!this[jX] && connectionHandler.statusCode && !connectionHandler.shouldKeepAlive) {
        connectionHandler.onMessageComplete();
      }
      // Destroy the connection handler
      this[d3].destroy();
      this[d3] = null;
    }
    // Determine the error to propagate
    const error = this[jX] || new QY1("closed", E4.getSocketInfo(this));
    // Clean up request handler references
    requestHandler[Nh] = null;
    requestHandler[xh0] = null;
    if (requestHandler.destroyed) {
      // All requests should be finished
      l9(requestHandler[eJ6] === 0);
      // Remove all pending requests and propagate error
      const pendingRequests = requestHandler[uV].splice(requestHandler[_X]);
      for (let i = 0; i < pendingRequests.length; i++) {
        const pendingRequest = pendingRequests[i];
        E4.errorRequest(requestHandler, pendingRequest, error);
      }
    } else if (requestHandler[LZ] > 0 && error.code !== "UND_ERR_INFO") {
      // Error out the current request if not an informational error
      const currentRequest = requestHandler[uV][requestHandler[_X]];
      requestHandler[uV][requestHandler[_X]++] = null;
      E4.errorRequest(requestHandler, currentRequest, error);
    }
    // Update request handler state
    requestHandler[QX6] = requestHandler[_X];
    l9(requestHandler[LZ] === 0);
    // Emit disconnect event
    requestHandler.emit("disconnect", requestHandler[yh0], [requestHandler], error);
    // Finalize handler
    requestHandler[IR]();
  });

  // Track if the socket has been closed
  let isClosed = false;
  socket.on("close", () => {
    isClosed = true;
  });

  // Return the connection interface
  return {
    version: "h1",
    defaultPipelining: 1,
    /**
     * Write data to the connection
     * @param {...any} args
     * @returns {any}
     */
    write(...args) {
      return sendHttpRequestOverSocket(client, ...args);
    },
    /**
     * Resume the connection
     */
    resume() {
      manageTimeoutAndRefState(client);
    },
    /**
     * Destroy the connection
     * @param {Error} [error]
     * @param {Function} [callback]
     */
    destroy(error, callback) {
      if (isClosed) {
        queueMicrotask(callback);
      } else {
        socket.destroy(error).on("close", callback);
      }
    },
    /**
     * Indicates if the socket is destroyed
     * @returns {boolean}
     */
    get destroyed() {
      return socket.destroyed;
    },
    /**
     * Checks if the connection is busy or unable to process a new request
     * @param {object} [request]
     * @returns {boolean}
     */
    busy(request) {
      if (socket[GR] || socket[nY] || socket[Fr]) return true;
      if (request) {
        // If there are pending requests and the new request is not idempotent, or is an upgrade/CONNECT, or has a streaming/async body, mark as busy
        if (client[LZ] > 0 && !request.idempotent) return true;
        if (client[LZ] > 0 && (request.upgrade || request.method === "CONNECT")) return true;
        if (
          client[LZ] > 0 &&
          E4.bodyLength(request.body) !== 0 &&
          (E4.isStream(request.body) || E4.isAsyncIterable(request.body) || E4.isFormDataLike(request.body))
        ) {
          return true;
        }
      }
      return false;
    }
  };
}

module.exports = initializeHttp1Connection;
