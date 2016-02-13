'use strict';

angular.module('plupload.module', [])
	.directive('plUpload', ["$timeout", function ($timeout) {
	    return {
	        restrict: 'A',
	        scope: {
	            'plProgressModel': '=',
	            'plModel': '=',
	            'plFilesModel': '=',
	            'plFiltersModel': '=',
	            'plMultiParamsModel': '=',
	            'plInstance': '=',
	        },

	        link: function (scope, iElement, iAttrs) {
	            scope.randomString = function (len, charSet) {
	                charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	                var randomString = '';
	                for (var i = 0; i < len; i++) {
	                    var randomPoz = Math.floor(Math.random() * charSet.length);
	                    randomString += charSet.substring(randomPoz, randomPoz + 1);
	                }
	                return randomString;
	            }

	            if (!iAttrs.id) {
	                var randomValue = scope.randomString(5);
	                iAttrs.$set('id', randomValue);
	            }
	            if (!iAttrs.plAutoUpload) {
	                iAttrs.$set('plAutoUpload', 'true');
	            }
	            if (!iAttrs.plMaxFileSize) {
	                iAttrs.$set('plMaxFileSize', '10mb');
	            }
	            if (!iAttrs.plUrl) {
	                iAttrs.$set('plUrl', '/Content/plupload/PluploadHandler.ashx?_a=upload');
	            }
	            if (!iAttrs.plFlashSwfUrl) {
	                iAttrs.$set('plFlashSwfUrl', '/Content/plupload/js/Moxie.swf');
	            }
	            if (!iAttrs.plSilverlightXapUrl) {
	                iAttrs.$set('plSilverlightXapUrl', '/Content/plupload/js/Moxie.xap');
	            }
	            if (typeof scope.plFiltersModel == "undefined") {
	                scope.filters = [{ title: "All files", extensions: "*" }];
	            }
	            else {
	                scope.filters = scope.plFiltersModel;
	            }

	            var options = {
	                runtimes: 'html5,flash,silverlight',
	                browse_button: iAttrs.id,
	                multi_selection: false,
	                max_file_size: iAttrs.plMaxFileSize,
	                url: iAttrs.plUrl,
	                flash_swf_url: iAttrs.plFlashSwfUrl,
	                silverlight_xap_url: iAttrs.plSilverlightXapUrl,
	                filters: scope.filters,
	                resize: {
                        //width: 560
	                    //width: 480
	                    width: 640
	                }
	                //multipart: false
	            }

	            if (scope.plMultiParamsModel) {
	                options.multipart_params = scope.plMultiParamsModel;
	            }

	            var uploader = new plupload.Uploader(options);
	            uploader.init();
	            uploader.bind('Error', function (up, err) {
	                if (iAttrs.onFileError) {
	                    scope.$parent.$apply(onFileError);
	                }
	                alert("Error: " + err.code + ", Message: " + err.message + (err.file ? ", File: " + err.file.name : "") + "");
	                up.refresh(); // Reposition Flash/Silverlight
	            });

	            uploader.bind('FilesAdded', function (up, files) {

	                //uploader.start();
	                scope.$apply(function () {
	                    if (iAttrs.plFilesModel) {
	                        if (!angular.isArray(scope.plFilesModel))
	                            scope.plFilesModel = [];
	                        scope.plFilesModel.push(files[0]);
	                    }
	                    if (iAttrs.onFileAdded) {
	                        scope.$parent.$eval(iAttrs.onFileAdded);
	                    }
	                });
	                if (iAttrs.plAutoUpload == "true") {
	                    uploader.start();
	                }
	            });

	            uploader.bind('FileUploaded', function (up, file, res) {
	                if (iAttrs.plModel) {
	                    var r = angular.fromJson(res.response);
	                    scope.$apply(function () {
	                        scope.plModel = r.fileUrl;
	                    });
	                }
	                if (iAttrs.onFileUploaded) {
	                    scope.$parent.$apply(iAttrs.onFileUploaded);
	                }
	            });

	            //alert(iAttrs.plUploaded);

	            uploader.bind('UploadProgress', function (up, file) {

	                if (!iAttrs.plProgressModel) {
	                    return;
	                }

	                if (iAttrs.plFilesModel) {
	                    scope.$apply(function () {
	                        scope.sum = 0;
	                        angular.forEach(scope.plFilesModel, function (file, key) {
	                            scope.sum = scope.sum + file.percent;
	                        });
	                        scope.plProgressModel = scope.sum / scope.plFilesModel.length;
	                    });
	                }
	                else {
	                    scope.$apply(function () {
	                        scope.plProgressModel = file.percent;
	                    });
	                }


	                if (iAttrs.onFileProgress) {
	                    scope.$parent.$eval(iAttrs.onFileProgress);
	                }


	            });

	            if (iAttrs.plInstance) {
	                scope.plInstance = uploader;
	            }

	            $timeout(function () {
	                var file = iElement.parent().find("input[type='file']");
	                file.attr("capture", "camera");
	                file.attr("accept", "image/*");
	            }, 100);
	        }
	    };
	}])