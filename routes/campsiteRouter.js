const express = require('express');
const res = require('express/lib/response');
const campsiteRouter = express.Router();
// Creates new EXPRESS router

campsiteRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
}) // We are sending plain text as a response. The next() function is passing control of the routing to the next relevant routing method after this one. Otherwise it will stop here and not go any further.
.get((req, res) => {
    res.end('Will send all the campsites to you');
}) // This ends the response and sends the plain text string back to the client.
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
}) // If the client uses a POST method it will jump from app.all to app.post, skipping the app.get method since it is not a GET request. The EXPRESS.JSON takes the properties from the JSON data that it receives and sets it up as properties of the req.body javascript object. 
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
}) // We are rejecting the request if the client requests a PUT.
.delete((req, res) => {
    res.end('Deleting all campsites');
}); // We will be adding authentication priviliges to this later on.

campsiteRouter.route('/:campsiteId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
})
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete((req, res) => {
    res.end('Deleting all campsites');
});

// We have chained the methods together. All these methods share the same path /campsites. 

module.exports = campsiteRouter;
// exports Router so that it can be used elsewhere