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
    public class DealCurrentStatusController : ApiController
    {
        //IDealCurrentStatusService<DealCurrentStatus> dealService;
        private IRepository<DealCurrentStatus> dealRepository=new DealCurrentStatusRepository();

       
        // GET: api/DealCurrentStatus
        public IEnumerable<DealCurrentStatus> Get()
        {
            return dealRepository.GetAll();
        }

        // GET: api/DealCurrentStatus/5
        public DealCurrentStatus Get(int id)
        {
            return dealRepository.GetById(id);
        }

        // POST: api/DealCurrentStatus
        public void Post(DealCurrentStatus dealCurrentStatus)
        {
            dealRepository.Add(dealCurrentStatus);

        }

        // PUT: api/DealCurrentStatus/5
        public void Put(DealCurrentStatus dealCurrentStatus)
        {
            dealRepository.Update(dealCurrentStatus);
        }

        // DELETE: api/DealCurrentStatus/5
        public void Delete(int id)
        {
            dealRepository.Delete(id);
        }
    }
}
