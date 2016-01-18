using Sales.DataAccess;
using Sales.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sales.Controllers
{
     public class DealController : ApiController
    {
        //IDealService<Deal> dealService;
         private IRepository<Deal> dealRepository = new DealRepository();

        //public DealController(IRepository<Deal> dealRepository)
        //{
        //    this.dealRepository = dealRepository;
        //}
        // GET: api/Deal
        public IEnumerable<Deal> Get()
        {
            return dealRepository.GetAll();
        }

        // GET: api/Deal/5
        public Deal Get(int id)
        {
            return dealRepository.GetById(id);
        }

        // POST: api/Deal
        public void Post(Deal deal)
        {            
            dealRepository.Add(deal);

        }

        // PUT: api/Deal/5
        public void Put(Deal deal)
        {
            dealRepository.Update(deal);
        }

        // DELETE: api/Deal/5
        public void Delete(int id)
        {
            dealRepository.Delete(id);
        }
    }
}
