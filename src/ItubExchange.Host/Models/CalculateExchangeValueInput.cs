using System;

namespace ItubExchange.Host.Models
{
    public class CalculateExchangeValueInput
    {
        public Guid SegmentId { get; set; }
        public Guid CurrencyId { get; set; }
        public double Quantity { get; set; }
    }
}
