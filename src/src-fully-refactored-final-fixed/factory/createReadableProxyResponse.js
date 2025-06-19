/**
 * Reads and parses the HTTP CONNECT response from a readable stream (typically a proxy connection).
 * Resolves with the parsed status, headers, and buffered data once the full HTTP response is received.
 *
 * @param {Readable} proxySocket - The readable stream representing the proxy connection.
 * @returns {Promise<{connect: {statusCode: number, statusText: string, headers: Object}, buffered: Buffer}>}
 *   Resolves with an object containing the parsed HTTP response and the buffered data.
 *   Rejects if the stream ends or errors before a valid response is received.
 */
function createReadableProxyResponse(proxySocket) {
  return new Promise((resolve, reject) => {
    let totalBufferedLength = 0;
    const bufferedChunks = [];

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
      logProxyResponse("onend");
      reject(new Error("Proxy connection ended before receiving CONNECT response"));
    }

    /**
     * Handles errors from the proxy socket.
     * @param {Error} error
     */
    function onError(error) {
      cleanupListeners();
      logProxyResponse("onerror %processSubLanguageHighlighting", error);
      reject(error);
    }

    /**
     * Processes a chunk of data, accumulating until the end of HTTP headers is found.
     * @param {Buffer} chunk
     */
    function processChunk(chunk) {
      bufferedChunks.push(chunk);
      totalBufferedLength += chunk.length;
      const bufferedData = Buffer.concat(bufferedChunks, totalBufferedLength);
      // Look for the end of HTTP headers (double CRLF)
      const headerEndIndex = bufferedData.indexOf("\r\n\r\n");
      if (headerEndIndex === -1) {
        logProxyResponse("have not received end of HTTP headers yet...");
        onReadable();
        return;
      }

      // Parse the HTTP response headers
      const headerSection = bufferedData.slice(0, headerEndIndex).toString("ascii");
      const headerLines = headerSection.split("\r\n");
      const statusLine = headerLines.shift();
      if (!statusLine) {
        proxySocket.destroy();
        reject(new Error("No header received from proxy CONNECT response"));
        return;
      }
      const statusLineParts = statusLine.split(" ");
      const statusCode = Number(statusLineParts[1]);
      const statusText = statusLineParts.slice(2).join(" ");
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
        buffered: bufferedData
      });
    }

    proxySocket.on("error", onError);
    proxySocket.on("end", onEnd);
    onReadable();
  });
}

module.exports = createReadableProxyResponse;