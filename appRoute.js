angular.module("app")
    .config(function($locationProvider, $routeProvider) {
        //HTML5 모드 활성화
        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: true
        //}); //이게 없으면 /#!/ 가 생김

        $routeProvider
            .when("/home", {templateUrl: "views/home.html", controller: "loginController"})  
            .when("/notice", {templateUrl: "views/notice/index.html", controller:"noticeController"})
<<<<<<< HEAD
            .when("/product", {templateUrl: "views/product/index.html", controller:"productController"})
          
=======
            .when("/communityqna", {templateUrl: "views/communityqna/index.html", controller:"communityqnaController"})
            .when("/join", {templateUrl: "views/join/join.html", controller:"joinController"})
            .when("/ordered_list", {templateUrl: "views/order/ordered_list.html", controller: "orderController"})
            .when("/ordered_view/:orderno", {templateUrl: "views/order/ordered_view.html", controller: "orderController"})
            .when("/review", {templateUrl: "views/productReview/index.html", controller: "reviewController"})    
            .when("/auth", {templateUrl: "views/user/index.html", controller:"userController"})
            .when("/pqna", {templateUrl: "views/productQna/index.html", controller:"pqnaController"})
            .when("/product", {templateUrl: "views/product/index.html", controller:"productController"})
>>>>>>> c409045ce12faa470f82b50f923a90634625d75f
            .otherwise({redirectTo: "/home"});
    });