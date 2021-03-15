namespace ItubExchange.Core.UseCases
{
    public interface IUseCase<TInput, TOutput>
        where TInput : IUseCaseInput
        where TOutput : IUseCaseOutput
    {
        TOutput PerformOperation(TInput inputObject);
    }
}
