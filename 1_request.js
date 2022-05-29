const request = require("request");

//feature -->request feaature is given by npm module not Js
console.log("Before");
request('http://www.google.com', cb);
function cb(error, response, html){         // its not necessary to mention all three parameters, anyone can be skipped
    console.error('error', error)   //Print the error if one occurred
    console.log('statusCode: ', response.statusCode);   //Print the response code if response was received
    // status code is 404 if page is not found, 200 if found
    // console.log('html', html);  // Print the HTML for th Google homepage
}
console.log("After");