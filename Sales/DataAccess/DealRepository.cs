using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using Sales.Models;

namespace Sales.DataAccess
{
    public class DealRepository : RepositoryBase, IDealRepository
    {
        public void Add(Deal entity)
        {
            DbContext.Deals.Add(entity);
            DbContext.SaveChanges();
        }

        public void Update(Deal entity)
        {
            Deal deal = GetById(entity.Id);
            deal.CustomerName = entity.CustomerName;
            deal.DealCurrentStatusId = entity.DealCurrentStatusId;
            DbContext.SaveChanges();
        }

        public void Delete(long id)
        {
            Deal deal = GetById(id);
            DbContext.Deals.Remove(deal);
            DbContext.SaveChanges();
        }

        public void Delete(Expression<Func<Deal, bool>> where)
        {
            Deal deal = Get(where);
            DbContext.Deals.Remove(deal);
            DbContext.SaveChanges();
        }

        public Deal GetById(long id)
        {
            return DbContext.Deals.Where(w => w.Id == id).FirstOrDefault();

        }

        public Deal Get(Expression<Func<Deal, bool>> where)
        {
            return DbContext.Deals.Where(where).FirstOrDefault<Deal>();
        }

        public IEnumerable<Deal> GetAll()
        {
            return DbContext.Deals.ToList();
        }
        public IEnumerable<Deal> GetMany(Expression<Func<Deal, bool>> where)
        {
            return DbContext.Deals.Where(where).ToList();
        }
    }

    public interface IDealRepository : IRepository<Deal>
    {

    }

}