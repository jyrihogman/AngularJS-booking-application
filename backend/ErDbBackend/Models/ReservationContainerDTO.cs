using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ErDbBackend.Models
{
    public class ReservationContainerDTO
    {
        public string Date { get; set; }
        public IEnumerable<ReservationDTO> Reservations { get; set; }
    }
}