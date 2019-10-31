app.controller('TrackProd', function($scope, $http, config) {
	const url = config.api_url;
	const port = config.api_port;
	var mo=getMO();

	var ctx = document.getElementById('trackingChart').getContext('2d');

	var dailyQtyD=[];
	var dailyQtyL=[];
	
	var modal = document.getElementById("addIssue");
	var btn = document.getElementById("addIssueBtn");
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
	var dailyQty = response.data.dailyQuantity
	var finalQty = response.data.finalQuantity
	var dailyTarget = response.data.dailyTargetQuantity

	if(dailyQty.length>0){
      for(i=0; i<dailyQty.length;i++){
          dailyQtyD.push(dailyQty[i].qtefai);
          /*dailyQtyL.push({x:formatDate(new Date(close[i].datdem)),y:sumtar});*/
      }
    }

    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var chart = new Chart(ctx, { 	
		data:    {
			datasets: [
			{	type:    'bar',
				label:"Daily Qty",
				backgroundColor: 'rgb(255, 255, 80)',
				borderColor: 'rgb(255, 255, 0)',
				data:dailyQtyD
			},
			{	type:    'line',
				label:"Final Qty",
				backgroundColor: 'rgb(255, 255, 80)',
				borderColor: 'rgb(255, 255, 0)',
				data:finalQty
			}
			]
		},
		options: {
			responsive: true,
			title:      {
				display: false,
				text:    "Chart.js Time Scale"
			},
			scales:     {
				xAxes: [{
					type:       "time",
					time:       {
						unit: 'month',
						min: '01/01/2014'
					},
					scaleLabel: {
						display:     true,
						labelString: 'Date'
					}
				}],
				yAxes: [{
					scaleLabel: {
						display:     true,
						labelString: 'value'
					}
				}]
			}
		}
	});
	$scope.issues=response.data.issue;
	console.log("getProductionTracking: ",response);

	$scope.mo_number=response.data.globalInformation[0][0].numofs;
	$scope.planned_start=response.data.globalInformation[0][0].datdebpre;
	$scope.real_start=response.data.globalInformation[0][0].datdebree;
	$scope.planned_end=response.data.globalInformation[0][0].datfinpre;
	$scope.real_end=response.data.globalInformation[0][0].datfinree;
	$scope.released_qty=response.data.globalInformation[0][0].qtefai;
	$scope.planned_qty=response.data.globalInformation[0][0].qtepre;

});




$http.get('http://'+url+':'+port+'/getOperations/' + mo, {headers :	{'Content-Type' : 'application/json'}}).then(function(response) {
	console.log("getOperations: ",response);
	$scope.operations=response.data;
});


	/*$http.get('http://'+url+':'+port+'/getProductSequence/' + mo, {headers : {'Content-Type' : 'application/json'}}).then(function(response) {
		console.log("getProductSequence: ",response);
	});*/


	/*$http.post('http://'+url+':'+port+'/newIssue/'+ mo).then(function(response){

	});*/

	$http.get('http://'+url+':'+port+'/getUserCompany').then(function(response){
		$scope.User = response.data[0].company;
	});
	
	$scope.selectOpe = function(ope){
		var selectedOpe=ope;
		$scope.selectedOpe=selectedOpe;
		$http.get('http://'+url+':'+port+'/getWatchList/'+mo+'/'+selectedOpe).then(function(response){
		console.log("getWatchList: ",response);
		$scope.watchList = response.data;
	});
	}

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