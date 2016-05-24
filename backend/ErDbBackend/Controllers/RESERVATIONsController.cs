using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using ErDbBackend.Models;
using System.Web.Http.Cors;

namespace ErDbBackend.Controllers
{
    [EnableCorsAttribute(origins: "*", headers: "*", methods: "*")]
    public class RESERVATIONsController : ApiController
    {
        private ErProjectEntities db = new ErProjectEntities();

        // GET: api/RESERVATIONs
        public IQueryable<RESERVATION> GetRESERVATIONs()
        {
            //using (var context = new ErProjectEntities())
            //{
            //    // Query for all blogs with names starting with B 
            //    var blogs = from b in context.RESERVATIONs
            //                where b.RESERVED == null
            //                select b;
            //    return db.RESERVATIONs;

            //}

            return db.RESERVATIONs;

        }


        // GET: api/RESERVATIONs/5
        [ResponseType(typeof(RESERVATION))]
        public async Task<IHttpActionResult> GetRESERVATION(string id)
        {
            //if(id == "true")
            //{
            //    var c = await (from r in db.RESERVATIONs where r.RESERVED == true select r).ToListAsync();
            //    return Ok(c);
            //}
            //else
            //{
            //    var c = await (from r in db.RESERVATIONs where r.RESERVED == false select r).ToListAsync();
            //    return Ok(c);
            //}

            RESERVATION rESERVATION = await db.RESERVATIONs.FindAsync(id);
            if (rESERVATION == null)
            {
                return NotFound();
            }
            return Ok(rESERVATION);
        }

        // PUT: api/RESERVATIONs/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutRESERVATION(string id, RESERVATION rESERVATION)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rESERVATION.ID)
            {
                return BadRequest();
            }

            db.Entry(rESERVATION).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RESERVATIONExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/RESERVATIONs
        [ResponseType(typeof(RESERVATION))]
        public async Task<IHttpActionResult> PostRESERVATION(RESERVATION rESERVATION)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RESERVATIONs.Add(rESERVATION);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RESERVATIONExists(rESERVATION.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = rESERVATION.ID }, rESERVATION);
        }

        // DELETE: api/RESERVATIONs/5
        [ResponseType(typeof(RESERVATION))]
        public async Task<IHttpActionResult> DeleteRESERVATION(string id)
        {
            RESERVATION rESERVATION = await db.RESERVATIONs.FindAsync(id);
            if (rESERVATION == null)
            {
                return NotFound();
            }

            db.RESERVATIONs.Remove(rESERVATION);
            await db.SaveChangesAsync();

            return Ok(rESERVATION);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RESERVATIONExists(string id)
        {
            return db.RESERVATIONs.Count(e => e.ID == id) > 0;
        }
    }
}