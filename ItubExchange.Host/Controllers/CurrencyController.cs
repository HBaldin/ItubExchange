using ItubExchange.Core.Entities;
using ItubExchange.Core.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
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

        [HttpPost]
        public void AddCurrency(Currency currency)
        {
            this.currencyRepository.Create(currency);
        }

        [HttpPatch]
        public void UpdateCurrency(Currency currency)
        {
            this.currencyRepository.Update(currency);
        }

        [HttpDelete]
        public void DeleteCurrency(Guid id)
        {
            var currency = currencyRepository.Get(id);
            currencyRepository.Delete(currency);
        }
    }
}
