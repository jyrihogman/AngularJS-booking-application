class HomeController {
	constructor ($scope) {
		$scope.day = moment();
		$scope.messages = [ 
			{ time: "16:00", day: "2016-05-17" },
			{ time: "18:00", day: "2016-05-17" },
			{ time: "16:00", day: "2016-05-20" }	
		];
    }
}

angular.module("app").controller("HomeController", HomeController);

HomeController.$inject = ["$scope"];           
                      
export {};