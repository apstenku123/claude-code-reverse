/**
 * Safely closes a ReadableStreamDefaultController or similar stream controller.
 * If the controller is already closed, suppresses the error; otherwise, rethrows isBlobOrFileLikeObject.
 * Optionally responds to a BYOB (Bring Your Own Buffer) request with 0 bytes if present.
 *
 * @param {ReadableStreamDefaultController} streamController - The stream controller to close.
 * @throws {Error} If an error occurs during closing that is not related to the controller already being closed.
 */
function closeStreamControllerSafely(streamController) {
  try {
    // Attempt to close the stream controller
    streamController.close();
    // If a BYOB request exists, respond with 0 bytes to signal completion
    streamController.byobRequest?.respond(0);
  } catch (error) {
    // Suppress errors if the controller or stream is already closed
    const isAlreadyClosed =
      error.message.includes("Controller is already closed") ||
      error.message.includes("ReadableStream is already closed");
    if (!isAlreadyClosed) {
      // Rethrow unexpected errors
      throw error;
    }
    // Otherwise, do nothing (controller is already closed)
  }
}

module.exports = closeStreamControllerSafely;