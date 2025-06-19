/**
 * @class StreamController
 * @classdesc Initializes and manages the state for a stream controller instance.
 *
 * This class sets up default properties for managing readable and writable states,
 * data size limits, stream pausing, and internal stream management.
 *
 * @constructor
 * @returns {StreamController} a new instance of StreamController with default properties set.
 */
function StreamController() {
  /**
   * Indicates whether the stream is writable.
   * @type {boolean}
   */
  this.isWritable = false;

  /**
   * Indicates whether the stream is readable.
   * @type {boolean}
   */
  this.isReadable = true;

  /**
   * Current size of the data in the stream (in bytes).
   * @type {number}
   */
  this.currentDataSize = 0;

  /**
   * Maximum allowed data size for the stream (in bytes).
   * @type {number}
   */
  this.maximumDataSize = 2097152; // 2 MB

  /**
   * Determines if streams should be paused automatically.
   * @type {boolean}
   */
  this.shouldPauseStreams = true;

  /**
   * Indicates if the stream controller has been released.
   * @type {boolean}
   */
  this.isReleased = false;

  /**
   * Array holding all managed stream instances.
   * @type {Array}
   */
  this.managedStreams = [];

  /**
   * Reference to the currently active stream.
   * @type {object|null}
   */
  this.activeStream = null;

  /**
   * Flag to indicate if the controller is currently inside its main processing loop.
   * @type {boolean}
   */
  this.isInsideProcessingLoop = false;

  /**
   * Flag to indicate if there is a pending request to process the next stream.
   * @type {boolean}
   */
  this.hasPendingNextStream = false;
}

module.exports = StreamController;