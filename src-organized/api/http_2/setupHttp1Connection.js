/**
 * Sets up an HTTP/1 connection with event listeners and provides a connection interface.
 * Handles error, readable, end, and close events for the underlying socket.
 * Returns an object for interacting with the connection (write, resume, destroy, busy, etc).
 *
 * @param {object} client - The HTTP client instance managing the connection state and requests queue.
 * @param {object} socket - The underlying socket or stream for the HTTP/1 connection.
 * @returns {object} An interface for interacting with the HTTP/1 connection.
 */
async function setupHttp1Connection(client, socket) {
  // Assign the client to the socket for reference
  socket[Nh] = client;

  // Ensure the shared parser instance is initialized
  if (!jd1) {
    jd1 = await xd1;
    xd1 = null;
  }

  // Initialize socket state flags
  socket[Yr] = false; // isUpgrading
  socket[GR] = false; // isBusy
  socket[nY] = false; // isReading
  socket[Fr] = false; // isWriting

  // Attach HTTP parser to the socket
  socket[d3] = new fh0(client, socket, jd1);

  // Handle error events on the socket
  tD1(socket, "error", function onError(error) {
    l9(error.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
    const parser = this[d3];
    if (error.code === "ECONNRESET" && parser.statusCode && !parser.shouldKeepAlive) {
      parser.onMessageComplete();
      return;
    }
    this[jX] = error;
    this[kd1][FX6](error);
  });

  // Handle readable events (data available to read)
  tD1(socket, "readable", function onReadable() {
    const parser = this[d3];
    if (parser) parser.readMore();
  });

  // Handle end events (remote closed connection)
  tD1(socket, "end", function onEnd() {
    const parser = this[d3];
    if (parser.statusCode && !parser.shouldKeepAlive) {
      parser.onMessageComplete();
      return;
    }
    E4.destroy(this, new QY1("other side closed", E4.getSocketInfo(this)));
  });

  // Handle close events (socket fully closed)
  tD1(socket, "close", function onClose() {
    const requestQueue = this[kd1];
    const parser = this[d3];
    if (parser) {
      // If no error and response is complete, finalize message
      if (!this[jX] && parser.statusCode && !parser.shouldKeepAlive) {
        parser.onMessageComplete();
      }
      // Destroy parser and remove reference
      this[d3].destroy();
      this[d3] = null;
    }
    // Determine error to propagate
    const error = this[jX] || new QY1("closed", E4.getSocketInfo(this));
    // Clean up request queue references
    requestQueue[Nh] = null;
    requestQueue[xh0] = null;
    if (requestQueue.destroyed) {
      // If already destroyed, ensure all pending requests are errored
      l9(requestQueue[eJ6] === 0);
      const pendingRequests = requestQueue[uV].splice(requestQueue[_X]);
      for (let i = 0; i < pendingRequests.length; i++) {
        const pendingRequest = pendingRequests[i];
        E4.errorRequest(requestQueue, pendingRequest, error);
      }
    } else if (requestQueue[LZ] > 0 && error.code !== "UND_ERR_INFO") {
      // If there are pending requests, error the current one
      const currentRequest = requestQueue[uV][requestQueue[_X]];
      requestQueue[uV][requestQueue[_X]++] = null;
      E4.errorRequest(requestQueue, currentRequest, error);
    }
    // Update request queue state
    requestQueue[QX6] = requestQueue[_X];
    l9(requestQueue[LZ] === 0);
    requestQueue.emit("disconnect", requestQueue[yh0], [requestQueue], error);
    requestQueue[IR]();
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
     * Write data to the connection.
     * @param {...any} args
     * @returns {any}
     */
    write(...args) {
      return sendHttpRequestOverSocket(client, ...args);
    },
    /**
     * Resume the connection (continue processing requests).
     */
    resume() {
      manageTimeoutAndRefState(client);
    },
    /**
     * Destroy the connection.
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
     * Indicates if the connection is destroyed.
     * @returns {boolean}
     */
    get destroyed() {
      return socket.destroyed;
    },
    /**
     * Checks if the connection is busy or cannot accept a new request.
     * @param {object} [request]
     * @returns {boolean}
     */
    busy(request) {
      if (socket[GR] || socket[nY] || socket[Fr]) return true;
      if (request) {
        // If there are pending requests and the new request is not idempotent
        if (client[LZ] > 0 && !request.idempotent) return true;
        // If there are pending requests and the new request is an upgrade or CONNECT
        if (client[LZ] > 0 && (request.upgrade || request.method === "CONNECT")) return true;
        // If there are pending requests and the body is non-empty and is a stream/async iterable/form-data
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

module.exports = setupHttp1Connection;
