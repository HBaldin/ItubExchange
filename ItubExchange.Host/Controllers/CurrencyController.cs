using ItubExchange.Core.Entities;
using ItubExchange.Core.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace ItubExchange.Host.Controllers
{
    [Route("[controller]")]
    public class CurrencyController : Controller
    {
        private readonly ILogger<CurrencyController> logger;
        private readonly ICurrencyRepository currencyRepository;

        public CurrencyController(ILogger<CurrencyController> logger, 
            ICurrencyRepository currencyRepository)
        {
            this.logger = logger;
            this.currencyRepository = currencyRepository;
        }

        [HttpGet]
        public IEnumerable<Currency> GetCurrencies()
        {
            return currencyRepository.GetAll(); 
        }
    }
}
