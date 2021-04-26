angular.module("app")
  .controller("productController", function($scope, productService) { //서비스(exam26Service) 주입받음
    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList(1);
    });

    $scope.view = "list"; //처음에는 list가 보여짐
    $scope.getView = () => {
      switch($scope.view) {
        case "list": return "views/product/product_list.html"
        case "create": return "views/product/product_create.html"
        case "read": return "views/product/product_read.html"
        case "update": return "views/product/product_update.html"
      }
    };


    $scope.createProductForm = () => {
      $scope.product = null;
      $scope.view = "create";
    };

    $scope.battachUrl = (productno) => {
      return productService.battachUrl(productno);
    };

    $scope.imgbattachUrl = (imgno) => {
      return productService.imgbattachUrl(imgno);
    };

    $scope.getList = (pageNo) => {
      productService.list(pageNo)
      .then((response) => { //성공적으로 되면 response 객체 얻음
        $scope.pager = response.data.pager;
        //$scope.users = response.data.users;        
        $scope.products = response.data.products;
        
        $scope.pageRange = []; //배열 선언
        for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
          $scope.pageRange.push(i);
        }
        $scope.view = "list";
      });
    };


    $scope.categoryList = [1, 2, 3, 4];
    $scope.categoryVal = 1;
    $scope.getCategoryVal = () => {
       return $scope.categoryVal===1? "" : $scope.categoryVal;
     };


    $scope.read = (productno) => {
      productService.read(productno)
        .then((response) => {
          $scope.product = response.data.product;
          $scope.imglist = response.data.imglist;
                              
          $scope.view = "read"; //read라는 view를 보여주기
        });
    };

    $scope.createProduct = (product) => {
      if(product && product.pname && product.pcategory && product.pprice && product.psalescount && product.pstock && product.penable) {
        var formData = new FormData();
        formData.append("pname", product.pname);
        formData.append("pcategory", product.pcategory);
        formData.append("pprice", product.pprice);
        formData.append("psalescount", product.psalescount);
        formData.append("pstock", product.pstock);
        formData.append("penable", product.penable);
        
        var img1 = $("#img1")[0].files[0];
        var img2 = $("#img2")[0].files[0];
        var img3 = $("#img3")[0].files[0];
        var img4 = $("#img4")[0].files[0];
        var img5 = $("#img5")[0].files[0];
        if(img1) { //첨부파일이 있을 경우
          formData.append("pattach1", img1);
        } 
        if(img2) {
          formData.append("pattach2", img2);
        } 
        if(img3) {
          formData.append("pattach3", img3);
        } 
        if(img4) {
          formData.append("pattach4", img4);
        } 
        if(img5) {
          formData.append("pattach5", img5);
        }        
        productService.create(formData)
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

    $scope.updateProductForm = (productno) => {
      productService.readimgs(productno)
        .then((response) => {
          $scope.product = response.data.product;
          $scope.imglist = response.data.imglist;
          $scope.view = "update";
        })     
    };

    $scope.updateProduct = (product) => {
      if(product.pname && product.pcategory && product.pprice && product.psalescount && product.pstock && product.penable) {
        var formData = new FormData();
        formData.append("pname", product.pname);
        formData.append("pcategory", product.pcategory);
        formData.append("pprice", product.pprice);
        formData.append("psalescount", product.psalescount);
        formData.append("pstock", product.pstock);
        formData.append("penable", product.penable);
        
        var img1 = $("#img1")[0].files[0];
        var img2 = $("#img2")[0].files[0];
        var img3 = $("#img3")[0].files[0];
        var img4 = $("#img4")[0].files[0];
        var img5 = $("#img5")[0].files[0];
        if(img1) { //첨부파일이 있을 경우
          formData.append("pattach1", img1);
        } 
        if(img2) {
          formData.append("pattach2", img2);
        } 
        if(img3) {
          formData.append("pattach3", img3);
        } 
        if(img4) {
          formData.append("pattach4", img4);
        } 
        if(img5) {
          formData.append("pattach5", img5);
        }         
        productService.update(formData)
          .then((response) => {
            $scope.read(product.productno);
            $scope.view = "read";
          });
      }
    };

    $scope.deleteProduct = (productno) => {
      productService.delete(productno)
        .then((response) => {
          $scope.getList($scope.pager.pageNo);
          $scope.view = "list";
        });
    }
  });