angular.module("app")
    .factory("orderService", function($http){

        const BASE_URL = "http://localhost:8080/orders";

        return {
            list: function(pageNo=1, searchType="", keyword="") {
                const promise = $http.get(BASE_URL, {params: {pageNo, searchType, keyword}});
                return promise;
            },

            orderView: function(orderno) {
                const promise = $http.get(BASE_URL+"/"+ orderno);
                return promise;
            },

            updateStatus: function(order) {
                const promise = $http.put(BASE_URL, order);
                return promise;
            }
        }

    })