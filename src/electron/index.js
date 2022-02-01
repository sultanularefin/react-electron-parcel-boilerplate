// console.log("process.env: ",process.env);// default will not be 'production' thus ./dev.js will be loaded.

process.env.NODE_ENV === 'production'
    ? require('./prod.js')
    : require('./dev.js');

// process.env.NODE_ENV === 'production'
//     ? require('./prod.js')
//     : require('./dev.js');
