﻿// <auto-generated />
using System;
using ActivityTrackerAPI;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ActivityTrackerAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ActivityTrackerAPI.Models.ActivityData", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int?>("Calories")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int?>("SleepTime")
                        .HasColumnType("int");

                    b.Property<int?>("Steps")
                        .HasColumnType("int");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.Property<int?>("Water")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("UserID");

                    b.ToTable("ActivityData");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.Goals", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("Calories")
                        .HasColumnType("int");

                    b.Property<int?>("Steps")
                        .HasColumnType("int");

                    b.Property<int?>("UserID")
                        .HasColumnType("int");

                    b.Property<float?>("Water")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("UserID")
                        .IsUnique()
                        .HasFilter("[UserID] IS NOT NULL");

                    b.ToTable("Goals");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.Results", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("ActivityDataID")
                        .HasColumnType("int");

                    b.Property<int?>("CaloriesScore")
                        .HasColumnType("int");

                    b.Property<int?>("Overall")
                        .HasColumnType("int");

                    b.Property<int?>("SleepScore")
                        .HasColumnType("int");

                    b.Property<int?>("StepsScore")
                        .HasColumnType("int");

                    b.Property<int?>("TotalScore")
                        .HasColumnType("int");

                    b.Property<int?>("UserID")
                        .HasColumnType("int");

                    b.Property<int?>("WaterScore")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ActivityDataID")
                        .IsUnique()
                        .HasFilter("[ActivityDataID] IS NOT NULL");

                    b.ToTable("results");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.TrackedActivities", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool?>("Calories")
                        .HasColumnType("bit");

                    b.Property<bool?>("SleepTime")
                        .HasColumnType("bit");

                    b.Property<bool?>("Steps")
                        .HasColumnType("bit");

                    b.Property<bool?>("Training")
                        .HasColumnType("bit");

                    b.Property<bool?>("Water")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("TrackedActivities");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.Training", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("HeartRate")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("Time")
                        .HasColumnType("time");

                    b.Property<int?>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("UserID");

                    b.ToTable("Trainings");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.User", b =>
                {
                    b.Property<int>("userID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("userID"));

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("VerificationToken")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("age")
                        .HasColumnType("int");

                    b.Property<string>("city")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("gender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isVerified")
                        .HasColumnType("bit");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("surname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("userConfigID")
                        .HasColumnType("int");

                    b.Property<string>("username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("userID");

                    b.HasIndex("userConfigID")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.UserConfig", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Fitness")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float?>("Height")
                        .HasColumnType("real");

                    b.Property<int?>("TrackedActivitiesID")
                        .HasColumnType("int");

                    b.Property<float?>("Weight")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("TrackedActivitiesID")
                        .IsUnique()
                        .HasFilter("[TrackedActivitiesID] IS NOT NULL");

                    b.ToTable("userConfigs");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.UserLevel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Experience")
                        .HasColumnType("int");

                    b.Property<int>("Level")
                        .HasColumnType("int");

                    b.Property<int>("NextLevelExperience")
                        .HasColumnType("int");

                    b.Property<int>("TotalExperience")
                        .HasColumnType("int");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserID")
                        .IsUnique();

                    b.ToTable("UserLevels");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.ActivityData", b =>
                {
                    b.HasOne("ActivityTrackerAPI.Models.User", "User")
                        .WithMany("ActivityData")
                        .HasForeignKey("UserID");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.Goals", b =>
                {
                    b.HasOne("ActivityTrackerAPI.Models.User", "User")
                        .WithOne("Goals")
                        .HasForeignKey("ActivityTrackerAPI.Models.Goals", "UserID");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.Results", b =>
                {
                    b.HasOne("ActivityTrackerAPI.Models.ActivityData", "ActivityData")
                        .WithOne("Results")
                        .HasForeignKey("ActivityTrackerAPI.Models.Results", "ActivityDataID");

                    b.Navigation("ActivityData");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.Training", b =>
                {
                    b.HasOne("ActivityTrackerAPI.Models.User", "User")
                        .WithMany("Training")
                        .HasForeignKey("UserID");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.User", b =>
                {
                    b.HasOne("ActivityTrackerAPI.Models.UserConfig", "UserConfig")
                        .WithOne("User")
                        .HasForeignKey("ActivityTrackerAPI.Models.User", "userConfigID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("UserConfig");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.UserConfig", b =>
                {
                    b.HasOne("ActivityTrackerAPI.Models.TrackedActivities", "TrackedActivities")
                        .WithOne("UserConfig")
                        .HasForeignKey("ActivityTrackerAPI.Models.UserConfig", "TrackedActivitiesID");

                    b.Navigation("TrackedActivities");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.UserLevel", b =>
                {
                    b.HasOne("ActivityTrackerAPI.Models.User", "User")
                        .WithOne("UserLevel")
                        .HasForeignKey("ActivityTrackerAPI.Models.UserLevel", "UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.ActivityData", b =>
                {
                    b.Navigation("Results");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.TrackedActivities", b =>
                {
                    b.Navigation("UserConfig");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.User", b =>
                {
                    b.Navigation("ActivityData");

                    b.Navigation("Goals");

                    b.Navigation("Training");

                    b.Navigation("UserLevel");
                });

            modelBuilder.Entity("ActivityTrackerAPI.Models.UserConfig", b =>
                {
                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}
