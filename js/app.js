!function(){"use strict";var globals="undefined"!=typeof window?window:global;if("function"!=typeof globals.require){var modules={},cache={},has=function(object,name){return{}.hasOwnProperty.call(object,name)},expand=function(root,name){var parts,part,results=[];parts=/^\.\.?(\/|$)/.test(name)?[root,name].join("/").split("/"):name.split("/");for(var i=0,length=parts.length;length>i;i++)part=parts[i],".."===part?results.pop():"."!==part&&""!==part&&results.push(part);return results.join("/")},dirname=function(path){return path.split("/").slice(0,-1).join("/")},localRequire=function(path){return function(name){var dir=dirname(path),absolute=expand(dir,name);return globals.require(absolute,path)}},initModule=function(name,definition){var module={id:name,exports:{}};return cache[name]=module,definition(module.exports,localRequire(name),module),module.exports},require=function(name,loaderPath){var path=expand(name,".");if(null==loaderPath&&(loaderPath="/"),has(cache,path))return cache[path].exports;if(has(modules,path))return initModule(path,modules[path]);var dirIndex=expand(path,"./index");if(has(cache,dirIndex))return cache[dirIndex].exports;if(has(modules,dirIndex))return initModule(dirIndex,modules[dirIndex]);throw new Error('Cannot find module "'+name+'" from "'+loaderPath+'"')},define=function(bundle,fn){if("object"==typeof bundle)for(var key in bundle)has(bundle,key)&&(modules[key]=bundle[key]);else modules[bundle]=fn},list=function(){var result=[];for(var item in modules)has(modules,item)&&result.push(item);return result};globals.require=require,globals.require.define=define,globals.require.register=define,globals.require.list=list,globals.require.brunch=!0}}(),angular.module("npm-plugin-browser",["infinite-scroll","ngProgress"]),angular.module("npm-plugin-browser").controller("PluginListCtrl",function($scope,$http,$location,ngProgress){var makeRequest=function(start,size){return $http.get("http://npmsearch.com/query",{params:{q:"keywords:gulpplugin,gulpfriendly",fields:"name,keywords,rating,description,author,modified,homepage,version,license",start:start,size:size,sort:"rating:desc"}})};ngProgress.start(),makeRequest(0,15).then(function(response){return $scope.data=response.data.results,response.data.total}).then(function(total){return makeRequest(0,total)}).then(function(response){$scope.data=response.data.results,angular.isString($location.search().q)&&($scope.search=$location.search().q),ngProgress.complete()}),$scope.orderByGulpKeywords=function(item){return"gulpplugin"===item||"gulpfriendly"===item?-1:0}});