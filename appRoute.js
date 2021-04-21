angular.module("app")
    .config(function($locationProvider, $routeProvider) {
        //HTML5 모드 활성화
        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: true
        //}); //이게 없으면 /#!/ 가 생김

        $routeProvider
            .when("/exam01_home", {templateUrl: "views/exam01_home.html"})            
            .otherwise({redirectTo: "/exam01_home"});
    });