﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Sales.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class SalesEntities : DbContext
    {
        public SalesEntities()
            : base("name=SalesEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<DealCurrentStatus> DealCurrentStatuses { get; set; }
        public DbSet<DealOpportunityStatus> DealOpportunityStatuses { get; set; }
        public DbSet<DealOpportunityType> DealOpportunityTypes { get; set; }
        public DbSet<DealRegion> DealRegions { get; set; }
        public DbSet<Deal> Deals { get; set; }
        public DbSet<DealVertical> DealVerticals { get; set; }
        public DbSet<DeliveryAnchor> DeliveryAnchors { get; set; }
        public DbSet<DeliveryLead> DeliveryLeads { get; set; }
        public DbSet<FarmingAnchor> FarmingAnchors { get; set; }
        public DbSet<Practis> Practises { get; set; }
        public DbSet<VLDNAnchor> VLDNAnchors { get; set; }
    }
}
