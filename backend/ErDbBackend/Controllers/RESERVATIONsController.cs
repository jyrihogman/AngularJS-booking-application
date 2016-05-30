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
        // GET: api/Reservations
        public async Task<IHttpActionResult> GetAllReservations()
        {
            using (var db = new CalendarProjectEntities())
            {
                var c = await(from r in db.RESERVATIONs select r).ToListAsync();
                return Ok(c);
            }
            //return db.RESERVATIONs;
        }


        // GET: api/Reservations/5
        [ResponseType(typeof(RESERVATION))]
        public async Task<IHttpActionResult> GetReservationById(int id)
        {
            using (var db = new CalendarProjectEntities())
            {
                RESERVATION rESERVATION = await db.RESERVATIONs.FindAsync(id);
                if (rESERVATION == null)
                {
                    return NotFound();
                }
                return Ok(rESERVATION); 
            }
        }

        // GET: api/Reservations/status/true
        [ActionName("status")]
        public async Task<IHttpActionResult> GetReservationByStatus(bool status)
        {
            using (var db = new CalendarProjectEntities())
            {
                if (status == true)
                {
                    var c = await (from r in db.RESERVATIONs where r.RESERVED == true select r).ToListAsync();
                    return Ok(c);
                }
                else if (status == false)
                {
                    var c = await (from r in db.RESERVATIONs where r.RESERVED == false select r).ToListAsync();
                    return Ok(c);
                }
                else
                {
                    return NotFound();
                } 
            }
        }

        // PUT: api/Reservations/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutReservation(int id, ReservationDTO r)
        {
            using (var db = new CalendarProjectEntities())
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != r.ID)
                {
                    return BadRequest();
                }

                RESERVATION reservation = db.RESERVATIONs.SingleOrDefault(i => i.ID == id);
                if (reservation.RESERVED == false)
                {
                    reservation.EMAIL = r.EMAIL;
                    reservation.FIRSTNAME = r.FIRSTNAME;
                    reservation.LASTNAME = r.LASTNAME;
                    reservation.RESERVED = r.RESERVED;

                    db.Entry(reservation).State = EntityState.Modified;


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
                return BadRequest();
            }
        }

        // POST: api/Reservations
        [ResponseType(typeof(RESERVATION))]
        public async Task<IHttpActionResult> PostReservation(RESERVATION rESERVATION)
        {
            using (var db = new CalendarProjectEntities())
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
        }

        // DELETE: api/Reservations/5
        [ResponseType(typeof(RESERVATION))]
        public async Task<IHttpActionResult> DeleteReservation(string id)
        {
            using (var db = new CalendarProjectEntities())
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
        }

        protected override void Dispose(bool disposing)
        {
            using (var db = new CalendarProjectEntities())
            {
                if (disposing)
                {
                    db.Dispose();
                }
                base.Dispose(disposing); 
            }
        } 

        private bool RESERVATIONExists(int id)
        {
            using (var db = new CalendarProjectEntities())
            {
                return db.RESERVATIONs.Count(e => e.ID == id) > 0; 
            }
        }
    }
}