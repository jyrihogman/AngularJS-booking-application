﻿using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using ErDbBackend.Models;
using System.Web.Http.Cors;

namespace ErDbBackend.Controllers
{
    [EnableCorsAttribute(origins: "*", headers: "*", methods: "*")]
    public class StatusController : ApiController
    {
        private ErProjectEntities db = new ErProjectEntities();

        // GET: api/Status/5
        [ResponseType(typeof(RESERVATION))]
        public async Task<IHttpActionResult> GetReservation(string id)
        {
            if (id == "true")
            {
                var c = await (from r in db.RESERVATIONs where r.RESERVED == true select r).ToListAsync();
                return Ok(c);
            }
            else
            {
                var c = await (from r in db.RESERVATIONs where r.RESERVED == false select r).ToListAsync();
                return Ok(c);
            }
        }
    }
}