using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sales.Models;

namespace Sales.DataAccess
{
    public class RepositoryBase
    {
        #region Properties
        private SalesEntities dataContext;

        protected SalesEntities DbContext
        {
            get { return dataContext ?? (dataContext = new SalesEntities()); }
        }
        #endregion
    }
}