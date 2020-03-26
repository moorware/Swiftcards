using Microsoft.EntityFrameworkCore;
using Swiftcards.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Swiftcards.Data
{
    public class DataContext : DbContext
    {
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<CardEntity> Cards { get; set; }
        public DbSet<LinkEntity> Links { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
