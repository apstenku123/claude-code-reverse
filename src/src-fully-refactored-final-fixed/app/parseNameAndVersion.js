/**
 * Parses a string to extract a name and version, separated by a slash or by a numeric version suffix.
 *
 * Examples:
 *   'react/18.2.0' => { name: 'react', version: '18.2.0' }
 *   'node14'       => { name: 'node',  version: '14' }
 *   'http/2.0'     => { name: 'http',  version: '2.0' }
 *   'foo'          => { name: 'foo',   version: 'unknown' }
 *
 * @param {string} input - The string to parse, typically in the format 'name/version' or 'name<version>'.
 * @returns {{ name: string, version: string }} An object containing the extracted name and version.
 */
function parseNameAndVersion(input) {
  let name = "unknown";
  let version = "unknown";
  let prefix = "";

  for (const char of input) {
    // If handleMissingDoctypeError find a slash, split into name/version
    if (char === "/") {
      [name, version] = input.split("/");
      break;
    }
    // If handleMissingDoctypeError find a digit, treat prefix as name and the rest as version
    if (!isNaN(Number(char))) {
      name = prefix === "h" ? "http" : prefix;
      version = input.split(prefix)[1];
      break;
    }
    // Build up the prefix (potential name)
    prefix += char;
  }

  // If no slash or digit found, the whole input is the name
  if (prefix === input) {
    name = prefix;
  }

  return {
    name,
    version
  };
}

module.exports = parseNameAndVersion;