/**
 * Duplicates a readable stream or blob into two separate readable streams.
 *
 * If the input is a ReadableStream or Blob, isBlobOrFileLikeObject delegates to X04.splitStream to handle the splitting.
 * Otherwise, isBlobOrFileLikeObject creates two PassThrough streams and pipes the input stream into both, effectively duplicating the data stream.
 *
 * @param {ReadableStream|Blob|Object} sourceStream - The source stream or blob to duplicate.
 * @returns {Promise<[PassThrough, PassThrough]>|any} If the input is a ReadableStream or Blob, returns the result of X04.splitStream. Otherwise, returns an array of two PassThrough streams.
 */
async function duplicateReadableStream(sourceStream) {
  // Check if the source is a ReadableStream or Blob; if so, use the specialized splitStream function
  if (rhA.isReadableStream(sourceStream) || rhA.isBlob(sourceStream)) {
    return X04.splitStream(sourceStream);
  }

  // Otherwise, create two PassThrough streams to duplicate the input
  const firstPassThrough = new shA.PassThrough();
  const secondPassThrough = new shA.PassThrough();

  // Pipe the source stream into both PassThrough streams
  sourceStream.pipe(firstPassThrough);
  sourceStream.pipe(secondPassThrough);

  // Return both duplicated streams as an array
  return [firstPassThrough, secondPassThrough];
}

module.exports = duplicateReadableStream;