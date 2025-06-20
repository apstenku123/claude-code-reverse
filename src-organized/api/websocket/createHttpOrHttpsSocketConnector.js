/**
 * Creates a socket connector function for HTTP/HTTPS connections with session caching and keep-alive support.
 *
 * @param {Object} options - Configuration options for the connector.
 * @param {boolean} [options.allowH2=false] - Whether to allow HTTP/2 ALPN negotiation.
 * @param {number} [options.maxCachedSessions=100] - Maximum number of cached TLS sessions.
 * @param {string} [options.socketPath] - Path to the UNIX socket.
 * @param {number} [options.timeout=10000] - Socket timeout in milliseconds.
 * @param {Buffer} [options.session] - TLS session to use for HTTPS connections.
 * @param {...any} [options.extraOptions] - Additional options to pass to the socket constructor.
 * @returns {Function} Connector function that establishes a socket connection based on the provided parameters.
 */
function createHttpOrHttpsSocketConnector({
  allowH2 = false,
  maxCachedSessions = 100,
  socketPath,
  timeout = 10000,
  session: tlsSession,
  ...extraOptions
}) {
  // Validate maxCachedSessions
  if (maxCachedSessions != null && (!Number.isInteger(maxCachedSessions) || maxCachedSessions < 0)) {
    throw new FW6("maxCachedSessions must be a positive integer or zero");
  }

  // Prepare base options for socket connection
  const baseSocketOptions = {
    path: socketPath,
    ...extraOptions
  };

  // Session cache for HTTPS connections
  const sessionCache = new Jd1(maxCachedSessions == null ? 100 : maxCachedSessions);

  /**
   * Establishes a socket connection (HTTP or HTTPS) with the given parameters.
   *
   * @param {Object} connectionOptions - Options for the connection.
   * @param {string} connectionOptions.hostname - Hostname to connect to.
   * @param {string} connectionOptions.host - Host to connect to.
   * @param {string} connectionOptions.protocol - Protocol ("http:" or "https:").
   * @param {number} connectionOptions.port - Port to connect to.
   * @param {string} connectionOptions.servername - TLS servername for SNI.
   * @param {string} connectionOptions.localAddress - Local address to bind to.
   * @param {Socket} connectionOptions.httpSocket - Existing HTTP socket (for upgrades).
   * @param {Function} [callback] - Optional callback for connection events.
   * @returns {Socket} The established socket.
   */
  return function connectSocket({
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
      // Lazy-load TLS module if necessary
      if (!Fd1) Fd1 = G1("node:tls");

      // Determine servername for SNI
      let resolvedServername = servername || baseSocketOptions.servername || Ag0.getServerName(host) || null;
      let sessionKey = resolvedServername || hostname;
      ob0(sessionKey);

      // Retrieve session from cache or use provided session
      let sessionToUse = tlsSession || sessionCache.get(sessionKey) || null;
      const tlsOptions = {
        highWaterMark: 16384,
        ...baseSocketOptions,
        servername: resolvedServername,
        session: sessionToUse,
        localAddress,
        ALPNProtocols: allowH2 ? ["http/1.1", "h2"] : ["http/1.1"],
        socket: httpSocket,
        port: port || 443,
        host: hostname
      };

      // Create TLS socket
      socket = Fd1.connect(tlsOptions);

      // Cache new session when received
      socket.on("session", function (session) {
        sessionCache.set(sessionKey, session);
      });
    } else {
      // Ensure httpSocket is not used for non-TLS connections
      ob0(!httpSocket, "httpSocket can only be sent on TLS update");
      const tcpOptions = {
        highWaterMark: 65536,
        ...baseSocketOptions,
        localAddress,
        port: port || 80,
        host: hostname
      };
      // Create TCP socket
      socket = WW6.connect(tcpOptions);
    }

    // Set keep-alive if not explicitly disabled
    if (baseSocketOptions.keepAlive == null || baseSocketOptions.keepAlive) {
      const keepAliveDelay = baseSocketOptions.keepAliveInitialDelay === undefined ? 60000 : baseSocketOptions.keepAliveInitialDelay;
      socket.setKeepAlive(true, keepAliveDelay);
    }

    // Setup timeout watcher using a WeakRef to the socket
    const timeoutWatcher = CW6(new WeakRef(socket), {
      timeout,
      hostname,
      port: port || (protocol === "https:" ? 443 : 80)
    });

    // Set no-delay and handle connection events
    socket.setNoDelay(true)
      .once(protocol === "https:" ? "secureConnect" : "connect", function () {
        queueMicrotask(timeoutWatcher);
        if (callback) {
          const cb = callback;
          callback = null;
          cb(null, this);
        }
      })
      .on("error", function (err) {
        queueMicrotask(timeoutWatcher);
        if (callback) {
          const cb = callback;
          callback = null;
          cb(err);
        }
      });

    return socket;
  };
}

module.exports = createHttpOrHttpsSocketConnector;
