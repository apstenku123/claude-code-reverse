/**
 * Instantiates a WebAssembly HTTP parser module with custom environment callbacks.
 *
 * This function attempts to compile and instantiate a WebAssembly module for HTTP parsing.
 * It provides a set of callback functions to the WASM environment for handling various HTTP parsing events.
 * If running in a Jest worker environment, isBlobOrFileLikeObject uses a different WASM source for compatibility.
 *
 * @async
 * @returns {Promise<WebAssembly.Instance>} The instantiated WebAssembly HTTP parser module.
 */
async function instantiateHttpParserWasm() {
  // Determine the WASM source to use based on the environment
  const isJestWorker = Boolean(process.env.JEST_WORKER_ID);
  // If in Jest, use the test WASM source; otherwise, use the default
  const wasmSource = isJestWorker ? Kd1() : undefined;

  let wasmModule;
  try {
    // Attempt to compile the primary WASM source
    wasmModule = await WebAssembly.compile(Lg0());
  } catch (compileError) {
    // Fallback: compile the alternative WASM source if the first fails
    wasmModule = await WebAssembly.compile(wasmSource || Kd1());
  }

  // Instantiate the compiled WASM module with custom environment callbacks
  return await WebAssembly.instantiate(wasmModule, {
    env: {
      /**
       * Dummy callback for URL events; always returns 0 (success/no-op).
       */
      wasm_on_url: (parserPtr, bufferPtr, length) => {
        return 0;
      },
      /**
       * Callback for HTTP status events.
       * Validates the parser pointer, then delegates to f7.onStatus.
       */
      wasm_on_status: (parserPtr, bufferPtr, length) => {
        l9(f7.ptr === parserPtr);
        // Calculate the correct buffer offset for the status string
        const offset = bufferPtr - Cw + Xw.byteOffset;
        return f7.onStatus(new oD1(Xw.buffer, offset, length)) || 0;
      },
      /**
       * Callback for the beginning of an HTTP message.
       */
      wasm_on_message_begin: (parserPtr) => {
        l9(f7.ptr === parserPtr);
        return f7.onMessageBegin() || 0;
      },
      /**
       * Callback for HTTP header field events.
       */
      wasm_on_header_field: (parserPtr, bufferPtr, length) => {
        l9(f7.ptr === parserPtr);
        const offset = bufferPtr - Cw + Xw.byteOffset;
        return f7.onHeaderField(new oD1(Xw.buffer, offset, length)) || 0;
      },
      /**
       * Callback for HTTP header value events.
       */
      wasm_on_header_value: (parserPtr, bufferPtr, length) => {
        l9(f7.ptr === parserPtr);
        const offset = bufferPtr - Cw + Xw.byteOffset;
        return f7.onHeaderValue(new oD1(Xw.buffer, offset, length)) || 0;
      },
      /**
       * Callback for when all headers have been parsed.
       */
      wasm_on_headers_complete: (parserPtr, statusCode, upgrade, keepAlive) => {
        l9(f7.ptr === parserPtr);
        return f7.onHeadersComplete(statusCode, Boolean(upgrade), Boolean(keepAlive)) || 0;
      },
      /**
       * Callback for HTTP body data events.
       */
      wasm_on_body: (parserPtr, bufferPtr, length) => {
        l9(f7.ptr === parserPtr);
        const offset = bufferPtr - Cw + Xw.byteOffset;
        return f7.onBody(new oD1(Xw.buffer, offset, length)) || 0;
      },
      /**
       * Callback for the completion of an HTTP message.
       */
      wasm_on_message_complete: (parserPtr) => {
        l9(f7.ptr === parserPtr);
        return f7.onMessageComplete() || 0;
      }
    }
  });
}

module.exports = instantiateHttpParserWasm;