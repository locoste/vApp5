app.controller('TrackProd', function($scope, $http, config) {
  const url = config.api_url;
  const port = config.api_port;
  
    $scope.logout = function(){
    $http.post('http://'+url+':'+port+'/logout').then(function(response){console.log(response)})
  }
