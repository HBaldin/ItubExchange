using System;

namespace ItubExchange.Core.Entities
{
    public class Segment
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double ExchangeTax { get; set; }
    }
}
