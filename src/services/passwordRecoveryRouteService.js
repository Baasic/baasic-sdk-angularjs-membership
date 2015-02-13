/* globals module */

(function (angular, module, undefined) {
    'use strict';
    module.service('baasicPasswordRecoveryRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
            return {
                passwordRecovery: uriTemplateService.parse('recover-password'),                
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));