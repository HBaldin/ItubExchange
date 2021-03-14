using ItubExchange.Core.Repositories;
using ItubExchange.Core.Services;
using ItubExchange.Host.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ItubExchange.Host.Controllers
{
    [Route("[controller]")]
    public class ExchangeController : Controller
    {
        private readonly ILogger<ExchangeController> logger;
        private readonly IExchangeService exchangeService;
        private readonly ISegmentRepository segmentRepository;
        private readonly ICurrencyRepository currencyRepository;

        public ExchangeController(ILogger<ExchangeController> logger,
            IExchangeService exchangeService,
            ISegmentRepository segmentRepository,
            ICurrencyRepository currencyRepository)
        {
            this.logger = logger;
            this.exchangeService = exchangeService;
            this.segmentRepository = segmentRepository;
            this.currencyRepository = currencyRepository;
        }

        [HttpPost("CalculateExchangeValue")]
        public IActionResult CalculateExchangeValue([FromBody] CalculateExchangeValueInput input)
        {
            logger.LogInformation($"Recebido pedido de cotação: \nQuantidade:{input.Quantity} \nSegmento:{input.SegmentId} \nMoeda:{input.CurrencyId} ");
            var currency = currencyRepository.Get(input.CurrencyId);
            var segment = segmentRepository.Get(input.SegmentId);

            var exchangeRate = exchangeService.GetExchangeRate(currency.Code);

            var exchangeValue = (input.Quantity * exchangeRate) * (1 + segment.ExchangeTax);

            return Ok(exchangeValue);
        }
    }
}
