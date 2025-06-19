/**
 * Parses a URL input string and initializes the parser state.
 * Handles normalization, decoding, and state management for URL parsing.
 *
 * @param {string} inputUrl - The URL string to parse.
 * @param {object|null} baseUrl - The base URL object to resolve against, or null.
 * @param {string} [encodingOverride="utf-8"] - Optional encoding override for parsing.
 * @param {string|null} urlState - The initial state for the parser, or null to use default.
 * @param {string} [stateOverride] - Optional state override for the parser.
 * @returns {void}
 */
function parseUrlInput(inputUrl, baseUrl, encodingOverride = "utf-8", urlState, stateOverride) {
  // Initialize parser state
  this.pointer = 0;
  this.input = inputUrl;
  this.base = baseUrl || null;
  this.encodingOverride = encodingOverride || "utf-8";
  this.stateOverride = stateOverride;
  this.url = urlState;
  this.failure = false;
  this.parseError = false;

  // If no URL state is provided, initialize a blank URL record
  if (!this.url) {
    this.url = {
      scheme: "",
      username: "",
      password: "",
      host: null,
      port: null,
      path: [],
      query: null,
      fragment: null,
      cannotBeABaseURL: false
    };
    // Normalize the input using yo6
    const normalizedInput = yo6(this.input);
    if (normalizedInput !== this.input) {
      this.parseError = true;
    }
    this.input = normalizedInput;
  }

  // Further normalize the input using xo6
  const furtherNormalizedInput = xo6(this.input);
  if (furtherNormalizedInput !== this.input) {
    this.parseError = true;
  }
  this.input = furtherNormalizedInput;

  // Set the initial parser state
  this.state = stateOverride || "scheme start";
  this.buffer = "";
  this.atFlag = false;
  this.arrFlag = false;
  this.passwordTokenSeenFlag = false;

  // Decode the input to UCS2 code points
  this.input = Zd.ucs2.decode(this.input);

  // Main parsing loop: iterate over each code point in the input
  while (this.pointer <= this.input.length) {
    const codePoint = this.input[this.pointer];
    // If codePoint is NaN, processCssDeclarations will be undefined
    const character = isNaN(codePoint) ? undefined : String.fromCodePoint(codePoint);
    // Dynamically call the parser state method for the current state
    const parseResult = this["parse " + this.state](codePoint, character);
    if (!parseResult) {
      // Parsing should stop
      break;
    } else if (parseResult === U6) {
      // U6 is a special constant indicating failure
      this.failure = true;
      break;
    }
    // Otherwise, continue parsing
    this.pointer++;
  }
}

module.exports = parseUrlInput;