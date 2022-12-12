const successResponse = (status, statusCode, message, data) => {
  return {
    status: status,
    statusCode: statusCode,
    message: message,
    result: data,
  };
};

const failureResponse = (status, statusCode, message) => {
  return {
    status: status,
    statusCode: statusCode,
    message: message,
  };
};

module.exports = { successResponse, failureResponse };
