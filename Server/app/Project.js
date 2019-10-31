var app = angular.module("Project", ['faye']);

app.constant('config', {  
  	api_url: 'localhost',
    api_port: '8004',
    alf_url: 'localhost',
    alf_port: '8080',
    scan_url: 'vf-os1.univ-lyon2.fr',
    scan_port: '8243'
});

app.factory('Faye', ['$faye', function($faye) {
  return $faye("http://localhost:8004/cps");
}]);