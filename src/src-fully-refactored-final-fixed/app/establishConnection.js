/**
 * Establishes a network connection using the provided connection context, handling events, errors, and protocol negotiation.
 *
 * @async
 * @param {Object} connectionContext - The context object containing connection parameters and state.
 * @returns {Promise<void>} Resolves when the connection process completes.
 */
async function establishConnection(connectionContext) {
  // Ensure the connection is not already in progress or established
  LN(!connectionContext[Lh]);
  LN(!connectionContext[OQ]);

  // Destructure connection parameters from the context
  const {
    host,
    hostname,
    protocol,
    port
  } = connectionContext[Kw];

  let resolvedHostname = hostname;

  // Handle IPv6 addresses enclosed in brackets
  if (resolvedHostname[0] === "[") {
    const closingBracketIndex = resolvedHostname.indexOf("]");
    LN(closingBracketIndex !== -1);
    const ipv6Address = resolvedHostname.substring(1, closingBracketIndex);
    LN(Qm0.isIP(ipv6Address));
    resolvedHostname = ipv6Address;
  }

  // Mark connection as in progress
  connectionContext[Lh] = true;

  // Publish beforeConnect event if there are subscribers
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
    // Attempt to establish the connection using the connector function
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
      // Negotiate protocol and assign to context
      connectionContext[OQ] = socket.alpnProtocol === "h2"
        ? await MC6(connectionContext, socket)
        : await qC6(connectionContext, socket);
    } catch (protocolError) {
      // Destroy socket on protocol negotiation error and rethrow
      socket.destroy().on("error", Am0);
      throw protocolError;
    }

    // Finalize connection state and publish connected event
    connectionContext[Lh] = false;
    socket[HC6] = 0;
    socket[cd1] = connectionContext[cd1];
    socket[QC6] = connectionContext;
    socket[DC6] = null;

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
    // If context was destroyed, do nothing further
    if (connectionContext.destroyed) return;

    // Mark connection as not in progress
    connectionContext[Lh] = false;

    // Publish connectError event if there are subscribers
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

    // Special handling for TLS certificate alternative name errors
    if (connectionError.code === "ERR_TLS_CERT_ALTNAME_INVALID") {
      LN(connectionContext[zr] === 0);
      while (
        connectionContext[wr] > 0 &&
        connectionContext[iV][connectionContext[nV]].servername === connectionContext[YR]
      ) {
        const pendingRequest = connectionContext[iV][connectionContext[nV]++];
        g_.errorRequest(connectionContext, pendingRequest, connectionError);
      }
    } else {
      // Handle other connection errors
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

  // Final cleanup or next step
  connectionContext[Kr]();
}

module.exports = establishConnection;