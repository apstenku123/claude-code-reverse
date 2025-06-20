/**
 * Initiates a WebSocket connection with support for redirects, protocols, extensions, and error handling.
 *
 * @param {Object} webSocketInstance - The WebSocket instance to operate on.
 * @param {string|Object} urlOrUrlObject - The URL string or URL object for the WebSocket connection.
 * @param {string[]} subprotocols - Array of requested subprotocols.
 * @param {Object} options - Additional connection options and headers.
 * @returns {void}
 */
function initiateWebSocketConnection(webSocketInstance, urlOrUrlObject, subprotocols, options) {
  // Default connection options
  const defaultOptions = {
    allowSynchronousEvents: true,
    autoPong: true,
    protocolVersion: zx1[1],
    maxPayload: 104857600,
    skipUTF8Validation: false,
    perMessageDeflate: true,
    followRedirects: false,
    maxRedirects: 10,
    ...options,
    socketPath: undefined,
    hostname: undefined,
    protocol: undefined,
    timeout: undefined,
    method: "GET",
    host: undefined,
    path: undefined,
    port: undefined
  };

  // Set autoPong property on the WebSocket instance
  webSocketInstance._autoPong = defaultOptions.autoPong;

  // Validate protocol version
  if (!zx1.includes(defaultOptions.protocolVersion)) {
    throw new RangeError(`Unsupported protocol version: ${defaultOptions.protocolVersion} (supported versions: ${zx1.join(", ")})`);
  }

  let urlObject;
  // Parse the URL or use the provided URL object
  if (urlOrUrlObject instanceof Kx1) {
    urlObject = urlOrUrlObject;
  } else {
    try {
      urlObject = new Kx1(urlOrUrlObject);
    } catch (error) {
      throw new SyntaxError(`Invalid URL: ${urlOrUrlObject}`);
    }
  }

  // Normalize protocol to ws/wss
  if (urlObject.protocol === "http:") {
    urlObject.protocol = "ws:";
  } else if (urlObject.protocol === "https:") {
    urlObject.protocol = "wss:";
  }

  webSocketInstance._url = urlObject.href;

  const isSecure = urlObject.protocol === "wss:";
  const isUnixSocket = urlObject.protocol === "ws+unix:";
  let urlError;

  // Validate protocol and URL
  if (urlObject.protocol !== "ws:" && !isSecure && !isUnixSocket) {
    urlError = `The URL'createInteractionAccessor protocol must be one of \"ws:\", \"wss:\", \"http:\", \"https\", or \"ws+unix:\"`;
  } else if (isUnixSocket && !urlObject.pathname) {
    urlError = "The URL'createInteractionAccessor pathname is empty";
  } else if (urlObject.hash) {
    urlError = "The URL contains a fragment identifier";
  }

  // Handle URL errors
  if (urlError) {
    const syntaxError = new SyntaxError(urlError);
    if (webSocketInstance._redirects === 0) {
      throw syntaxError;
    } else {
      closeConnectionWithError(webSocketInstance, syntaxError);
      return;
    }
  }

  const defaultPort = isSecure ? 443 : 80;
  const secWebSocketKey = dj4(16).toString("base64");
  const requestFn = isSecure ? gj4.request : hj4.request;
  const requestedSubprotocols = new Set();
  let perMessageDeflateExtension;

  // Set up connection options
  defaultOptions.createConnection = defaultOptions.createConnection || (isSecure ? connectWithServerNameResolution : connectWithSocketPath);
  defaultOptions.defaultPort = defaultOptions.defaultPort || defaultPort;
  defaultOptions.port = urlObject.port || defaultPort;
  defaultOptions.host = urlObject.hostname.startsWith("[") ? urlObject.hostname.slice(1, -1) : urlObject.hostname;
  defaultOptions.headers = {
    ...defaultOptions.headers,
    "Sec-WebSocket-Version": defaultOptions.protocolVersion,
    "Sec-WebSocket-Key": secWebSocketKey,
    Connection: "Upgrade",
    Upgrade: "websocket"
  };
  defaultOptions.path = urlObject.pathname + urlObject.search;
  defaultOptions.timeout = defaultOptions.handshakeTimeout;

  // Handle per-message deflate extension
  if (defaultOptions.perMessageDeflate) {
    perMessageDeflateExtension = new RL(
      defaultOptions.perMessageDeflate !== true ? defaultOptions.perMessageDeflate : {},
      false,
      defaultOptions.maxPayload
    );
    defaultOptions.headers["Sec-WebSocket-Extensions"] = oj4({
      [RL.extensionName]: perMessageDeflateExtension.offer()
    });
  }

  // Validate and add subprotocols
  if (subprotocols.length) {
    for (const protocol of subprotocols) {
      if (typeof protocol !== "string" || !Ak4.test(protocol) || requestedSubprotocols.has(protocol)) {
        throw new SyntaxError("An invalid or duplicated subprotocol was specified");
      }
      requestedSubprotocols.add(protocol);
    }
    defaultOptions.headers["Sec-WebSocket-Protocol"] = subprotocols.join(",");
  }

  // Handle origin header
  if (defaultOptions.origin) {
    if (defaultOptions.protocolVersion < 13) {
      defaultOptions.headers["Sec-WebSocket-Origin"] = defaultOptions.origin;
    } else {
      defaultOptions.headers.Origin = defaultOptions.origin;
    }
  }

  // Handle basic auth
  if (urlObject.username || urlObject.password) {
    defaultOptions.auth = `${urlObject.username}:${urlObject.password}`;
  }

  // Handle Unix socket path
  if (isUnixSocket) {
    const [socketPath, socketRequestPath] = defaultOptions.path.split(":");
    defaultOptions.socketPath = socketPath;
    defaultOptions.path = socketRequestPath;
  }

  let request;

  // Handle redirects
  if (defaultOptions.followRedirects) {
    if (webSocketInstance._redirects === 0) {
      webSocketInstance._originalIpc = isUnixSocket;
      webSocketInstance._originalSecure = isSecure;
      webSocketInstance._originalHostOrSocketPath = isUnixSocket ? defaultOptions.socketPath : urlObject.host;
      const originalHeaders = options && options.headers;
      options = {
        ...options,
        headers: {}
      };
      if (originalHeaders) {
        for (const [headerName, headerValue] of Object.entries(originalHeaders)) {
          options.headers[headerName.toLowerCase()] = headerValue;
        }
      }
    } else if (webSocketInstance.listenerCount("redirect") === 0) {
      // If not the original request, clean up sensitive headers
      const isSameTarget = isUnixSocket
        ? (webSocketInstance._originalIpc ? defaultOptions.socketPath === webSocketInstance._originalHostOrSocketPath : false)
        : (webSocketInstance._originalIpc ? false : urlObject.host === webSocketInstance._originalHostOrSocketPath);
      if (!isSameTarget || (webSocketInstance._originalSecure && !isSecure)) {
        delete defaultOptions.headers.authorization;
        delete defaultOptions.headers.cookie;
        if (!isSameTarget) delete defaultOptions.headers.host;
        defaultOptions.auth = undefined;
      }
    }
    // Add authorization header if needed
    if (defaultOptions.auth && !options.headers.authorization) {
      options.headers.authorization = "Basic " + Buffer.from(defaultOptions.auth).toString("base64");
    }
    request = webSocketInstance._req = requestFn(defaultOptions);
    if (webSocketInstance._redirects) {
      webSocketInstance.emit("redirect", webSocketInstance.url, request);
    }
  } else {
    request = webSocketInstance._req = requestFn(defaultOptions);
  }

  // Handle handshake timeout
  if (defaultOptions.timeout) {
    request.on("timeout", () => {
      handleConnectionClosure(webSocketInstance, request, "Opening handshake has timed out");
    });
  }

  // Handle request error
  request.on("error", error => {
    if (request === null || request[h70]) return;
    request = webSocketInstance._req = null;
    closeConnectionWithError(webSocketInstance, error);
  });

  // Handle HTTP response (for redirects or unexpected responses)
  request.on("response", response => {
    const locationHeader = response.headers.location;
    const statusCode = response.statusCode;
    if (locationHeader && defaultOptions.followRedirects && statusCode >= 300 && statusCode < 400) {
      if (++webSocketInstance._redirects > defaultOptions.maxRedirects) {
        handleConnectionClosure(webSocketInstance, request, "Maximum redirects exceeded");
        return;
      }
      request.abort();
      let redirectUrlObject;
      try {
        redirectUrlObject = new Kx1(locationHeader, urlOrUrlObject);
      } catch (parseError) {
        const syntaxError = new SyntaxError(`Invalid URL: ${locationHeader}`);
        closeConnectionWithError(webSocketInstance, syntaxError);
        return;
      }
      initiateWebSocketConnection(webSocketInstance, redirectUrlObject, subprotocols, options);
    } else if (!webSocketInstance.emit("unexpected-response", request, response)) {
      handleConnectionClosure(webSocketInstance, request, `Unexpected server response: ${response.statusCode}`);
    }
  });

  // Handle protocol upgrade
  request.on("upgrade", (response, socket, upgradeHead) => {
    webSocketInstance.emit("upgrade", response);
    if (webSocketInstance.readyState !== O4.CONNECTING) return;
    request = webSocketInstance._req = null;
    const upgradeHeader = response.headers.upgrade;
    if (upgradeHeader === undefined || upgradeHeader.toLowerCase() !== "websocket") {
      handleConnectionClosure(webSocketInstance, socket, "Invalid Upgrade header");
      return;
    }
    // Validate Sec-WebSocket-Accept header
    const expectedAccept = uj4("sha1").update(secWebSocketKey + ij4).digest("base64");
    if (response.headers["sec-websocket-accept"] !== expectedAccept) {
      handleConnectionClosure(webSocketInstance, socket, "Invalid Sec-WebSocket-Accept header");
      return;
    }
    // Validate subprotocol negotiation
    const serverProtocol = response.headers["sec-websocket-protocol"];
    let protocolError;
    if (serverProtocol !== undefined) {
      if (!requestedSubprotocols.size) {
        protocolError = "Server sent a subprotocol but none was requested";
      } else if (!requestedSubprotocols.has(serverProtocol)) {
        protocolError = "Server sent an invalid subprotocol";
      }
    } else if (requestedSubprotocols.size) {
      protocolError = "Server sent no subprotocol";
    }
    if (protocolError) {
      handleConnectionClosure(webSocketInstance, socket, protocolError);
      return;
    }
    if (serverProtocol) {
      webSocketInstance._protocol = serverProtocol;
    }
    // Handle extensions negotiation
    const serverExtensions = response.headers["sec-websocket-extensions"];
    if (serverExtensions !== undefined) {
      if (!perMessageDeflateExtension) {
        handleConnectionClosure(webSocketInstance, socket, "Server sent a Sec-WebSocket-Extensions header but no extension was requested");
        return;
      }
      let parsedExtensions;
      try {
        parsedExtensions = tj4(serverExtensions);
      } catch (parseError) {
        handleConnectionClosure(webSocketInstance, socket, "Invalid Sec-WebSocket-Extensions header");
        return;
      }
      const extensionNames = Object.keys(parsedExtensions);
      if (extensionNames.length !== 1 || extensionNames[0] !== RL.extensionName) {
        handleConnectionClosure(webSocketInstance, socket, "Server indicated an extension that was not requested");
        return;
      }
      try {
        perMessageDeflateExtension.accept(parsedExtensions[RL.extensionName]);
      } catch (acceptError) {
        handleConnectionClosure(webSocketInstance, socket, "Invalid Sec-WebSocket-Extensions header");
        return;
      }
      webSocketInstance._extensions[RL.extensionName] = perMessageDeflateExtension;
    }
    // Finalize the socket setup
    webSocketInstance.setSocket(socket, upgradeHead, {
      allowSynchronousEvents: defaultOptions.allowSynchronousEvents,
      generateMask: defaultOptions.generateMask,
      maxPayload: defaultOptions.maxPayload,
      skipUTF8Validation: defaultOptions.skipUTF8Validation
    });
  });

  // Finalize request
  if (defaultOptions.finishRequest) {
    defaultOptions.finishRequest(request, webSocketInstance);
  } else {
    request.end();
  }
}

module.exports = initiateWebSocketConnection;