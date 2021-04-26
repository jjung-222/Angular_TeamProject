angular.module("app")
    .factory("reviewService", function($http){

        const BASE_URL = "http://localhost:8080/productReview";

        return {
            list: function(pageNo=1, searchType, keyword) {
                const promise = $http.get(BASE_URL, {params: {pageNo, searchType, keyword}});
                return promise;
            },

            readReview: function(boardno) {
                const promise = $http.get(BASE_URL+"/"+ boardno);
                return promise;
            },
            deleteReview: function(boardno){
                const promise = $http.delete(BASE_URL + "/" + boardno);

                return promise;
            },

            battachUrl: function(boardno) {
                return BASE_URL + "/battach/" + boardno;
            }
        }

    })