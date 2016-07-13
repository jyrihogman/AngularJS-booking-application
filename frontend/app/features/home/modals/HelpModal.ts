export class ModalController {

}

angular.module('app')
    .directive('modal', () => {
    return {
        restrict: 'E',
        templateUrl: 'features/home/modals/helpmodal.html',
        controller: ModalController,
        controllerAs: '$modal',
        bindToController: true,
    }
});