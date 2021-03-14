using ItubExchange.Core.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ItubExchange.Host.Controllers
{
    [Route("[controller]")]
    public class ExchangeController : Controller
    {
        private readonly ILogger<ExchangeController> logger;
        private readonly IExchangeService exchangeService;

        public ExchangeController(ILogger<ExchangeController> logger,
            IExchangeService exchangeService)
        {
            this.logger = logger;
            this.exchangeService = exchangeService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}
