angular.module("app")
  .controller("noticeController", function($scope, exam26Service, $rootScope) { //서비스(exam26Service) 주입받음
    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList(1);
    });

    $scope.view = "list"; //처음에는 list가 보여짐
    $scope.getView = () => {
      switch($scope.view) {
        case "list": return "views/exam26_http_boards/list.html"
        case "create": return "views/exam26_http_boards/create.html"
        case "read": return "views/exam26_http_boards/read.html"
        case "update": return "views/exam26_http_boards/update.html"
      }
    };
    
    $scope.createBoardForm = () => {
      $scope.board = null;
      $scope.view = "create";
    };

    $scope.getList = (pageNo) => {
      exam26Service.list(pageNo)
      .then((response) => { //성공적으로 되면 response 객체 얻음
        $scope.pager = response.data.pager;
        $scope.boards = response.data.boards;
        $scope.pageRange = []; //배열 선언
        for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
          $scope.pageRange.push(i);
        }
        $scope.view = "list";
      });
    };

    $scope.read = (bno) => {
      exam26Service.read(bno)
        .then((response) => {
          $scope.board = response.data;
          $scope.view = "read"; //read라는 view를 보여주기
        });
    };

    $scope.battachUrl = (bno) => {
      return exam26Service.battachUrl(bno);
    };

    $scope.createBoard = (board) => {
      if(board && board.btitle && board.bcontent) {
        var formData = new FormData();
        formData.append("btitle", board.btitle);
        formData.append("bcontent", board.bcontent);
        formData.append("bwriter", $rootScope.uid);
        var battach = $("#battach")[0].files[0]; //제이쿼리 첫번째의 엘리먼트 라는 뜻 = document.querySelector("#battach").files[0];
        if(battach) {
          formData.append("battach", battach);
        }
        exam26Service.create(formData)
          .then((response) => {
            $scope.getList(1);
            $scope.view = "list";
          });
      }
    };

    $scope.cancel = () => {
      $scope.getList($scope.pager.pageNo);
      $scope.view = "list";
    };

    $scope.updateBoardForm = () => {
      $scope.view = "update";
    };
  
    $scope.updateBoard = (board) => {
      if(board.btitle && board.bcontent){
        var formData = new FormData();
        formData.append("bno", board.bno);
        formData.append("btitle", board.btitle);
        formData.append("bcontent", board.bcontent);
        var battach = $("#battach")[0].files[0];
        if(battach){
            formData.append("battach", battach);
        }
        exam26Service.update(formData)
          .then((response) => {
            $scope.read(board.bno);
            $scope.view = "read";
          });
       }
    };

    $scope.deleteBoard = (bno) => {
      exam26Service.delete(bno)
        .then((response) => {
          $scope.getList($scope.pager.pageNo);
          $scope.view = "list";
        });
    }
  });