app.controller('DisplayProject', function($scope, $http, config) {
  const url = config.api_url;
  const port = config.api_port;
  var project = getProject();
  document.getElementById("productionSequence").href = "ProductionSequence.html?"+project
  $http.get('http://'+url+':'+port+'/getProject/' + project, 
  {
    headers : 
    {'Content-Type' : 'application/json'}

  }).then(function(response) {
    $scope.project_reference = response.data[0].project_name;
    $scope.description = response.data[0].project_description;
    $scope.company = response.data[0].company;
    $scope.contact = response.data[0].contact;
    $scope.email = response.data[0].email;
    $scope.phone_number = response.data[0].phone_number;
    $scope.status = response.data[0].status;
    $scope.internal_reference = response.data[0].internal_reference;
    $scope.delivery = response.data[0].expected_delivery;
  });

  $http.get('http://'+url+':'+port+'/getQuantities/' + project).then(function(response){
    $scope.displayQuantity = response.data;
  })

  $http.get('http://'+url+':'+port+'/getUserCompany').then(function(response){
    $scope.User = response.data[0].company;
  })

  $scope.deleteFile = function(fileName, type){
    if (type==1){
      $http.delete('http://'+url+':'+port+'/deleteFile/'+fileName+'/'+project).then(function(reponse){
        refreshDocuments();
      })
    } else {
      $http.delete('http://'+url+':'+port+'/deleteFile/'+fileName+'/'+project).then(function(reponse){
        refreshDocuments();
      })
    }
  }

  $scope.displayFileName = function(){
    var files = $scope.files;
    var scan = $scope.scans;
    console.log(document.getElementById('files').files)
    for (i=0; i<document.getElementById('files').files.length; i++){
      var str = document.getElementById('files').files[i].name
      var n = str.indexOf(".");
      if (str.substr(n+1) == "stp" || str.substr(n+1)=="step" || str.substr(n+1)=="stl"){
        scan.push(document.getElementById('files').files[i].name)
        upload3DScan(document.getElementById('files').files[i], project);
      } else {
        files.push(document.getElementById('files').files[i].name)
        uploadDCME(document.getElementById('files').files[i]);
      }
    }
    $scope.scans = scan;
    $scope.files = files;
  }

  function refreshDocuments(){
    $http.get('http://'+url+':'+port+'/getProjectFiles/'+project).then(function(response){
      console.log(response.data);
      var files = new Array;
      var scan = new Array;
      for (i=0; i<response.data.length; i++){
        var str = response.data[i].document_name;
        var n = str.indexOf(".");
        if (str.substr(n+1) == "stp" || str.substr(n+1)=="step" || str.substr(n+1)=="stl"){
          scan.push(response.data[i])
        } else {
          files.push(response.data[i])
        }
      }
      $scope.scans = scan;
      $scope.files = files;
    })
  }

  $scope.showQuantity = function(){
    window.open('http://'+url+':'+port+'/Vapp5/Quantity.html?'+$scope.project_reference);
  }

  $scope.logout = function(){
    $http.post('http://'+url+':'+port+'/logout').then(function(response){console.log(response)})
  }

  $scope.saveChangement = function()
  {
    data = '{"project": {    "project_name": "' + $scope.project_reference + '","internal_reference": "' + $scope.internal_reference + '",    "project_description": "'+ $scope.description +'",    "customer": "'+ $scope.company +'"  }}';
    $http.put('http://'+url+':'+port+'/updateProject/' + project, data, {
      headers : 
      {'Content-Type' : 'application/json'}
    }).then(function(response){
      console.log("project Saved!!!!")
    })
  }

  function getProject()
  {
    var str = window.location.search;
    str = str.substr(1);
    return str;
  }
});