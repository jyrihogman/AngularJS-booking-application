class HomeController {
	constructor ($scope) {
		$scope.day = moment();
		$scope.messages = [ 
			{ time: "16:00", day: "2016-05-16" },
			{ time: "18:00", day: "2016-05-16" },
			{ time: "16:00", day: "2016-05-13" }	
		];
    }
}

angular.module("app").controller("HomeController", HomeController);

HomeController.$inject = ["$scope"];           
                      
export {};