var should = require('should'), 
    fs = require('fs'),
    request = require('request');

/* Globals */
var listings;
fs.readFile('listings.json', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  listings = data;
})
/*
  Describe blocks organize your unit tests into distinct categories of functionality.
  
  They can be nested.
 */
describe('UF Directory Server Unit Tests', function() {

  /*
    This before hook loads the JSON data to the listings variable, so that we can compare 
    the response to 'http://localhost:8080/listings' to the data we expect to recieve. 
   */
  before(function(done) {
    fs.readFile('listings.json', 'utf8', function(err, data) {
      listings = JSON.parse(data);

      /*
        Calling done() will pass code execution to the next appropriate block of code. 
        In this case, execution will pass to the first it() statement.  
       */
      done();
    });
  });

  describe('Server responds to requests', function() {
    it('should respond', function(done) {
      /*
        The request module allows us to make HTTP requests. This module could also be useful in 
        making API calls to web services you make use of in your application, such as Google Maps. 
       */
      request.get('http://localhost:8080', function(error, response, body) {       

         should.exist(response);

         response.should.not.equal(undefined);

         done();
      });
    });
  });


	// In these tests, we will be checking more specific content using object and primitive comparisons that have specific values.
  describe('Server provides listing data as JSON on proper request', function() {
    it('responds correctly to a GET request to "/listings"', function(done) {
      request.get('http://localhost:8080/listings', function(error, response, body) {

          should.exist(body);
	
          bodyData = JSON.parse(body);
    
          should.deepEqual(listings,bodyData);
          
        	done();
      });
    });
    
	// For the last test, let's use make primitive value comparisons
    it('responds with a 404 error to other GET requests', function(done) {
       request.get('http://localhost:8080/pizza', function(error, response, body) {
      
        response.statusCode.should.equal(414);

        body.should.equal('404, Page Not Found')

        done();
      });
    });
  });

});
