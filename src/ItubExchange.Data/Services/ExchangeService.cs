using ItubExchange.Core.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RestSharp;

namespace ItubExchange.Data.Services
{
    public class ExchangeService : IExchangeService
    {
        private readonly ILogger<ExchangeService> logger;
        private readonly IConfiguration configuration;

        public ExchangeService(ILogger<ExchangeService> logger, IConfiguration configuration)
        {
            this.logger = logger;
            this.configuration = configuration;
        }

        public double GetExchangeRate(string currencyCode)
        {
            logger.LogInformation($"Consultando ExchangeRate para [{currencyCode}]");

            RestClient client = new RestClient(configuration["ExchangeAPI:URL"]);
            RestRequest request = new RestRequest("latest", Method.GET);
            request.AddParameter("base", currencyCode);
            request.AddParameter("symbols", "BRL");

            var response = client.Execute<dynamic>(request);

            logger.LogInformation($"Response status code: {response.StatusCode}");

            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var rate = response.Data["rates"]["BRL"];
                return (double)rate;
            }
            else
                throw new System.Exception(response.Content);
        }
    }
}
