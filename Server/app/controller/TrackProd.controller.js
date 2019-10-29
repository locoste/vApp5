app.controller('TrackProd', function($scope, $http, config) {
	const url = config.api_url;
	const port = config.api_port;
	var mo=getMO();

	$http.get('http://'+url+':'+port+'/getProductionTracking/' + mo, {headers :	{'Content-Type' : 'application/json'}}).then(function(response) {
    $scope.dailyQty=response.data.dailyQuantity;
    console.log("response: ",response);

    $scope.mo_number=response.data.globalInformation[0][0].numofs;
	$scope.planned_start=response.data.globalInformation[0][0].datdebpre;
	$scope.real_start=response.data.globalInformation[0][0].datdebree;
	$scope.planned_end=response.data.globalInformation[0][0].datfinpre;
	$scope.real_end=response.data.globalInformation[0][0].datfinree;
	$scope.released_qty=response.data.globalInformation[0][0].qtefai;
	$scope.planned_qty=response.data.globalInformation[0][0].qtepre;

	});

	/*$http.get('http://'+url+':'+port+'/getProductSequence/' + mo, {headers : {'Content-Type' : 'application/json'}}).then(function(response) {
		console.log("response: ",response);
	});*/

	$http.get('http://'+url+':'+port+'/getIssues/'+ mo).then(function(response){
		$scope.issues=response.data
		console.log("getIssues: ",response);
	});

	/*$http.post('http://'+url+':'+port+'/newIssue/'+ mo).then(function(response){

	});*/

	$http.get('http://'+url+':'+port+'/getUserCompany').then(function(response){
		$scope.User = response.data[0].company;
	});
	

	$scope.logout = function(){
		$http.post('http://'+url+':'+port+'/logout').then(function(response){console.log(response)})
	}

	function getMO()
	{
		var str = window.location.search;
		str = str.substr(1);
		return str;
	}
});