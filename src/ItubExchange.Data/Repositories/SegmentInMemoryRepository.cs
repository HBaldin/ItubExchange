using ItubExchange.Core.Entities;
using ItubExchange.Core.Repositories;
using System;
using System.Collections.Generic;

namespace ItubExchange.Data.Repositories
{
    public class SegmentInMemoryRepository : ISegmentRepository
    {
        public List<Segment> database;

        public SegmentInMemoryRepository()
        {
            this.database = new List<Segment>()
            {
                new Segment{ Name = "Varejo", ExchangeTax = 0.05, Id = Guid.NewGuid()},
                new Segment{ Name = "Personalitte", ExchangeTax = 0.03, Id = Guid.NewGuid()},
                new Segment{ Name = "Private", ExchangeTax = 1, Id = Guid.NewGuid()}
            };
        }

        public void Create(Segment obj)
        {
            if (obj.Id == Guid.Empty)
                obj.Id = Guid.NewGuid();

            this.database.Add(obj);
        }

        public void Delete(Segment obj)
        {
            this.database.Remove(obj);
        }

        public Segment Get(Guid id)
        {
            return this.database.Find(s => s.Id == id);
        }

        public IEnumerable<Segment> GetAll()
        {
            return this.database;
        }

        public void Update(Segment obj)
        {
            var index = this.database.IndexOf(this.database.Find(c => c.Id == obj.Id));
            this.database[index] = obj;
        }
    }
}
