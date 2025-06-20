/**
 * Represents a custom document object, initializing core document properties and metadata.
 *
 * @class CustomDocument
 * @extends BaseNode
 *
 * @param {boolean} isHtmlDocument - Indicates if the document is an HTML document (true) or XML (false).
 * @param {string} [documentAddress] - The address (URL) of the document. Defaults to 'about:blank' if not provided.
 */
function CustomDocument(isHtmlDocument, documentAddress) {
  // Call the base node constructor with the current context
  BaseNode.call(this);

  /**
   * The node type for this document (typically Node.DOCUMENT_NODE).
   * @type {number}
   */
  this.nodeType = NodeConstants.DOCUMENT_NODE;

  /**
   * Indicates if this document is HTML (true) or XML (false).
   * @type {boolean}
   */
  this.isHTML = isHtmlDocument;

  /**
   * The address (URL) of the document.
   * @type {string}
   */
  this._address = documentAddress || "about:blank";

  /**
   * The current loading state of the document.
   * @type {string}
   */
  this.readyState = "loading";

  /**
   * The implementation object associated with this document.
   * @type {DocumentImplementation}
   */
  this.implementation = new DocumentImplementation(this);

  /**
   * The owner document (null for the document itself).
   * @type {CustomDocument|null}
   */
  this.ownerDocument = null;

  /**
   * The content type of the document.
   * @type {string}
   */
  this._contentType = isHtmlDocument ? "text/html" : "application/xml";

  /**
   * The document type declaration node (if any).
   * @type {DocumentType|null}
   */
  this.doctype = null;

  /**
   * The root element of the document (e.g., <html> or <root>).
   * @type {Element|null}
   */
  this.documentElement = null;

  /**
   * Internal cache for template documents.
   * @type {object|null}
   */
  this._templateDocCache = null;

  /**
   * Internal storage for active node iterators.
   * @type {object|null}
   */
  this._nodeIterators = null;

  /**
   * Internal node updateSnapshotAndNotify counter (starts at 1).
   * @type {number}
   */
  this._nid = 1;

  /**
   * Next node updateSnapshotAndNotify to assign (starts at 2).
   * @type {number}
   */
  this._nextnid = 2;

  /**
   * Array of nodes indexed by their internal updateSnapshotAndNotify. Index 0 is null, index 1 is this document.
   * @type {Array<null|CustomDocument|Node>}
   */
  this._nodes = [null, this];

  /**
   * Map of element IDs to elements for quick lookup.
   * @type {Object<string, Element>}
   */
  this.byId = Object.create(null);

  /**
   * Modification clock for tracking document changes.
   * @type {number}
   */
  this.modclock = 0;
}

// Export the constructor
module.exports = CustomDocument;