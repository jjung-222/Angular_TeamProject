angular.module("app")
  .controller("loginController", function($scope, loginService, reviewService,
                                          orderService ,$window, $rootScope, $location) { //서비스(exam26Service) 주입받음
    $scope.$on("$routeChangeSuccess", () => {
      if($rootScope.uid != null){
        $scope.getReviewCount();
        $scope.getOrderCount();
        $scope.getReviewList();
      }
    });


    $scope.login = (user) => {
      loginService.login(user)
        .then((response) => {
          console.log(response);
          $rootScope.uid = response.data.uid; //스프링의 map의 정보를 받음
          $rootScope.authToken = response.data.authToken;
          $rootScope.uemail = response.data.email;

          console.log($rootScope.uid);
          console.log($rootScope.uname);
          console.log($rootScope.uemail);


          sessionStorage.setItem("uid", response.data.uid); //세션에 저장(웹의 네트워크 콘솔)
          sessionStorage.setItem("uemail", response.data.email);
          sessionStorage.setItem("authToken", response.data.authToken);
          console.log("로그인성공");
          $location.url("/");
        })
        .catch((response) => {
          $window.alert("로그인 실패: ", response.data);
        });
    }

    $scope.getReviewCount = () => {
      reviewService.reviewCount()
        .then((response) => {
          $scope.reviewCount = response.data;
        });
    }

    $scope.getOrderCount = () => {
      orderService.orderCount()
        .then((response) => {
          $scope.orderCount = response.data;
        });
    }

    $scope.getReviewList = () => {
      reviewService.bestReview()
        .then((response) => {
          $scope.reviews = response.data;
        });
    }

    
    $scope.battachUrl = (boardno) => {
        return reviewService.battachUrl(boardno);
    };

  });