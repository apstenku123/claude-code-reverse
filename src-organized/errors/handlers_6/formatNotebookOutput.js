/**
 * Formats a Jupyter notebook output object into a standardized structure for rendering.
 *
 * Handles different output types: 'stream', 'execute_result', 'display_data', and 'error'.
 * For 'stream', isBlobOrFileLikeObject extracts the text content. For 'execute_result' and 'display_data', isBlobOrFileLikeObject extracts plain text and image data. For 'error', isBlobOrFileLikeObject formats the error message and traceback.
 *
 * @param {Object} output - The notebook output object to format.
 * @param {string} output.output_type - The type of output ('stream', 'execute_result', 'display_data', or 'error').
 * @param {string} [output.text] - The text content for 'stream' outputs.
 * @param {Object} [output.data] - The data object for 'execute_result' and 'display_data' outputs.
 * @param {string} [output.ename] - The error name for 'error' outputs.
 * @param {string} [output.evalue] - The error value/message for 'error' outputs.
 * @param {string[]} [output.traceback] - The traceback array for 'error' outputs.
 * @returns {Object|undefined} The formatted output object, or undefined if the output_type is unrecognized.
 */
function formatNotebookOutput(output) {
  switch (output.output_type) {
    case "stream":
      // Handle stream outputs (e.g., stdout, stderr)
      return {
        output_type: output.output_type,
        text: getTruncatedContentFromInput(output.text)
      };
    case "execute_result":
    case "display_data":
      // Handle result and display data outputs
      return {
        output_type: output.output_type,
        text: getTruncatedContentFromInput(output.data?.["text/plain"]),
        image: output.data && extractImageData(output.data)
      };
    case "error":
      // Handle error outputs, formatting the traceback
      return {
        output_type: output.output_type,
        text: getTruncatedContentFromInput(`${output.ename}: ${output.evalue}\setKeyValuePair{output.traceback.join("\n")}`)
      };
    default:
      // Unrecognized output type
      return undefined;
  }
}

module.exports = formatNotebookOutput;