using System;

namespace ItubExchange.Core.UseCases.Exchange
{
    public class ExchangeUseCaseInput : IUseCaseInput
    {
        public Guid SegmentId { get; set; }
        public Guid CurrencyId { get; set; }
        public double Quantity { get; set; }
    }
}
