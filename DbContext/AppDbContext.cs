using ActivityTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ActivityTrackerAPI
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<ActivityData> ActivityData { get; set; }
        public DbSet<Training> Trainings { get; set; }
        public DbSet<UserConfig> userConfigs { get; set; }

        public DbSet<TrackedActivities> TrackedActivities { get; set; }
        public DbSet<Goals> goals { get; set; }
        public DbSet<Models.Results> results { get; set; }
        public DbSet<UserLevel> UserLevels { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<ActivityData>()
                .HasOne(a => a.User)
                .WithMany(u => u.ActivityData)
                .HasForeignKey(a => a.UserID)
                .IsRequired(false);

            modelBuilder.Entity<Training>()
                .HasOne(t => t.User)
                .WithMany(u => u.Training)
                .HasForeignKey(t => t.UserID)
                .IsRequired(false);

            modelBuilder.Entity<User>()
                .HasOne(u => u.UserConfig)
                .WithOne(uc => uc.User)
                .HasForeignKey<User>(u => u.userConfigID);

            modelBuilder.Entity<UserConfig>()
                .HasOne(a => a.TrackedActivities)
                .WithOne(u => u.UserConfig)
                .HasForeignKey<UserConfig>(t => t.TrackedActivitiesID);

            modelBuilder.Entity<Goals>()
                .HasOne(g => g.User)
                .WithOne(u => u.Goals)
                .HasForeignKey<Goals>(g => g.UserID);

            modelBuilder.Entity<Models.Results>()
                .HasOne(r => r.ActivityData)
                .WithOne(u => u.Results)
                .HasForeignKey<Models.Results>(r => r.ActivityDataID);

            modelBuilder.Entity<UserLevel>()
                .HasOne(l => l.User)
                .WithOne(u => u.UserLevel)
                .HasForeignKey<UserLevel>(l => l.UserID);
        }
        public DbSet<ActivityTrackerAPI.Models.Goals> Goals { get; set; } = default!;
    }
}
