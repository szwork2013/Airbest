/// <reference path="angular-resource.d.ts" />
;
;
///////////////////////////////////////
// IActionDescriptor
///////////////////////////////////////
var actionDescriptor;
angular.injector(['ng']).invoke(function ($cacheFactory, $timeout) {
    actionDescriptor.method = 'method action';
    actionDescriptor.params = { key: 'value' };
    actionDescriptor.url = '/api/test-url/';
    actionDescriptor.isArray = true;
    actionDescriptor.transformRequest = function () { };
    actionDescriptor.transformRequest = [function () { }];
    actionDescriptor.transformResponse = function () { };
    actionDescriptor.transformResponse = [function () { }];
    actionDescriptor.headers = { header: 'value' };
    actionDescriptor.cache = true;
    actionDescriptor.cache = $cacheFactory('cacheId');
    actionDescriptor.timeout = 1000;
    actionDescriptor.timeout = $timeout(function () { });
    actionDescriptor.withCredentials = true;
    actionDescriptor.responseType = 'response type';
    actionDescriptor.interceptor = { key: 'value' };
});
///////////////////////////////////////
// IResourceClass
///////////////////////////////////////
var resourceClass;
var resource;
var resourceArray;
resource = resourceClass.delete();
resource = resourceClass.delete({ key: 'value' });
resource = resourceClass.delete({ key: 'value' }, function () { });
resource = resourceClass.delete(function () { });
resource = resourceClass.delete(function () { }, function () { });
resource = resourceClass.delete({ key: 'value' }, { key: 'value' });
resource = resourceClass.delete({ key: 'value' }, { key: 'value' }, function () { });
resource = resourceClass.delete({ key: 'value' }, { key: 'value' }, function () { }, function () { });
resource.$promise.then(function (data) { });
resource = resourceClass.get();
resource = resourceClass.get({ key: 'value' });
resource = resourceClass.get({ key: 'value' }, function () { });
resource = resourceClass.get(function () { });
resource = resourceClass.get(function () { }, function () { });
resource = resourceClass.get({ key: 'value' }, { key: 'value' });
resource = resourceClass.get({ key: 'value' }, { key: 'value' }, function () { });
resource = resourceClass.get({ key: 'value' }, { key: 'value' }, function () { }, function () { });
resourceArray = resourceClass.query();
resourceArray = resourceClass.query({ key: 'value' });
resourceArray = resourceClass.query({ key: 'value' }, function () { });
resourceArray = resourceClass.query(function () { });
resourceArray = resourceClass.query(function () { }, function () { });
resourceArray = resourceClass.query({ key: 'value' }, { key: 'value' });
resourceArray = resourceClass.query({ key: 'value' }, { key: 'value' }, function () { });
resourceArray = resourceClass.query({ key: 'value' }, { key: 'value' }, function () { }, function () { });
resourceArray.push(resource);
resourceArray.$promise.then(function (data) { });
resource = resourceClass.remove();
resource = resourceClass.remove({ key: 'value' });
resource = resourceClass.remove({ key: 'value' }, function () { });
resource = resourceClass.remove(function () { });
resource = resourceClass.remove(function () { }, function () { });
resource = resourceClass.remove({ key: 'value' }, { key: 'value' });
resource = resourceClass.remove({ key: 'value' }, { key: 'value' }, function () { });
resource = resourceClass.remove({ key: 'value' }, { key: 'value' }, function () { }, function () { });
resource = resourceClass.save();
resource = resourceClass.save({ key: 'value' });
resource = resourceClass.save({ key: 'value' }, function () { });
resource = resourceClass.save(function () { });
resource = resourceClass.save(function () { }, function () { });
resource = resourceClass.save({ key: 'value' }, { key: 'value' });
resource = resourceClass.save({ key: 'value' }, { key: 'value' }, function () { });
resource = resourceClass.save({ key: 'value' }, { key: 'value' }, function () { }, function () { });
///////////////////////////////////////
// IResource
///////////////////////////////////////
var promise;
var arrayPromise;
var json;
promise = resource.$delete();
promise = resource.$delete({ key: 'value' });
promise = resource.$delete({ key: 'value' }, function () { });
promise = resource.$delete(function () { });
promise = resource.$delete(function () { }, function () { });
promise = resource.$delete({ key: 'value' }, function () { }, function () { });
promise.then(function (data) { });
promise = resource.$get();
promise = resource.$get({ key: 'value' });
promise = resource.$get({ key: 'value' }, function () { });
promise = resource.$get(function () { });
promise = resource.$get(function () { }, function () { });
promise = resource.$get({ key: 'value' }, function () { }, function () { });
arrayPromise = resourceArray[0].$query();
arrayPromise = resourceArray[0].$query({ key: 'value' });
arrayPromise = resourceArray[0].$query({ key: 'value' }, function () { });
arrayPromise = resourceArray[0].$query(function () { });
arrayPromise = resourceArray[0].$query(function () { }, function () { });
arrayPromise = resourceArray[0].$query({ key: 'value' }, function () { }, function () { });
arrayPromise.then(function (data) { });
promise = resource.$remove();
promise = resource.$remove({ key: 'value' });
promise = resource.$remove({ key: 'value' }, function () { });
promise = resource.$remove(function () { });
promise = resource.$remove(function () { }, function () { });
promise = resource.$remove({ key: 'value' }, function () { }, function () { });
promise = resource.$save();
promise = resource.$save({ key: 'value' });
promise = resource.$save({ key: 'value' }, function () { });
promise = resource.$save(function () { });
promise = resource.$save(function () { }, function () { });
promise = resource.$save({ key: 'value' }, function () { }, function () { });
json = resource.toJSON();
///////////////////////////////////////
// IResourceService
///////////////////////////////////////
var resourceService;
resourceClass = resourceService('test');
resourceClass = resourceService('test');
resourceClass = resourceService('test');
///////////////////////////////////////
// IModule
///////////////////////////////////////
var mod;
var resourceServiceFactoryFunction;
var resourceService;
resourceClass = resourceServiceFactoryFunction(resourceService);
resourceServiceFactoryFunction = function (resourceService) { return resourceClass; };
mod = mod.factory('factory name', resourceServiceFactoryFunction);
///////////////////////////////////////
// IResource
///////////////////////////////////////
///////////////////////////////////////
// IResourceServiceProvider
///////////////////////////////////////
var resourceServiceProvider;
resourceServiceProvider.defaults.stripTrailingSlashes = false;
