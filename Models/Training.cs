using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ActivityTrackerAPI.Models
{
    public class Training
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("User")]
        public int? UserID { get; set; }

        [Required]
        public TimeSpan Time { get; set; }

        public int HeartRate { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public User User { get; set; }
    }
}
