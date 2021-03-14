namespace ItubExchange.Core.Services
{
    public interface IExchangeService
    {
        double GetExchangeRate(string currencyCode);
    }
}
