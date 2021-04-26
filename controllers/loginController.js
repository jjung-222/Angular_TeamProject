angular.module("app")
  .controller("loginController", function($scope, loginService, $window, $rootScope, $location) { //서비스(exam26Service) 주입받음
    $scope.login = (user) => {
      loginService.login(user)
        .then((response) => {
          $rootScope.uid = response.data.uid; //스프링의 map의 정보를 받음
          $rootScope.authToken = response.data.authToken;
          console.log($rootScope.uid);
          console.log($rootScope.uname);


          sessionStorage.setItem("uid", response.data.uid); //세션에 저장(웹의 네트워크 콘솔)
          sessionStorage.setItem("authToken", response.data.authToken);
          console.log("로그인성공");
          $location.url("/");
        })
        .catch((response) => {
          $window.alert("로그인 실패: ", response.data);
        });
    }
  });