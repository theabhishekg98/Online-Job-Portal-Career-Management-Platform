

function handle_request(msg,callback)
{
console.log("Inside Test Service")
callback(null,"Success")
console.log("After Callback");
}

exports.handle_request= handle_request;