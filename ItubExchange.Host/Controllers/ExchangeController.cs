using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ItubExchange.Host.Controllers
{
    [Route("[controller]")]
    public class ExchangeController : Controller
    {
        private readonly ILogger<ExchangeController> logger;

        public ExchangeController(ILogger<ExchangeController> logger)
        {
            this.logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
