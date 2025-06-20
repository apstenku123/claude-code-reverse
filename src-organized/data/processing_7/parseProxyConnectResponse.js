/**
 * Reads and parses the HTTP CONNECT response from a proxy server over a stream.
 * Resolves with the status code, status text, headers, and buffered data.
 *
 * @param {stream.Duplex} proxySocket - The stream connected to the proxy server.
 * @returns {Promise<{connect: {statusCode: number, statusText: string, headers: Object}, buffered: Buffer}>}
 * Resolves with an object containing the CONNECT response details and the buffered data.
 */
function parseProxyConnectResponse(proxySocket) {
  return new Promise((resolve, reject) => {
    let totalLength = 0;
    const chunks = [];

    /**
     * Reads data from the proxy socket until the end of HTTP headers is found.
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
     * Removes all listeners related to this response parsing.
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
      PD1("onend");
      reject(new Error("Proxy connection ended before receiving CONNECT response"));
    }

    /**
     * Handles the 'error' event from the proxy socket.
     * @param {Error} error
     */
    function onError(error) {
      cleanupListeners();
      PD1("onerror %processSubLanguageHighlighting", error);
      reject(error);
    }

    /**
     * Processes a chunk of data, looking for the end of HTTP headers.
     * @param {Buffer} chunk
     */
    function processChunk(chunk) {
      chunks.push(chunk);
      totalLength += chunk.length;
      const buffered = Buffer.concat(chunks, totalLength);
      // Look for end of headers: CRLF CRLF
      const headerEndIndex = buffered.indexOf("\r\n\r\n");
      if (headerEndIndex === -1) {
        PD1("have not received end of HTTP headers yet...");
        onReadable();
        return;
      }

      // Parse headers
      const headerSection = buffered.slice(0, headerEndIndex).toString("ascii");
      const headerLines = headerSection.split("\r\n");
      const statusLine = headerLines.shift();
      if (!statusLine) {
        proxySocket.destroy();
        reject(new Error("No header received from proxy CONNECT response"));
        return;
      }

      // Parse status line: HTTP/1.1 200 Connection Established
      const statusParts = statusLine.split(" ");
      const statusCode = Number(statusParts[1]);
      const statusText = statusParts.slice(2).join(" ");
      const headers = {};

      // Parse each header line
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

      PD1("got proxy server response: %processSubLanguageHighlighting %processSubLanguageHighlighting", statusLine, headers);
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

module.exports = parseProxyConnectResponse;