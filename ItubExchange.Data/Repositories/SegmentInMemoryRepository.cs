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
                new Segment{ Name = "Varejo", ExchangeRate = 0.5M, Id = Guid.NewGuid()},
                new Segment{ Name = "Personalitte", ExchangeRate = 0.3M, Id = Guid.NewGuid()},
                new Segment{ Name = "Private", ExchangeRate = 0.1M, Id = Guid.NewGuid()}
            };
        }

        public void Create(Segment obj)
        {
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
