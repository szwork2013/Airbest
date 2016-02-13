using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Airbest.Site.Startup))]
namespace Airbest.Site
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
