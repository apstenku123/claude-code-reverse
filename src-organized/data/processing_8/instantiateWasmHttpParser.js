/**
 * Instantiates a WebAssembly HTTP parser module with custom environment callbacks.
 *
 * This function compiles and instantiates a WebAssembly module for HTTP parsing, providing
 * JavaScript callback functions for various HTTP parser events (status, headers, body, etc.).
 * It handles test environments by using a different WASM source if running under Jest.
 *
 * @async
 * @returns {Promise<WebAssembly.Instance>} The instantiated WebAssembly HTTP parser instance.
 */
async function instantiateWasmHttpParser() {
  // Determine the WASM source to use based on the environment (Jest or not)
  const isJestEnvironment = Boolean(process.env.JEST_WORKER_ID);
  const wasmSource = isJestEnvironment ? Kd1() : undefined;
  let compiledWasmModule;

  try {
    // Try compiling the main WASM module
    compiledWasmModule = await WebAssembly.compile(Lg0());
  } catch (compileError) {
    // Fallback: compile the alternative WASM source (for test environments)
    compiledWasmModule = await WebAssembly.compile(wasmSource || Kd1());
  }

  // Instantiate the WASM module with custom environment callbacks
  return await WebAssembly.instantiate(compiledWasmModule, {
    env: {
      /**
       * Dummy callback for URL events (returns 0, does nothing)
       */
      wasm_on_url: (parserPtr, bufferPtr, length) => {
        return 0;
      },
      /**
       * Callback for status line events
       * Validates parser pointer, constructs a buffer view, and delegates to f7.onStatus
       */
      wasm_on_status: (parserPtr, bufferPtr, length) => {
        l9(f7.ptr === parserPtr); // Ensure correct parser instance
        const offset = bufferPtr - Cw + Xw.byteOffset;
        const statusBuffer = new oD1(Xw.buffer, offset, length);
        return f7.onStatus(statusBuffer) || 0;
      },
      /**
       * Callback for message begin event
       * Validates parser pointer and delegates to f7.onMessageBegin
       */
      wasm_on_message_begin: (parserPtr) => {
        l9(f7.ptr === parserPtr);
        return f7.onMessageBegin() || 0;
      },
      /**
       * Callback for header field events
       * Validates parser pointer, constructs a buffer view, and delegates to f7.onHeaderField
       */
      wasm_on_header_field: (parserPtr, bufferPtr, length) => {
        l9(f7.ptr === parserPtr);
        const offset = bufferPtr - Cw + Xw.byteOffset;
        const headerFieldBuffer = new oD1(Xw.buffer, offset, length);
        return f7.onHeaderField(headerFieldBuffer) || 0;
      },
      /**
       * Callback for header value events
       * Validates parser pointer, constructs a buffer view, and delegates to f7.onHeaderValue
       */
      wasm_on_header_value: (parserPtr, bufferPtr, length) => {
        l9(f7.ptr === parserPtr);
        const offset = bufferPtr - Cw + Xw.byteOffset;
        const headerValueBuffer = new oD1(Xw.buffer, offset, length);
        return f7.onHeaderValue(headerValueBuffer) || 0;
      },
      /**
       * Callback for headers complete event
       * Validates parser pointer and delegates to f7.onHeadersComplete
       */
      wasm_on_headers_complete: (parserPtr, statusCode, upgrade, keepAlive) => {
        l9(f7.ptr === parserPtr);
        return f7.onHeadersComplete(statusCode, Boolean(upgrade), Boolean(keepAlive)) || 0;
      },
      /**
       * Callback for body events
       * Validates parser pointer, constructs a buffer view, and delegates to f7.onBody
       */
      wasm_on_body: (parserPtr, bufferPtr, length) => {
        l9(f7.ptr === parserPtr);
        const offset = bufferPtr - Cw + Xw.byteOffset;
        const bodyBuffer = new oD1(Xw.buffer, offset, length);
        return f7.onBody(bodyBuffer) || 0;
      },
      /**
       * Callback for message complete event
       * Validates parser pointer and delegates to f7.onMessageComplete
       */
      wasm_on_message_complete: (parserPtr) => {
        l9(f7.ptr === parserPtr);
        return f7.onMessageComplete() || 0;
      }
    }
  });
}

module.exports = instantiateWasmHttpParser;