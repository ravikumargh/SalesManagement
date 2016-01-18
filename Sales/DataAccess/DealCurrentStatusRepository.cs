using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using Sales.Models;

namespace Sales.DataAccess
{
    public class DealCurrentStatusRepository : RepositoryBase, IDealCurrentStatusRepository
    {
        public void Add(DealCurrentStatus entity)
        {
            DbContext.DealCurrentStatuses.Add(entity);
            DbContext.SaveChanges();
        }

        public void Update(DealCurrentStatus entity)
        {
            DealCurrentStatus dealCurrentStatus = GetById(entity.Id);
            dealCurrentStatus.Name = entity.Name;
            DbContext.SaveChanges();
        }

        public void Delete(long id)
        {
            DealCurrentStatus dealCurrentStatus = GetById(id);
            DbContext.DealCurrentStatuses.Remove(dealCurrentStatus);
            DbContext.SaveChanges();
        }

        public void Delete(Expression<Func<DealCurrentStatus, bool>> where)
        {
            DealCurrentStatus dealCurrentStatus = Get(where);
            DbContext.DealCurrentStatuses.Remove(dealCurrentStatus);
            DbContext.SaveChanges();
        }

        public DealCurrentStatus GetById(long id)
        {
            return DbContext.DealCurrentStatuses.Where(w => w.Id == id).FirstOrDefault();

        }

        public DealCurrentStatus Get(Expression<Func<DealCurrentStatus, bool>> where)
        {
            return DbContext.DealCurrentStatuses.Where(where).FirstOrDefault<DealCurrentStatus>();
        }

        public IEnumerable<DealCurrentStatus> GetAll()
        {
            return DbContext.DealCurrentStatuses.ToList();
        }
        public IEnumerable<DealCurrentStatus> GetMany(Expression<Func<DealCurrentStatus, bool>> where)
        {
            return DbContext.DealCurrentStatuses.Where(where).ToList();
        }
    }

    public interface IDealCurrentStatusRepository : IRepository<DealCurrentStatus>
    {

    }

}