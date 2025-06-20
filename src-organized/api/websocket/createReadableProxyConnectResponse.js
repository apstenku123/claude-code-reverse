/**
 * Reads and parses the HTTP CONNECT response from a readable stream (typically a proxy socket).
 * Resolves with the parsed status, headers, and buffered data once the full HTTP response is received.
 *
 * @param {stream.Readable} socket - The readable stream to read the proxy CONNECT response from.
 * @returns {Promise<{connect: {statusCode: number, statusText: string, headers: Object}, buffered: Buffer}>}
 *   Resolves with an object containing the parsed response and the buffered data.
 */
function createReadableProxyConnectResponse(socket) {
  return new Promise((resolve, reject) => {
    let totalLength = 0;
    const bufferChunks = [];

    /**
     * Reads data from the socket until the end of HTTP headers is detected.
     */
    function onReadable() {
      const chunk = socket.read();
      if (chunk) {
        processChunk(chunk);
      } else {
        // Wait for more data to become readable
        socket.once("readable", onReadable);
      }
    }

    /**
     * Removes all listeners related to this operation.
     */
    function cleanupListeners() {
      socket.removeListener("end", onEnd);
      socket.removeListener("error", onError);
      socket.removeListener("readable", onReadable);
    }

    /**
     * Handles the 'end' event: the stream ended before a full response was received.
     */
    function onEnd() {
      cleanupListeners();
      v91("onend");
      reject(new Error("Proxy connection ended before receiving CONNECT response"));
    }

    /**
     * Handles the 'error' event from the socket.
     * @param {Error} error
     */
    function onError(error) {
      cleanupListeners();
      v91("onerror %processSubLanguageHighlighting", error);
      reject(error);
    }

    /**
     * Processes a chunk of data, looking for the end of HTTP headers.
     * @param {Buffer} chunk
     */
    function processChunk(chunk) {
      bufferChunks.push(chunk);
      totalLength += chunk.length;
      const buffered = Buffer.concat(bufferChunks, totalLength);
      const headerEndIndex = buffered.indexOf("\r\n\r\n");
      if (headerEndIndex === -1) {
        // Haven'processRuleBeginHandlers received the end of HTTP headers yet
        v91("have not received end of HTTP headers yet...");
        onReadable();
        return;
      }

      // Parse HTTP response headers
      const headerSection = buffered.slice(0, headerEndIndex).toString("ascii");
      const headerLines = headerSection.split("\r\n");
      const statusLine = headerLines.shift();
      if (!statusLine) {
        socket.destroy();
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
          socket.destroy();
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
      v91("got proxy server response: %processSubLanguageHighlighting %processSubLanguageHighlighting", statusLine, headers);
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

    socket.on("error", onError);
    socket.on("end", onEnd);
    onReadable();
  });
}

module.exports = createReadableProxyConnectResponse;