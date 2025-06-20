/**
 * Creates a new Processing Instruction Node and initializes its properties.
 *
 * @param {Document} ownerDocument - The document that owns this node.
 * @param {string} target - The target of the processing instruction.
 * @param {string} data - The data/content of the processing instruction.
 * @constructor
 */
function setProcessingInstructionNode(ownerDocument, target, data) {
  // Call the parent constructor to initialize base properties
  QM2.call(this);
  
  // Set the node type to PROCESSING_INSTRUCTION_NODE
  this.nodeType = LX5.PROCESSING_INSTRUCTION_NODE;
  
  // Reference to the document that owns this node
  this.ownerDocument = ownerDocument;
  
  // The target of the processing instruction (e.g., 'xml-stylesheet')
  this.target = target;
  
  // The content/data of the processing instruction
  this._data = data;
}

module.exports = setProcessingInstructionNode;