using System.Web;
using System.Web.Optimization;

namespace Sales
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                    "~/Scripts/angular.js",
                    "~/Scripts/angular-route.js",
                    "~/Scripts/angular-local-storage.js",
                    "~/Scripts/ui-bootstrap-tpls.js",
                    "~/Scripts/angular-ui-router.js",
                    "~/Scripts/lodash.js"
                     ));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                    "~/Scripts/app/app.js",
                    "~/Scripts/app/controller/deal/deal.controller.js",
                    "~/Scripts/app/service/deal.service.js",
                    "~/Scripts/app/service/dealcurrentstatus.service.js",
                    "~/Scripts/app/service/dealopportunitystatus.service.js"

                     ));

        }
    }
}