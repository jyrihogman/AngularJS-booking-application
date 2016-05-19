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
    public class ReservedController : ApiController
    {
        public static int PageLoadFlag = 1;
        public static Lazy<List<Reserved>> reserveds = new Lazy<List<Reserved>>();

        public ReservedController()
        {
            if (PageLoadFlag == 1) //use this only for first time page load
            {
                //Three product added to display the data
                reserveds.Value.Add(new Reserved { Time = "16:00", Date = "2016-05-20" });
                reserveds.Value.Add(new Reserved { Time = "19:00", Date = "2016-05-20" });
                reserveds.Value.Add(new Reserved{ Time = "12:00", Date = "2016-05-27" });
                PageLoadFlag++;
            }
        }

        public void ReservedAdd(Reserved reserved)
        {
            reserved.Id = reserved.Time + reserved.Date;
            reserveds.Value.Add(reserved);
        }

        public List<Reserved> GetAllReserved()
        {
            return reserveds.Value;
        }
    }
}
