/**
 * Checks if the 'CC' environment variable is set and ends with '/emcc'.
 *
 * This function inspects the process environment to determine whether the
 * C compiler (CC) is set to a path that ends with '/emcc', which typically
 * indicates the use of the Emscripten compiler.
 *
 * @returns {boolean} Returns true if 'CC' is set and ends with '/emcc', otherwise false.
 */
const isEmccCompilerSet = () => {
  // Destructure the 'CC' environment variable from process.env
  const { CC: compilerPath } = process.env;

  // Check if 'compilerPath' exists and ends with '/emcc'
  return Boolean(compilerPath && compilerPath.endsWith('/emcc'));
};

module.exports = isEmccCompilerSet;
