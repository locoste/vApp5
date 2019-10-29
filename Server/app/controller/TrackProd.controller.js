app.controller('TrackProd', function($scope, $http, config) {
	const url = config.api_url;
	const port = config.api_port;
	var mo=getMO();

// Get the modal
var modal = document.getElementById("addIssue");

// Get the button that opens the modal
var btn = document.getElementById("addIssueBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

	$http.get('http://'+url+':'+port+'/getProductionTracking/' + mo, {headers :	{'Content-Type' : 'application/json'}}).then(function(response) {
    $scope.dailyQty=response.data.dailyQuantity;
    console.log("getProductionTracking: ",response);

    $scope.mo_number=response.data.globalInformation[0][0].numofs;
	$scope.planned_start=response.data.globalInformation[0][0].datdebpre;
	$scope.real_start=response.data.globalInformation[0][0].datdebree;
	$scope.planned_end=response.data.globalInformation[0][0].datfinpre;
	$scope.real_end=response.data.globalInformation[0][0].datfinree;
	$scope.released_qty=response.data.globalInformation[0][0].qtefai;
	$scope.planned_qty=response.data.globalInformation[0][0].qtepre;

	});

	$http.get('http://'+url+':'+port+'/getProductSequence/' + mo, {headers : {'Content-Type' : 'application/json'}}).then(function(response) {
		console.log("getProductSequence: ",response);
	});

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