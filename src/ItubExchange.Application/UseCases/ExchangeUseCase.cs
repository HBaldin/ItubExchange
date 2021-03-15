using ItubExchange.Core.Repositories;
using ItubExchange.Core.Services;
using ItubExchange.Core.UseCases.Exchange;
using Microsoft.Extensions.Logging;

namespace ItubExchange.Application.UseCases
{
    public class ExchangeUseCase : IExchangeUseCase
    {
        private readonly ILogger<ExchangeUseCase> logger;
        private readonly IExchangeService exchangeService;
        private readonly ISegmentRepository segmentRepository;
        private readonly ICurrencyRepository currencyRepository;

        public ExchangeUseCase(ILogger<ExchangeUseCase> logger,
            IExchangeService exchangeService,
            ISegmentRepository segmentRepository,
            ICurrencyRepository currencyRepository)
        {
            this.logger = logger;
            this.exchangeService = exchangeService;
            this.segmentRepository = segmentRepository;
            this.currencyRepository = currencyRepository;
        }

        public ExchangeUseCaseOutput PerformOperation(ExchangeUseCaseInput inputObject)
        {
            logger.LogInformation($"Recuperando moeda: [{inputObject.CurrencyId}]");
            var currency = currencyRepository.Get(inputObject.CurrencyId);

            logger.LogInformation($"Recuperando segmento: [{inputObject.SegmentId}]");
            var segment = segmentRepository.Get(inputObject.SegmentId);

            logger.LogInformation($"Recuperando taxa de conversão para: [{currency.Code}]");
            var exchangeRate = exchangeService.GetExchangeRate(currency.Code);

            var exchangeValue = (inputObject.Quantity * exchangeRate) * (1 + segment.ExchangeTax);

            return new ExchangeUseCaseOutput
            {
                ExchangeValue = exchangeValue
            };
        }
    }
}
