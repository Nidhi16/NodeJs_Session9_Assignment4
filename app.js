// Load http module
var http = require('http');
// Load fs module
var fs = require('fs');

// Configuring server to respond to all the request
var server = http.createServer(function(request, response) {

    response.writeHead('200', {'Content-Type': 'text/plain'});
    // reading student.json file first time

    fs.readFile('student.json', 'utf-8', function(error, data){
        // parsing data to object
        obj = JSON.parse(data);
        // changing object form of data to string to display on the browser
        response.write(JSON.stringify(obj));
        console.log(obj);

        // Changing name of the student, condition is applied for multiple requests
        if (obj.name == "John") {
            obj.name="John Carter";
        } else {
            obj.name="John";
        }
         
        // changed name property and write it back to student.json file
        fs.writeFile('student.json', JSON.stringify(obj), function(error) {
            // reading student.json file second time
            fs.readFile('student.json', 'utf-8', function(error, data){
                console.log(data);
                response.write("\n\n");
                response.write(data);
                response.end();
            });
        });
    });
});

// Listening to the port
server.listen(8000);
