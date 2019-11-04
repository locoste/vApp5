var app = angular.module("app", ["ngTreant"]);

app.constant('config', {  
    api_url: 'localhost',
    api_port: '8004',
});

angular.module('ngTreant', [])
.directive('treantGraph', function () {
    return {
        restrict: 'E',
        scope: {
            data: '=data'
        },
        template: '<div class="chart" id="example-graph"></div>',
        link: linkFn
    };

    function linkFn(scope, element, attrs, ctrlFn) {
        var tree = new Treant(scope.data);
    }
});