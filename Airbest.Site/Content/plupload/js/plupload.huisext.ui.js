/// <reference path="jquery-1.8.3.min.js" />
/// <reference path="huisext.js" />

window.HE = window.HE || {};

/*
 * plupload
 */
if (window.plupload) {

    HE.initPlupload = function (element) {
        var me = $(element);
        var uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: me[0], // you can pass in id...
            filters: {
                max_file_size: '10mb',
                mime_types: [
                    { title: "Image files", extensions: "*" }
                ]
            },

            url: "/Content/plupload/PluploadHandler.ashx?_a=upload",
            flash_swf_url: '/Content/plupload/js/Moxie.swf',
            silverlight_xap_url: '/Content/plupload/js/Moxie.xap',

            init: {
                FilesAdded: function (up, files) {
                    uploader.start();
                },
                Error: function (up, err) {
                    if (window.console) {
                        window.console.log("plupload error:");
                        window.console.log(err);
                    }
                },
                FileUploaded: function (up, file, info) {
                    // Called when file has finished uploading
                    jQuery.event.props.push("data");
                    var data = $.parseJSON(info.response);
                    var evt = jQuery.Event("uploaded.plupload", { fileUrl: data.fileUrl });
                    me.trigger(evt, data);
                }
            }
        });

        uploader.init();
        me.data("plupload", uploader);

        me.on("uploaded.plupload", function (e) {
            var group = me.parents(".form-group:eq(0)");
            var imgRefs = null;
            var inputRefs = null;

            if (group.length == 0) {
                imgRefs = me.siblings("img[data-ref='plupload']");
                inputRefs = me.siblings("input[data-ref='plupload']");
            } else {
                imgRefs = group.find("img[data-ref='plupload']");
                inputRefs = group.find("input[data-ref='plupload']");
            }

            imgRefs.attr("src", e.fileUrl);
            inputRefs.val(e.fileUrl).trigger("change");

            var input = me.attr("data-input");
            if (input != null && input != "")
                $(input).val(e.fileUrl).trigger("change");

            var img = me.attr("data-img");
            if (img != null && img != "")
                $(img).attr("src", e.fileUrl);
        });
    };

    $(function () {
        $("[data-toggle='plupload']").each(function () {
            HE.initPlupload(this);
        });

        $("[data-clear='plupload']").on("click", function () {
            var me = $(this);
            me.siblings("img[data-ref='plupload']").removeAttr("src");
            me.siblings("input[data-ref='plupload']").val("");
        });
    });
}