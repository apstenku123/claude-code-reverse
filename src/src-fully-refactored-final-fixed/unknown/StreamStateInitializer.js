/**
 * Initializes the default state properties for a stream manager instance.
 * This function is intended to be used as a constructor for objects that manage multiple data streams,
 * setting up initial flags and storage for stream handling.
 *
 * @constructor
 * @example
 * const streamManager = new StreamStateInitializer();
 */
function StreamStateInitializer() {
  /**
   * Indicates whether the stream is writable. Set to false by default.
   * @type {boolean}
   */
  this.isWritable = false;

  /**
   * Indicates whether the stream is readable. Set to true by default.
   * @type {boolean}
   */
  this.isReadable = true;

  /**
   * Tracks the current total size of data in the stream (in bytes).
   * @type {number}
   */
  this.currentDataSize = 0;

  /**
   * The maximum allowed data size for the stream (in bytes). Default is 2MB.
   * @type {number}
   */
  this.maximumDataSize = 2097152;

  /**
   * Determines if streams should be paused automatically. Enabled by default.
   * @type {boolean}
   */
  this.shouldPauseStreams = true;

  /**
   * Internal flag indicating if the stream manager has been released.
   * @type {boolean}
   */
  this.isReleased = false;

  /**
   * Array holding all managed stream objects.
   * @type {Array}
   */
  this.managedStreams = [];

  /**
   * Reference to the currently active stream, if any.
   * @type {?Object}
   */
  this.activeStream = null;

  /**
   * Internal flag to prevent re-entrancy during stream processing loops.
   * @type {boolean}
   */
  this.isProcessingLoopActive = false;

  /**
   * Internal flag indicating if a 'next' operation is pending.
   * @type {boolean}
   */
  this.isNextOperationPending = false;
}

module.exports = StreamStateInitializer;
