#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["ItubExchange.Host/ItubExchange.Host.csproj", "ItubExchange.Host/"]
COPY ["ItubExchange.Core/ItubExchange.Core.csproj", "ItubExchange.Core/"]
COPY ["ItubExchange.Data/ItubExchange.Data.csproj", "ItubExchange.Data/"]
RUN dotnet restore "ItubExchange.Host/ItubExchange.Host.csproj"
COPY . .
WORKDIR "/src/ItubExchange.Host"
RUN dotnet build "ItubExchange.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ItubExchange.Host.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ItubExchange.Host.dll"]