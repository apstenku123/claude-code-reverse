/**
 * Establishes a network connection using the provided connection context, handles events,
 * emits lifecycle hooks, and manages errors. Publishes beforeConnect, connected, and connectError
 * events as appropriate. Handles IPv6 hostnames and negotiates protocol (h2 or fallback).
 *
 * @param {Object} connectionContext - The context object containing connection parameters and event handlers.
 * @returns {Promise<void>} Resolves when the connection attempt is complete (success or error handled).
 */
async function establishConnectionWithEvents(connectionContext) {
  // Ensure the connection is not already in progress or established
  LN(!connectionContext[Lh]);
  LN(!connectionContext[OQ]);

  // Extract connection parameters from the context
  const {
    host,
    hostname,
    protocol,
    port
  } = connectionContext[Kw];

  let resolvedHostname = hostname;

  // Handle IPv6 hostnames (enclosed in brackets)
  if (resolvedHostname[0] === "[") {
    const closingBracketIndex = resolvedHostname.indexOf("]");
    LN(closingBracketIndex !== -1);
    const ipv6Address = resolvedHostname.substring(1, closingBracketIndex);
    LN(Qm0.isIP(ipv6Address));
    resolvedHostname = ipv6Address;
  }

  // Mark connection as in progress
  connectionContext[Lh] = true;

  // Publish 'beforeConnect' event if there are subscribers
  if (Mh.beforeConnect.hasSubscribers) {
    Mh.beforeConnect.publish({
      connectParams: {
        host,
        hostname: resolvedHostname,
        protocol,
        port,
        version: connectionContext[OQ]?.version,
        servername: connectionContext[YR],
        localAddress: connectionContext[Vr]
      },
      connector: connectionContext[Cr]
    });
  }

  try {
    // Attempt to establish the connection using the provided connector
    const socket = await new Promise((resolve, reject) => {
      connectionContext[Cr]({
        host,
        hostname: resolvedHostname,
        protocol,
        port,
        servername: connectionContext[YR],
        localAddress: connectionContext[Vr]
      }, (error, resultSocket) => {
        if (error) {
          reject(error);
        } else {
          resolve(resultSocket);
        }
      });
    });

    // If the context was destroyed during connection, clean up and exit
    if (connectionContext.destroyed) {
      g_.destroy(socket.on("error", Am0), new AC6());
      return;
    }

    LN(socket);

    try {
      // Negotiate protocol: use MC6 for HTTP/2, qC6 otherwise
      connectionContext[OQ] = socket.alpnProtocol === "h2"
        ? await MC6(connectionContext, socket)
        : await qC6(connectionContext, socket);
    } catch (protocolError) {
      // Destroy socket on protocol negotiation failure, then rethrow
      socket.destroy().on("error", Am0);
      throw protocolError;
    }

    // Connection established: update socket and context state
    connectionContext[Lh] = false;
    socket[HC6] = 0;
    socket[cd1] = connectionContext[cd1];
    socket[QC6] = connectionContext;
    socket[DC6] = null;

    // Publish 'connected' event if there are subscribers
    if (Mh.connected.hasSubscribers) {
      Mh.connected.publish({
        connectParams: {
          host,
          hostname: resolvedHostname,
          protocol,
          port,
          version: connectionContext[OQ]?.version,
          servername: connectionContext[YR],
          localAddress: connectionContext[Vr]
        },
        connector: connectionContext[Cr],
        socket
      });
    }

    // Emit 'connect' event
    connectionContext.emit("connect", connectionContext[Kw], [connectionContext]);
  } catch (connectionError) {
    // If the context was destroyed, do nothing further
    if (connectionContext.destroyed) return;

    // Mark connection as not in progress
    connectionContext[Lh] = false;

    // Publish 'connectError' event if there are subscribers
    if (Mh.connectError.hasSubscribers) {
      Mh.connectError.publish({
        connectParams: {
          host,
          hostname: resolvedHostname,
          protocol,
          port,
          version: connectionContext[OQ]?.version,
          servername: connectionContext[YR],
          localAddress: connectionContext[Vr]
        },
        connector: connectionContext[Cr],
        error: connectionError
      });
    }

    // Special handling for TLS certificate errors
    if (connectionError.code === "ERR_TLS_CERT_ALTNAME_INVALID") {
      LN(connectionContext[zr] === 0);
      // Iterate over pending requests with matching servername
      while (
        connectionContext[wr] > 0 &&
        connectionContext[iV][connectionContext[nV]].servername === connectionContext[YR]
      ) {
        const pendingRequest = connectionContext[iV][connectionContext[nV]++];
        g_.errorRequest(connectionContext, pendingRequest, connectionError);
      }
    } else {
      // Generic connection error handling
      handleErrorForPendingRequests(connectionContext, connectionError);
    }

    // Emit 'connectionError' event
    connectionContext.emit(
      "connectionError",
      connectionContext[Kw],
      [connectionContext],
      connectionError
    );
  }

  // Finalize connection attempt
  connectionContext[Kr]();
}

module.exports = establishConnectionWithEvents;