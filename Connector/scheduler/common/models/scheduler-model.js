
module.exports = function(schedulerModel) {

/**
 * getGetProductPlanning
 * @param {any} art the product tht we want the OF organisation
 * @param {any} datedem the date when the product should be delivery
 * @param {any} qteDem the quantity asked by the customer
 * @param {any} mo the manufacturing order associated of the product
 * @param {any} company the company that will dellivered the final product
 * @callback {Function} callback Callback function
 * @param {Error|string} err Error object
 * @param {any} result Result object
 */
schedulerModel.getGetProductPlanning = function(art, datedem, qteDem, mo, company, callback) {

  // Replace the code below with your implementation.
  // Please make sure the callback is invoked.
  process.nextTick(function() {
    var err = new Error('Not implemented');
    callback(err);
  });
  
}




schedulerModel.remoteMethod('getGetProductPlanning',
  { isStatic: true,
  produces: [ 'application/json' ],
  accepts:
   [ { arg: 'art',
       type: 'any',
       description: 'the product tht we want the OF organisation',
       required: true,
       http: { source: 'query' } },
     { arg: 'datedem',
       type: 'any',
       description: 'the date when the product should be delivery',
       required: true,
       http: { source: 'query' } },
     { arg: 'qteDem',
       type: 'any',
       description: 'the quantity asked by the customer',
       required: true,
       http: { source: 'query' } },
     { arg: 'mo',
       type: 'any',
       description: 'the manufacturing order associated of the product',
       required: true,
       http: { source: 'query' } },
     { arg: 'company',
       type: 'any',
       description: 'the company that will dellivered the final product',
       required: true,
       http: { source: 'query' } } ],
  returns: [],
  http: { verb: 'get', path: '/getProductPlanning' },
  description: undefined }
);

}
