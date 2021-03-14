using ItubExchange.Core.Entities;
using ItubExchange.Core.Repositories;
using ItubExchange.Core.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace ItubExchange.Host.Controllers
{
    [Route("[controller]")]
    public class CurrencyController : Controller
    {
        private readonly ILogger<CurrencyController> logger;
        private readonly ICurrencyRepository currencyRepository;
        private readonly IExchangeService exchangeService;

        public CurrencyController(ILogger<CurrencyController> logger,
            ICurrencyRepository currencyRepository,
            IExchangeService exchangeService)
        {
            this.logger = logger;
            this.currencyRepository = currencyRepository;
            this.exchangeService = exchangeService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(currencyRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post([FromBody] Currency currency)
        {
            try
            {
                //Valida se essa moeda existe
                var exchangeRate = exchangeService.GetExchangeRate(currency.Code);
                this.currencyRepository.Create(currency);
                return Created("", currency);
            }
            catch (Exception ex)
            {
                return BadRequest($"Moeda de código {currency.Code} não foi encontrada!");
            }
        }

        [HttpPatch]
        public IActionResult Patch([FromBody] Currency currency)
        {
            this.currencyRepository.Update(currency);
            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete(Guid id)
        {
            var currency = currencyRepository.Get(id);
            currencyRepository.Delete(currency);
            return Ok();
        }
    }
}
