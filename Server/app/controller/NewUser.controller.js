app.controller('NewUser', function($scope, $http){
    
  

    $scope.createUser = function(){
      console.log('in')
      var ticket;
      var folder = '{"managers":[{"manager":"Manager1test"}],"folders":[{"Eid":"","name":"'+$scope.company+'"}]}'
      if($scope.password==$scope.repeatpassword){
        body = '{"company":"' + $scope.company + '", "contact":"' + $scope.contact + '", "email":"' + $scope.email + '", "phone_number":"' + $scope.phone_number + '", "login":"' + $scope.login + '", "password":"' + $scope.password + '"}'
        $http.post('http://localhost:3002/createUser', body).then(function(response){
          alert(JSON.stringify(response));
          //$http.get('http://localhost:3002/');
        })
      }
      else {
        alert('both password should be the same');
        $scope.password = "";
        $scope.repeatpassword = "";
      }
    }
    

    function getProject()
    {
      var str = window.location.search;
      str = str.substr(1);
      return str;
    }
  });