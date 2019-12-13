
if (process.env.NODE_ENV === 'production') {
    // Return the production set of the keys
    module.exports = require('./prod');
} else {
    // Return the development set of the keys 
    module.exports = require('./dev');
}