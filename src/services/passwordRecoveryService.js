﻿/* globals module */
/**
 * @module baasicPasswordRecoveryService
 * @description Baasic PasswordRecovery Service provides an easy way to consume Baasic application password recovery features.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicPasswordRecoveryService', ['baasicApiHttp', 'baasicPasswordRecoveryRouteService',
        function (baasicApiHttp, passwordRecoveryRouteService) {
            return {
                routeService: passwordRecoveryRouteService,
				/**
				* Returns a promise that is resolved once the password recovery requestReset action is completed. This initiates the password recovery process for the user.
				* @method
				* @example
baasicPasswordRecoveryService.requestReset({
  challengeIdentifier : "<challenge-identifier>",
  challengeResponse : "<challenge-response>",
  recoverUrl : "<recover-url>",
  userName : "<username>"
})
.success(function () {
  // perform success action here
})
.error(function (data) {
  // perform error handling here
})
.finally (function () {});				
				*/
                requestReset: function (data) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.passwordRecovery.expand({}),
                        method: 'POST',
                        data: data
                    });
                },
				/**
				* Returns a promise that is resolved once the password reset action is completed. This updates the user password selection.
				* @method
				* @example
baasicPasswordRecoveryService.reset({
  newPassword : "<new-password>",
  passwordRecoveryToken : "<password-recovery-token>"
})
.success(function () {
  // perform success action here
})
.error(function (data) {
  // perform error handling here
})
.finally (function () {});				
				*/				
                reset: function (data) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.passwordRecovery.expand({}),
                        method: 'PUT',
                        data: data
                    });
                }
            };
        }]);
}(angular, module));