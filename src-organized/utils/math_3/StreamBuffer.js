/**
 * @class StreamBuffer
 * @classdesc
 *   Represents a buffer for streaming data with configurable maximum size and pause/resume capabilities.
 *   Initializes internal state for managing data buffering, flow control, and event tracking.
 *
 * @example
 *   const buffer = new StreamBuffer();
 */
function StreamBuffer() {
  /**
   * The source stream or data provider. Initially set to null until assigned.
   * @type {any|null}
   */
  this.sourceStream = null;

  /**
   * The current size of buffered data in bytes.
   * @type {number}
   */
  this.currentBufferedSize = 0;

  /**
   * The maximum allowed size for buffered data in bytes (default: 1MB).
   * @type {number}
   */
  this.maximumBufferedSize = 1048576;

  /**
   * Indicates whether the stream should be paused initially.
   * @type {boolean}
   */
  this.shouldPauseStream = true;

  /**
   * Flag indicating if the maximum buffer size has been exceeded.
   * @type {boolean}
   */
  this.hasExceededMaxBuffer = false;

  /**
   * Flag indicating if the buffer has been released (no longer in use).
   * @type {boolean}
   */
  this.isReleased = false;

  /**
   * Stores buffered events for later processing.
   * @type {Array<any>}
   */
  this.bufferedEvents = [];
}

module.exports = StreamBuffer;