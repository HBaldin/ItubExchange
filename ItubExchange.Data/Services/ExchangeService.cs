using ItubExchange.Core.Services;
using Microsoft.Extensions.Logging;
using RestSharp;

namespace ItubExchange.Data.Services
{
    public class ExchangeService : IExchangeService
    {
        private readonly ILogger<ExchangeService> logger;

        public ExchangeService(ILogger<ExchangeService> logger)
        {
            this.logger = logger;
        }

        public double GetExchangeRate(string currencyCode)
        {
            RestClient client = new RestClient("https://api.exchangeratesapi.io/");
            RestRequest request = new RestRequest("latest", Method.GET);
            request.AddParameter("base", "BRL");
            request.AddParameter("symbols", currencyCode);

            var response = client.Execute<dynamic>(request);

            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var rate = response.Data["rates"][currencyCode];
                return (double)rate;
            }
            else
                throw new System.Exception(response.ErrorMessage);
        }
    }
}
