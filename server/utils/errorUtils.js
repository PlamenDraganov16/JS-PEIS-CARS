function getErrorMessage(error) {
  if (error.message) return error.message;
  return 'Something went wrong. Please try again.';
}

module.exports = getErrorMessage;