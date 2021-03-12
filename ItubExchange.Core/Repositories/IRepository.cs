using System;
using System.Collections.Generic;

namespace ItubExchange.Core.Repositories
{
    public interface IRepository<T>
    {
        void Create(T obj);
        T Get(Guid id);
        IEnumerable<T> GetAll();
        void Update(T obj);
        void Delete(T obj);
    }
}
