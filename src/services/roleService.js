/* globals module */
/**
 * @module baasicRoleService
 * @description Baasic Role Service provides an easy way to consume Baasic Role REST API end-points. In order to obtain needed routes `baasicRoleService` uses `baasicRoleRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicRoleService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicRoleRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, roleRouteService) {
            return {
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of role resources matching the given criteria.
                 * @method        
                 * @example 
baasicRoleService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : '<field>',
  orderDirection : '<asc|desc>',
  search : '<search-phrase>'
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                 **/  					
                find: function (options) {
                    return baasicApiHttp.get(roleRouteService.find.expand(baasicApiService.findParams(options)));
                },
                 /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified role resource.
                 * @method        
                 * @example 
baasicRoleService.get('<role-id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/ 				
                get: function (id, options) {
                    return baasicApiHttp.get(roleRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                 /**
                 * Returns a promise that is resolved once the create action has been performed; this action creates a role.
                 * @method        
                 * @example 
baasicRoleService.create({
  description : '<description>',
  name : '<name>'
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/ 				
                create: function (data) {
                    return baasicApiHttp.post(roleRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the update role action has been performed; this action updates a role. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicRoleService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(role);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// role is a resource previously fetched using get action.
role.name = '<new-name>';
baasicRoleService.update(role)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});

				**/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the remove role action has been performed. This action will remove a role from the system, if completed successfully. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicRoleService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(role);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// Role is a resource previously fetched using get action.				 
baasicRoleService.remove(role)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/				
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                * Provides direct access to `baasicRoleRouteService`.
                * @method        
                * @example baasicRoleService.routeService.get.expand(expandObject);
                **/             
                routeService: roleRouteService
            };
        }]);
}(angular, module));
/**
 * @overview 
 ***Notes:**
 - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/