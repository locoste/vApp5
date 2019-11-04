app.controller("CustomController",function($scope, $http, config) {
	var ctrl = {};
	var mo = getMO();
	const url = config.api_url;
	const port = config.api_port;

	$scope.graph = {
			chart: {
				container: "#example-graph",
				levelSeparation:    20,
				siblingSeparation:  120,
				subTeeSeparation:   15,

				rootOrientation: "WEST",

			//nodeAlign: "BOTTOM",

			node: {
				HTMLclass: "big-commpany",
				/*collapsable: true*/
			},
			animation: {
				nodeAnimation: "easeOutBounce",
				nodeSpeed: 700,
			},
			callback: {
		        // This refers to custom callback available in https://github.com/Alexlambertz/treant-js
		        onClick: function (nodeId, node, event) {
		        	ctrl.selectEvent(nodeId, node, event);
		        }.bind(this),
		        onTreeLoaded: function () {
		        	console.log("Graph loaded!!");
		        }
		    }
		},
		nodeStructure:{}
	};

	$http.get('http://'+url+':'+port+'/getProductSequence/'+mo).then(function(response){
		console.log('json tree', response.data)
		/*$scope.graph.nodeStructure = response.data;
		console.log('graph');
		console.log($scope.graph);*/
		var treeStructure = {
			chart: {
				container: "#example-graph",
				levelSeparation:    20,
				siblingSeparation:  120,
				subTeeSeparation:   15,

				rootOrientation: "WEST",

			//nodeAlign: "BOTTOM",

			node: {
				HTMLclass: "big-commpany",
				/*collapsable: true*/
			},
			animation: {
				nodeAnimation: "easeOutBounce",
				nodeSpeed: 700,
			},
			callback: {
		        // This refers to custom callback available in https://github.com/Alexlambertz/treant-js
		        onClick: function (nodeId, node, event) {
		        	ctrl.selectEvent(nodeId, node, event);
		        }.bind(this),
		        onTreeLoaded: function () {
		        	console.log("Graph loaded!!");
		        }
		    }
		},
		nodeStructure:response.data
	};
	new Treant(treeStructure);
	})

	/*ctrl.selectEvent = function (nodeId, node, event) {
		$scope.nodeSelectedLast = nodeId;
		$scope.$apply();
	}*/


	/*var simple_chart_config = {
		chart: {
			container: "#productionSequence"
		},

		nodeStructure: {
			text: { name: "Parent node" },
			children: [
			{
				text: { name: "First child" }
			},
			{
				text: { name: "Second child" }
			}
			]
		}
	};*/
	

		/*$scope.gotClick = function (temp) {
		console.log("aa *****");
		console.log("temp = " + temp);
	}*/

	function getMO()
	{
		var str = window.location.search;
		str = str.substr(1);
		return str;
	}

});
