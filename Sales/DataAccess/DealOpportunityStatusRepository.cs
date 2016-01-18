using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using Sales.Models;

namespace Sales.DataAccess
{
    public class DealOpportunityStatusRepository : RepositoryBase, IDealOpportunityStatusRepository
    {
        public void Add(DealOpportunityStatus entity)
        {
            DbContext.DealOpportunityStatuses.Add(entity);
            DbContext.SaveChanges();
        }

        public void Update(DealOpportunityStatus entity)
        {
            DealOpportunityStatus dealOpportunityStatus = GetById(entity.Id);
            dealOpportunityStatus.Name = entity.Name;
            DbContext.SaveChanges();
        }

        public void Delete(long id)
        {
            DealOpportunityStatus dealCurrentStatus = GetById(id);
            DbContext.DealOpportunityStatuses.Remove(dealCurrentStatus);
            DbContext.SaveChanges();
        }

        public void Delete(Expression<Func<DealOpportunityStatus, bool>> where)
        {
            DealOpportunityStatus dealCurrentStatus = Get(where);
            DbContext.DealOpportunityStatuses.Remove(dealCurrentStatus);
            DbContext.SaveChanges();
        }

        public DealOpportunityStatus GetById(long id)
        {
            return DbContext.DealOpportunityStatuses.Where(w => w.Id == id).FirstOrDefault();

        }

        public DealOpportunityStatus Get(Expression<Func<DealOpportunityStatus, bool>> where)
        {
            return DbContext.DealOpportunityStatuses.Where(where).FirstOrDefault<DealOpportunityStatus>();
        }

        public IEnumerable<DealOpportunityStatus> GetAll()
        {
            return DbContext.DealOpportunityStatuses.ToList();
        }
        public IEnumerable<DealOpportunityStatus> GetMany(Expression<Func<DealOpportunityStatus, bool>> where)
        {
            return DbContext.DealOpportunityStatuses.Where(where).ToList();
        }
    }

    public interface IDealOpportunityStatusRepository : IRepository<DealOpportunityStatus>
    {

    }

}