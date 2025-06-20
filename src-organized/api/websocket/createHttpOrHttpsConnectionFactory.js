/**
 * Creates a connection factory function for HTTP or HTTPS sockets with session caching and keep-alive support.
 *
 * @param {Object} options - Configuration options for the connection factory.
 * @param {boolean} [options.allowHttp2=false] - Whether to allow HTTP/2 (ALPN negotiation for 'h2').
 * @param {number} [options.maxCachedSessions=100] - Maximum number of TLS sessions to cache (for session resumption).
 * @param {string} [options.socketPath] - Optional UNIX domain socket path.
 * @param {number} [options.timeout=10000] - Socket timeout in milliseconds.
 * @param {Buffer} [options.session] - Optional TLS session to use for resumption.
 * @param {...any} [options.extraOptions] - Additional options to pass to the underlying socket connect methods.
 * @returns {Function} a factory function that creates and returns a connected socket based on the provided connection options.
 */
function createHttpOrHttpsConnectionFactory({
  allowHttp2 = false,
  maxCachedSessions = 100,
  socketPath,
  timeout = 10000,
  session: providedSession,
  ...extraSocketOptions
}) {
  // Validate maxCachedSessions
  if (maxCachedSessions != null && (!Number.isInteger(maxCachedSessions) || maxCachedSessions < 0)) {
    throw new FW6("maxCachedSessions must be a positive integer or zero");
  }

  // Prepare base socket options
  const baseSocketOptions = {
    path: socketPath,
    ...extraSocketOptions
  };

  // Session cache for TLS session resumption
  const sessionCache = new Jd1(maxCachedSessions == null ? 100 : maxCachedSessions);

  /**
   * Connection factory function.
   * @param {Object} connectionOptions - Options for the specific connection.
   * @param {string} connectionOptions.hostname - The remote host name.
   * @param {string} [connectionOptions.host] - The remote host (may be same as hostname).
   * @param {string} connectionOptions.protocol - 'http:' or 'https:'.
   * @param {number} [connectionOptions.port] - The remote port.
   * @param {string} [connectionOptions.servername] - TLS SNI server name.
   * @param {string} [connectionOptions.localAddress] - Local address to bind to.
   * @param {Socket} [connectionOptions.httpSocket] - Existing socket (for TLS upgrade).
   * @param {Function} [callback] - Optional callback(err, socket) for when the connection is established or fails.
   * @returns {Socket} The connected socket instance.
   */
  return function connectionFactory({
    hostname,
    host,
    protocol,
    port,
    servername,
    localAddress,
    httpSocket
  }, callback) {
    let socket;

    if (protocol === "https:") {
      // Lazy-load TLS module if needed
      if (!Fd1) Fd1 = G1("node:tls");

      // Determine SNI server name
      let sniServername = servername || baseSocketOptions.servername || Ag0.getServerName(host) || null;
      let sessionKey = sniServername || hostname;

      // Validate SNI
      ob0(sessionKey);

      // Retrieve session for resumption if available
      let tlsSession = providedSession || sessionCache.get(sessionKey) || null;

      // Default HTTPS port
      const connectionPort = port || 443;

      // Create TLS socket
      socket = Fd1.connect({
        highWaterMark: 16384,
        ...baseSocketOptions,
        servername: sniServername,
        session: tlsSession,
        localAddress,
        ALPNProtocols: allowHttp2 ? ["http/1.1", "h2"] : ["http/1.1"],
        socket: httpSocket,
        port: connectionPort,
        host: hostname
      });

      // Cache new TLS session when received
      socket.on("session", function (sessionBuffer) {
        sessionCache.set(sessionKey, sessionBuffer);
      });
    } else {
      // For HTTP, httpSocket should not be provided
      ob0(!httpSocket, "httpSocket can only be sent on TLS update");

      // Default HTTP port
      const connectionPort = port || 80;

      // Create plain TCP socket
      socket = WW6.connect({
        highWaterMark: 65536,
        ...baseSocketOptions,
        localAddress,
        port: connectionPort,
        host: hostname
      });
    }

    // Enable keep-alive if not explicitly disabled
    if (baseSocketOptions.keepAlive == null || baseSocketOptions.keepAlive) {
      const keepAliveDelay = baseSocketOptions.keepAliveInitialDelay === undefined ? 60000 : baseSocketOptions.keepAliveInitialDelay;
      socket.setKeepAlive(true, keepAliveDelay);
    }

    // Setup timeout watcher using WeakRef
    const timeoutCleanup = CW6(new WeakRef(socket), {
      timeout,
      hostname,
      port: port || (protocol === "https:" ? 443 : 80)
    });

    // Set TCP_NODELAY and handle connection events
    socket.setNoDelay(true)
      .once(protocol === "https:" ? "secureConnect" : "connect", function () {
        // Schedule timeout cleanup
        queueMicrotask(timeoutCleanup);
        if (callback) {
          const cb = callback;
          callback = null;
          cb(null, this);
        }
      })
      .on("error", function (err) {
        // Schedule timeout cleanup
        queueMicrotask(timeoutCleanup);
        if (callback) {
          const cb = callback;
          callback = null;
          cb(err);
        }
      });

    return socket;
  };
}

module.exports = createHttpOrHttpsConnectionFactory;