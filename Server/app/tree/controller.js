app.controller("CustomController", function ($scope, $http) {
	var ctrl = {};
	var mo = getMO();
	const url = 'localhost';
	const port = '8004';

	/*ctrl.selectEvent = function (nodeId, node, event) {
		$scope.nodeSelectedLast = nodeId;
		$scope.$apply();
	}*/


	var simple_chart_config = {
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
	};
	

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
