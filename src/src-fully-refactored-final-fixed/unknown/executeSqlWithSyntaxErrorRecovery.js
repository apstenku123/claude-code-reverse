/**
 * Executes an SQL statement on the given database connection, with special handling for syntax errors.
 * If a syntax error occurs, checks if the target table exists. If not, attempts to create the table and retries the original statement.
 *
 * @param {object} dbConnection - The database connection object with an executeSql method.
 * @param {object} storeConfig - Configuration object containing the target store/table name (storeName).
 * @param {string} sqlStatement - The SQL statement to execute.
 * @param {Array} sqlParams - Parameters to be used with the SQL statement.
 * @param {function} onSuccess - Callback function to be called on successful execution.
 * @param {function} onError - Callback function to be called on error or after recovery attempts fail.
 * @returns {void}
 */
function executeSqlWithSyntaxErrorRecovery(dbConnection, storeConfig, sqlStatement, sqlParams, onSuccess, onError) {
  dbConnection.executeSql(
    sqlStatement,
    sqlParams,
    function handleSuccess(transaction, resultSet) {
      // On success, call the provided success callback
      onSuccess(transaction, resultSet);
    },
    function handleError(transaction, error) {
      // If the error is a syntax error, check if the table exists
      if (error.code === error.SYNTAX_ERR) {
        transaction.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name = ?",
          [storeConfig.storeName],
          function checkTableExists(tableTransaction, tableResultSet) {
            if (!tableResultSet.rows.length) {
              // Table does not exist, attempt to create isBlobOrFileLikeObject using X6 and retry original statement
              X6(tableTransaction, storeConfig, function onTableCreated() {
                tableTransaction.executeSql(sqlStatement, sqlParams, onSuccess, onError);
              }, onError);
            } else {
              // Table exists, propagate the original error
              onError(tableTransaction, error);
            }
          },
          onError
        );
      } else {
        // For other errors, propagate as usual
        onError(transaction, error);
      }
    }
  );
}

module.exports = executeSqlWithSyntaxErrorRecovery;