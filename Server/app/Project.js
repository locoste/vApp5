var app = angular.module("Project", ['faye']);

app.constant('config', {  
  	api_url: 'localhost',
    api_port: '8004',
    alf_url: 'localhost',
    alf_port: '8080',
    scan_url: '159.84.143.246',
    scan_port: '8243'
});
