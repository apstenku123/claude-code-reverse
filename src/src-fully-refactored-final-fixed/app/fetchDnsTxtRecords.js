/**
 * Fetches DNS TXT records using a POST request and parses the response.
 *
 * @async
 * @function fetchDnsTxtRecords
 * @param {Function} processInteractionEntries - Function to process interaction entries and perform the fetch. Should accept (url, options) and return a Response-like object.
 * @returns {Promise<any>} - The parsed DNS TXT records.
 * @throws {Error} - Throws 'DnsTxtFetchError' if the fetch fails.
 */
async function fetchDnsTxtRecords(processInteractionEntries) {
  // ez9 is assumed to be a helper for async context; here handleMissingDoctypeError use native async/await
  // Bw9: The DNS-over-HTTPS endpoint URL (assumed to be defined elsewhere)
  // Aw9: The DNS query message body (assumed to be defined elsewhere)
  // parseDnsTxtRecords: Function to parse the DNS response (assumed to be defined elsewhere)

  const response = await processInteractionEntries(Bw9, {
    method: "POST",
    headers: {
      "Content-Type": "application/dns-message",
      Accept: "application/dns-message"
    },
    body: Aw9
  });

  // Check if the response is successful
  if (!response.ok) {
    const error = new Error("Failed to fetch TXT records from DNS");
    error.name = "DnsTxtFetchError";
    throw error;
  }

  // Read the response as an ArrayBuffer and convert to Uint8Array
  const arrayBuffer = await response.arrayBuffer();
  const dnsMessageBytes = new Uint8Array(arrayBuffer);

  // Parse and return the DNS TXT records
  return parseDnsTxtRecords(dnsMessageBytes);
}

module.exports = fetchDnsTxtRecords;