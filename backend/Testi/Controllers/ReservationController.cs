using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using Testi.Models;
using System.Web.Http.Cors;

namespace Testi.Controllers
{
    [EnableCors(origins: "http://localhost:7203", headers: "*", methods: "*")]
    public class ReservationController : ApiController
    {
        public static Lazy<List<Reservation>> reservations = new Lazy<List<Reservation>>();
        public static int PageLoadFlag = 1;


        public ReservationController()
        {
            if (PageLoadFlag == 1) //use this only for first time page load
            {
                //Three product added to display the data
                reservations.Value.Add(new Reservation { Time = "16:00", Date = "2016-05-20" });
                reservations.Value.Add(new Reservation { Time = "19:00", Date = "2016-05-20" });
                reservations.Value.Add(new Reservation { Time = "12:00", Date = "2016-05-27" });
                PageLoadFlag++;
            }
        }
        
        // GET api/product
        public List <Reservation> GetAllReservations()
        {
            return reservations.Value;                  // Return all reservations
        }

        public IHttpActionResult GetReservation(string id)
        {
            Reservation reservation = reservations.Value.FirstOrDefault((r) => r.Id == id);
            if (reservation == null)
            {
                return NotFound();
            }
            return Ok(reservation);
        }

 

    }
}
