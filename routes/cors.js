const cors = require('cors');

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log(req.header('Origin'));
    // Checks to see the index of what is in the request header 
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
        // Checks to see if the origin can be found in the white list.
    } else {
        corsOptions = { origin: false };
        // If the origin was not found in the white list.
    }
    callback(null, corsOptions);
};

exports.cors = cors();
// It will allow cors for all origins
exports.corsWithOptions = cors(corsOptionsDelegate);
// Checks to see if the incoming requests belong to one of the origins. localhost 3000 or 3443