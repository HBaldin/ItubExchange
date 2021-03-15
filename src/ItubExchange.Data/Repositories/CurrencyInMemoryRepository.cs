using ItubExchange.Core.Entities;
using ItubExchange.Core.Repositories;
using System;
using System.Collections.Generic;

namespace ItubExchange.Data.Repositories
{
    public class CurrencyInMemoryRepository : ICurrencyRepository
    {
        private List<Currency> database;

        public CurrencyInMemoryRepository()
        {
            database = new List<Currency>()
            {
                new Currency{Name = "Dólar", Code = "USD", Id = Guid.NewGuid()},
                new Currency{Name = "Euro", Code = "EUR", Id = Guid.NewGuid()}
            };
        }

        public void Create(Currency obj)
        {
            if (obj.Id == Guid.Empty)
                obj.Id = Guid.NewGuid();
            this.database.Add(obj);
        }

        public void Delete(Currency obj)
        {
            this.database.Remove(obj);
        }

        public Currency Get(Guid id)
        {
            return this.database.Find(c => c.Id == id);
        }

        public IEnumerable<Currency> GetAll()
        {
            return this.database;
        }

        public void Update(Currency obj)
        {
            var index = this.database.IndexOf(this.database.Find(c => c.Id == obj.Id));
            this.database[index] = obj;
        }
    }
}
