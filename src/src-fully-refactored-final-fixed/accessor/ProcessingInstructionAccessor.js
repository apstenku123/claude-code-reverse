/**
 * Represents a Processing Instruction node accessor, initializing its properties and inheritance.
 *
 * @class ProcessingInstructionAccessor
 * @extends QM2
 *
 * @param {Document} ownerDocument - The document that owns this processing instruction node.
 * @param {string} target - The target of the processing instruction.
 * @param {string} data - The data/content of the processing instruction.
 */
function ProcessingInstructionAccessor(ownerDocument, target, data) {
  // Call the parent constructor (QM2) to initialize base properties
  QM2.call(this);

  // Set the node type to PROCESSING_INSTRUCTION_NODE
  this.nodeType = LX5.PROCESSING_INSTRUCTION_NODE;

  // Reference to the document that owns this node
  this.ownerDocument = ownerDocument;

  // The target of the processing instruction (e.g., 'xml-stylesheet')
  this.target = target;

  // The data/content of the processing instruction
  this._data = data;
}

module.exports = ProcessingInstructionAccessor;