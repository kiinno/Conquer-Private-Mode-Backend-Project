class Response {
  constructor(statusCode, data) {
    this.statusCode = statusCode;

    if (statusCode < 200) this.statusText = "informational";
    else if (statusCode < 300) this.statusText = "successful";
    else if (statusCode < 400) this.statusText = "redirection";
    else if (statusCode < 500) this.statusText = "client error";
    else this.statusText = "server error";

    this.data = data;
    this.responsedAt = new Date();
  }
}

module.exports = Response;
