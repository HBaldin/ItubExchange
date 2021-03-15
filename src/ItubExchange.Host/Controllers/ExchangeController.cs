using ItubExchange.Core.UseCases.Exchange;
using ItubExchange.Host.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ItubExchange.Host.Controllers
{
    [Route("[controller]")]
    public class ExchangeController : Controller
    {
        private readonly ILogger<ExchangeController> logger;
        private readonly IExchangeUseCase exchangeUseCase;

        public ExchangeController(ILogger<ExchangeController> logger,
            IExchangeUseCase exchangeUseCase)
        {
            this.logger = logger;
            this.exchangeUseCase = exchangeUseCase;
        }

        [HttpPost("CalculateExchangeValue")]
        public IActionResult CalculateExchangeValue([FromBody] CalculateExchangeValueInput input)
        {
            var useCaseInput = new ExchangeUseCaseInput
            {
                CurrencyId = input.CurrencyId,
                SegmentId = input.SegmentId,
                Quantity = input.Quantity
            };

            var useCaseOutput = this.exchangeUseCase.PerformOperation(useCaseInput);

            return Ok(useCaseOutput.ExchangeValue);
        }
    }
}
