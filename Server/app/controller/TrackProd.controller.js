app.controller('TrackProd', function($scope, $http, config, Faye) {
	const url = config.api_url;
	const port = config.api_port;
	var mo=getMO();

	Faye.subscribe("/control", function(msg) {
		console.log(msg)
		console.log($scope.qualityControls)
    	$scope.qualityControls.push(msg);
    	updateListChart();
  	});

	var ctx = document.getElementById('trackingChart').getContext('2d');
	var chart = new Chart(ctx, {
	  // The type of chart we want to create
	  type: 'bar',

	  // The data for our dataset
	  data: {
	  	datasets: []
	  },

	  // Configuration options go here
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
	                    unit: 'day'//,
	                    //min: '01/01/2019'
	                },
	                scaleLabel: {
	                	display:     true,
	                	labelString: 'Date'
	                }
	            }],
	            yAxes: [{
	            	ticks: {
	            		min: 0
	            	},
	            	scaleLabel: {
	            		display:     true,
	            		labelString: 'quantity per day'
	            	}
	            }]
	        }
	    }
	});

	var ctx2 = document.getElementById('pareto').getContext('2d');
	var chartPareto = new Chart(ctx2, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
      	labels: [],
      	datasets: [{
			label: 'Percentage per issue',
			backgroundColor: 'MediumBlue',
			borderColor: 'Navy',
			data: []
		},
		{
			label: 'Pareto line',
			backgroundColor: 'White',
			borderColor: 'Red',
			data: [],
			type: 'line'
		}]
      },

      // Configuration options go here
      options: {}
  });

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
		console.log("getProductionTracking: ",response.data);

		$scope.mo_number=response.data.globalInformation[0][0].numofs;
		$scope.product=response.data.globalInformation[0][0].libar1;
		$scope.planned_start=response.data.globalInformation[0][0].datdebpre;
		$scope.real_start=response.data.globalInformation[0][0].datdebree;
		$scope.planned_end=response.data.globalInformation[0][0].datfinpre;
		$scope.real_end=response.data.globalInformation[0][0].datfinree;
		//$scope.released_qty=response.data.globalInformation[0][0].qtefai;
		$scope.planned_qty=response.data.finalQuantity[0][0].qtepre;

		var tab=[];
		var tabFinalQuantity =[];
		var sum = 0;
		for(i=0;i<response.data.dailyTargetQuantity[0].length;i++){
			sum+=response.data.dailyTargetQuantity[0][i].qtepre
			tab.push({x:new Date(response.data.dailyTargetQuantity[0][i].datfinpre),y:sum});
			tabFinalQuantity.push({x:new Date(response.data.dailyTargetQuantity[0][i].datfinpre),y:response.data.finalQuantity[0][0].qtepre})
		}

		
		var dailyTargetQuantityDS = {
			label: 'Target Daily Quantity',
			borderColor: 'Green',
			fill: false,
			data: tab,
			type:'line'
		}

		var finalTargetQuantityDS = {
			label: 'Target Final Quantity',
			borderColor: 'Orange',
			fill: false,
			data: tabFinalQuantity,
			type:'line'
		}

		var tabDailyQuantity = [];
		var tabSumQuantity = [];
		sum=0;
		for(i=0;i<response.data.dailyQuantity[0].length;i++){
			console.log(response.data.dailyQuantity[0][i])
			if(response.data.dailyQuantity[0][i].datfinree!=null){
				sum+=response.data.dailyQuantity[0][i].qtefai;
				tabSumQuantity.push({x:new Date(response.data.dailyQuantity[0][i].datfinree),y:sum});
				tabDailyQuantity.push({x:new Date(response.data.dailyQuantity[0][i].datfinree),y:response.data.dailyQuantity[0][i].qtefai});
			}
		}

		$scope.released_qty=sum;

		var dailySumQuantityDS = {
			label: 'Sum Of Daily Quantity',
	      borderColor: 'Red',
	      fill: false,
	      data: tabSumQuantity,
	      type: 'line'
	  }

	  var dailyQuantityDS = {
	  	label: 'Daily Quantity',
	  	backgroundColor: 'MediumBlue',
	  	borderColor: 'Navy',
	  	data: tabDailyQuantity
	  }

	  chart.data.datasets.push(dailyTargetQuantityDS);
	  chart.data.datasets.push(dailySumQuantityDS);
	  chart.data.datasets.push(dailyQuantityDS);
	  chart.data.datasets.push(finalTargetQuantityDS);
	  chart.update();
	  console.log(chart.data)

	  updateListChart();

	});

	/*$http.post('http://'+url+':'+port+'/startCPSControl/' + mo).then(function(response) {
		console.log("start CPS: ",response);
	});
*/
	$http.get('http://'+url+':'+port+'/getOperations/' + mo, {headers :	{'Content-Type' : 'application/json'}}).then(function(response) {
		console.log("getOperations: ",response);
		$scope.operations=response.data;
	});
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


$http.get('http://'+url+':'+port+'/getOperations/' + mo, {headers :	{'Content-Type' : 'application/json'}}).then(function(response) {
	console.log("getOperations: ",response);
	$scope.operations=response.data;
});


	/*$http.get('http://'+url+':'+port+'/getProductSequence/' + mo, {headers : {'Content-Type' : 'application/json'}}).then(function(response) {
		console.log("getProductSequence: ",response);
	});*/
	$http.get('http://'+url+':'+port+'/getIssues/'+ mo).then(function(response){
		$scope.issues=response.data
		console.log("getIssues: ",response);
		updateListChart();
	});

	/*$http.post('http://'+url+':'+port+'/newIssue/'+ mo).then(function(response){

	});*/

	$scope.addIssue = function(){
		var body = {type:$scope.newIssue.type, description:$scope.newIssue.description, occurence:$scope.newIssue.occurence}
		$http.post('http://'+url+':'+port+'/newIssue/'+ mo + '/' + $scope.selectedOpe, body).then(function(response){
			$http.get('http://'+url+':'+port+'/getIssues/'+ mo).then(function(response){
				$scope.issues=response.data
				console.log("getIssues: ",response);
				updateListChart();
			});
		});
	}

	$http.get('http://'+url+':'+port+'/getUserCompany').then(function(response){
		$scope.User = response.data[0].company;
	});
	
	$scope.selectOpe = function(ope){
		console.log('ope', ope)
		$scope.selectedOpe=ope;
		$http.get('http://'+url+':'+port+'/getWatchList/'+mo+'/'+$scope.selectedOpe).then(function(response){
			console.log("getWatchList: ",response.data);
			$scope.watchList = response.data;
		});
	}

	$scope.logout = function(){
		$http.post('http://'+url+':'+port+'/logout').then(function(response){console.log(response)})
	}

	function updateListChart(){
		console.log('upadte list chart')
		var tabIssue = [];
		var label = [];
		var percentage = [];
		var sumPercentage = [];
		var compt=0;
		var sum = 0;
		var done = false;

		console.log('scope issue', $scope.issues)

		for(let issue in $scope.issues){
			done = false;
			console.log('issue: ', $scope.issues[issue])
			for(let line in tabIssue){
				if(tabIssue[line].type==$scope.issues[issue].type){
					tabIssue[line].occurence+=$scope.issues[issue].occurence;
					sum+=$scope.issues[issue].occurence;
					done=true;
				}
			}
			if(done==false){
				tabIssue.push({type:$scope.issues[issue].type, occurence:$scope.issues[issue].occurence, percentage:0});
				sum+=$scope.issues[issue].occurence;
			}
		}

		for(let control in $scope.qualityControls){
			if(control.status=='NOK'){
				compt++;
			}
		}

		tabIssue.push({type:'CPS', occurence: compt, percentage:0});
		sum+=compt;
		for(let line in tabIssue){
			tabIssue[line].percentage=tabIssue[line].occurence/sum*100;
			tabIssue[line].percentage=tabIssue[line].percentage.toFixed(2)
		}

		$scope.knownIssues = tabIssue;
		tabIssue.sort(function(a, b) {
		    return parseFloat(b.occurence) - parseFloat(a.occurence);
		});
		console.log('Tab Issues ',JSON.stringify(tabIssue));

		sum=0;
		for (let line in tabIssue){
			label.push(tabIssue[line].type);
			percentage.push(tabIssue[line].percentage);
			sum+=Number(tabIssue[line].percentage);
			sumPercentage.push(sum);
		}
		console.log('sumPercentage',sumPercentage)

		var percentageDS = {
			label: 'Percentage per issue',
			backgroundColor: 'MediumBlue',
			borderColor: 'Navy',
			data: percentage
		};

		var sumPercentageDS = {
			label: 'Pareto line',
			backgroundColor: 'White',
			borderColor: 'Red',
			data: sumPercentage,
			type: 'line'
		};

		chartPareto.data.labels=label;
		chartPareto.data.datasets[0] = percentageDS;
		chartPareto.data.datasets[1] = sumPercentageDS;
		chartPareto.update();
	}

	function getMO()
	{
		var str = window.location.search;
		str = str.substr(1);
		return str;
	}

});