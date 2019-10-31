app.controller('DisplayAllMO',function($scope, $http, config, Faye) {
  const url = config.api_url;
  const port = config.api_port;

   $http({method : "GET", url : 'http://'+url+':'+port+'/getAllMO'}, {headers : {'Content-Type':'application/json'}}).then(function(response) {
        console.log("response: ",response);
        $scope.moInformation = response.data;
    });

    $http.get('http://'+url+':'+port+'/getUserCompany').then(function(response){
      $scope.User = response.data[0].company;
    })
    
    $scope.logout = function(){
    $http.post('http://'+url+':'+port+'/logout').then(function(response){
      console.log(response)})
  }
  

    function getProject()
    {
      var str = window.location.search;
      str = str.substr(1);
      return str;
    }
});