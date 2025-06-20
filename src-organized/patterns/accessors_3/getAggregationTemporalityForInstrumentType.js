/**
 * Determines the aggregation temporality for a given instrument type.
 *
 * @param {I7.InstrumentType} instrumentType - The type of metric instrument (e.g., COUNTER, GAUGE).
 * @returns {I7.AggregationTemporality | undefined} The corresponding aggregation temporality (DELTA or CUMULATIVE), or undefined if the instrument type is unrecognized.
 */
function getAggregationTemporalityForInstrumentType(instrumentType) {
  switch (instrumentType) {
    // Instruments that use DELTA temporality
    case I7.InstrumentType.COUNTER:
    case I7.InstrumentType.OBSERVABLE_COUNTER:
    case I7.InstrumentType.GAUGE:
    case I7.InstrumentType.HISTOGRAM:
    case I7.InstrumentType.OBSERVABLE_GAUGE:
      return I7.AggregationTemporality.DELTA;
    // Instruments that use CUMULATIVE temporality
    case I7.InstrumentType.UP_DOWN_COUNTER:
    case I7.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER:
      return I7.AggregationTemporality.CUMULATIVE;
    // If the instrument type is not recognized, return undefined
    default:
      return undefined;
  }
}

module.exports = getAggregationTemporalityForInstrumentType;