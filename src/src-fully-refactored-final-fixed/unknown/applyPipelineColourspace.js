/**
 * Applies the pipelineColourspace transformation to the provided observable.
 *
 * @param {any} sourceObservable - The observable or data stream to which the colourspace pipeline should be applied.
 * @returns {any} The result of applying the pipelineColourspace transformation to the source observable.
 */
function applyPipelineColourspace(sourceObservable) {
  // Delegate to the instance'createInteractionAccessor pipelineColourspace method
  return this.pipelineColourspace(sourceObservable);
}

module.exports = applyPipelineColourspace;