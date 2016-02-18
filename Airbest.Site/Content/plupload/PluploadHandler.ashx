<%@ WebHandler Language="C#" CodeBehind="PluploadHandler.ashx.cs" Class="Plupload.PluploadHandler" %>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace Plupload
{
    /// <summary>
    /// PluploadHandler 的摘要说明
    /// </summary>
    public class PluploadHandler : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            var Request = context.Request;
            var file = Request.Files[0];
            var fileUrl = "/ufiles/plupload/" + DateTime.Now.ToString("yyyyMMddhhmmss") +"_"+  Path.GetRandomFileName() + Path.GetExtension(file.FileName);
            var mappedFileUrl = context.Server.MapPath(fileUrl);

            Directory.CreateDirectory(Path.GetDirectoryName(mappedFileUrl));
            file.SaveAs(mappedFileUrl);

            context.Response.ContentType = "application/json";
            context.Response.Write(new JavaScriptSerializer().Serialize(new { fileUrl = fileUrl }));
        }

        public bool IsReusable
        {
            get { return false; }
        }
    }
}