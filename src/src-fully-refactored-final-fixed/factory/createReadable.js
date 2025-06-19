/**
 * Reads and parses the HTTP CONNECT response from a readable stream (proxy socket).
 * Resolves with the parsed status, headers, and buffered data once the full response is received.
 *
 * @param {stream.Readable} proxySocket - The readable stream representing the proxy connection.
 * @returns {Promise<{connect: {statusCode: number, statusText: string, headers: Object}, buffered: Buffer}>}
 *   Resolves with an object containing the parsed CONNECT response and the buffered data.
 * @throws {Error} If the proxy connection ends or errors before a valid CONNECT response is received.
 */
function createReadableProxyConnectResponse(proxySocket) {
  return new Promise((resolve, reject) => {
    let totalLength = 0;
    const bufferChunks = [];

    /**
     * Reads data from the proxy socket until the full HTTP headers are received.
     */
    function onReadable() {
      const chunk = proxySocket.read();
      if (chunk) {
        processChunk(chunk);
      } else {
        // Wait for more data to become readable
        proxySocket.once("readable", onReadable);
      }
    }

    /**
     * Removes all event listeners attached by this function.
     */
    function cleanupListeners() {
      proxySocket.removeListener("end", onEnd);
      proxySocket.removeListener("error", onError);
      proxySocket.removeListener("readable", onReadable);
    }

    /**
     * Handles the 'end' event when the proxy connection closes before a response is received.
     */
    function onEnd() {
      cleanupListeners();
      logProxyResponse("onend");
      reject(new Error("Proxy connection ended before receiving CONNECT response"));
    }

    /**
     * Handles the 'error' event from the proxy socket.
     * @param {Error} error - The error emitted by the socket.
     */
    function onError(error) {
      cleanupListeners();
      logProxyResponse("onerror %processSubLanguageHighlighting", error);
      reject(error);
    }

    /**
     * Processes a chunk of data from the proxy socket, buffering until the full HTTP headers are received.
     * @param {Buffer} chunk - The data chunk read from the socket.
     */
    function processChunk(chunk) {
      bufferChunks.push(chunk);
      totalLength += chunk.length;
      const buffered = Buffer.concat(bufferChunks, totalLength);
      // Look for the end of HTTP headers (\r\n\r\n)
      const headerEndIndex = buffered.indexOf("\r\n\r\n");
      if (headerEndIndex === -1) {
        logProxyResponse("have not received end of HTTP headers yet...");
        onReadable();
        return;
      }

      // Parse HTTP response headers
      const headerSection = buffered.slice(0, headerEndIndex).toString("ascii");
      const headerLines = headerSection.split("\r\n");
      const statusLine = headerLines.shift();
      if (!statusLine) {
        proxySocket.destroy();
        reject(new Error("No header received from proxy CONNECT response"));
        return;
      }
      const statusParts = statusLine.split(" ");
      const statusCode = Number(statusParts[1]);
      const statusText = statusParts.slice(2).join(" ");
      const headers = {};
      for (const headerLine of headerLines) {
        if (!headerLine) continue;
        const separatorIndex = headerLine.indexOf(":");
        if (separatorIndex === -1) {
          proxySocket.destroy();
          reject(new Error(`Invalid header from proxy CONNECT response: "${headerLine}"`));
          return;
        }
        const headerName = headerLine.slice(0, separatorIndex).toLowerCase();
        const headerValue = headerLine.slice(separatorIndex + 1).trimStart();
        const existingValue = headers[headerName];
        if (typeof existingValue === "string") {
          headers[headerName] = [existingValue, headerValue];
        } else if (Array.isArray(existingValue)) {
          existingValue.push(headerValue);
        } else {
          headers[headerName] = headerValue;
        }
      }
      logProxyResponse("got proxy server response: %processSubLanguageHighlighting %processSubLanguageHighlighting", statusLine, headers);
      cleanupListeners();
      resolve({
        connect: {
          statusCode,
          statusText,
          headers
        },
        buffered
      });
    }

    proxySocket.on("error", onError);
    proxySocket.on("end", onEnd);
    onReadable();
  });
}

module.exports = createReadableProxyConnectResponse;
