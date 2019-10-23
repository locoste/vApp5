app.controller('LoginController', function($scope, $http, config) {
  const url = config.api_url;
  const port = config.api_port;
  
    $scope.logout = function(){
    $http.post('http://'+url+':'+port+'/logout').then(function(response){console.log(response)})
  }

    $scope.loginUser = function()
    {     
        body = '{"email": "'+$scope.login+'", "password":"'+$scope.password+'"}'
        $http.post('http://'+url+':'+port+'/login', body).then(function(response){
          alert(response.status)
          $scope.login = "";
          $scope.password = "";
          window.location.assign('http://'+url+':'+port+'/Vapp4/Accueil.html')
        });
    }
  });