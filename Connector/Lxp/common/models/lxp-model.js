
module.exports = function(lxpModel) {

/**
 * postSetConfigurationsData
 * @param {string} newUser new login
 * @param {string} newPassword new Password
 * @param {string} newSever new server
 * @param {string} newDatabase new Database
 * @callback {Function} callback Callback function
 * @param {Error|string} err Error object
 * @param {any} result Result object
 */
lxpModel.postSetConfigurationsData = function(newUser, newPassword, newSever, newDatabase, callback) {

  // Replace the code below with your implementation.
  // Please make sure the callback is invoked.
  process.nextTick(function() {
    var err = new Error('Not implemented');
    callback(err);
  });
  
}


/**
 * postSetDefaultConfig

 * @callback {Function} callback Callback function
 * @param {Error|string} err Error object
 * @param {any} result Result object
 */
lxpModel.postSetDefaultConfig = function(callback) {

  // Replace the code below with your implementation.
  // Please make sure the callback is invoked.
  process.nextTick(function() {
    var err = new Error('Not implemented');
    callback(err);
  });
  
}


/**
 * postExecuteQuerry
 * @param {string} query SQL Request
 * @callback {Function} callback Callback function
 * @param {Error|string} err Error object
 * @param {any} result Result object
 */
lxpModel.postExecuteQuerry = function(query, callback) {

  // Replace the code below with your implementation.
  // Please make sure the callback is invoked.
  process.nextTick(function() {
    var err = new Error('Not implemented');
    callback(err);
  });
  
}




lxpModel.remoteMethod('postSetConfigurationsData',
  { isStatic: true,
  consumes: [ 'multipart/form-data' ],
  produces: [ 'application/json' ],
  accepts:
   [ { arg: 'newUser',
       type: 'string',
       description: 'new login',
       required: false,
       http: { source: 'formData' } },
     { arg: 'newPassword',
       type: 'string',
       description: 'new Password',
       required: false,
       http: { source: 'formData' } },
     { arg: 'newSever',
       type: 'string',
       description: 'new server',
       required: false,
       http: { source: 'formData' } },
     { arg: 'newDatabase',
       type: 'string',
       description: 'new Database',
       required: false,
       http: { source: 'formData' } } ],
  returns: [],
  http: { verb: 'post', path: '/setConfigurationsData' },
  description: undefined }
);

lxpModel.remoteMethod('postSetDefaultConfig',
  { isStatic: true,
  produces: [ 'application/json' ],
  accepts: [],
  returns: [],
  http: { verb: 'post', path: '/setDefaultConfig' },
  description: undefined }
);

lxpModel.remoteMethod('postExecuteQuerry',
  { isStatic: true,
  consumes: [ 'multipart/form-data' ],
  produces: [ 'application/json' ],
  accepts:
   [ { arg: 'query',
       type: 'string',
       description: 'SQL Request',
       required: true,
       http: { source: 'formData' } } ],
  returns: [],
  http: { verb: 'post', path: '/executeQuerry' },
  description: undefined }
);

}
