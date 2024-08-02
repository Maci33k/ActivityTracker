using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ActivityTrackerAPI.Models
{
    public class ActivityData
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }

        public int? Steps { get; set; }

        public int? Calories { get; set; }

        public int? Water { get; set; }

        public int? SleepTime { get; set; }

        public User? User { get; set; }
        public Results? Results { get; set; }
    }
}
