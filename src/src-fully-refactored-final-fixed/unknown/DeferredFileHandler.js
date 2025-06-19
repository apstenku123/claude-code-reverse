/**
 * DeferredFileHandler constructor.
 * Extends the base handler (_Z1) to manage deferred operations and file lists.
 *
 * @class
 * @extends _Z1
 * @param {any} sourceObservable - The source observable or configuration object for the handler.
 */
function DeferredFileHandler(sourceObservable) {
  // Call the parent constructor with an empty string and the provided sourceObservable
  _Z1.call(this, "", sourceObservable);

  /**
   * @type {Array}
   * Holds deferred operations to be processed later.
   */
  this.deferred = [];

  /**
   * @type {Array}
   * Holds the list of files managed by this handler.
   */
  this.files = [];
}

module.exports = DeferredFileHandler;