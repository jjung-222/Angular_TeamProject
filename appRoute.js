angular.module("app")
    .config(function($locationProvider, $routeProvider) {
        //HTML5 모드 활성화
        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: true
        //}); //이게 없으면 /#!/ 가 생김

        $routeProvider
            .when("/home", {templateUrl: "views/home.html", controller: "loginController"})
            .when("/notice_list", {templateUrl: "views/notice_list.html"})             
            .otherwise({redirectTo: "/home"});
    });