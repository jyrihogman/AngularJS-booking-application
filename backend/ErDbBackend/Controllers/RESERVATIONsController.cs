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

        // GET: api/Reservations
        public IQueryable<RESERVATION> GetAllReservations()
        {
                return db.RESERVATIONs;
        }


        // GET: api/Reservations/5
        [ResponseType(typeof(RESERVATION))]
        public async Task<IHttpActionResult> GetReservationById(string id)
        {
            RESERVATION rESERVATION = await db.RESERVATIONs.FindAsync(id);
            if (rESERVATION == null)
            {
                return NotFound();
            }
            return Ok(rESERVATION);
        }

        // GET: api/Reservations/status/true
        [ActionName("status")]
        public async Task<IHttpActionResult> GetReservationByStatus(string status)
        {
            if (status == "true")
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

        // PUT: api/Reservations/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutReservation(string id, RESERVATION rESERVATION)
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

        // POST: api/Reservations
        [ResponseType(typeof(RESERVATION))]
        public async Task<IHttpActionResult> PostReservation(RESERVATION rESERVATION)
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

        // DELETE: api/Reservations/5
        [ResponseType(typeof(RESERVATION))]
        public async Task<IHttpActionResult> DeleteReservation(string id)
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