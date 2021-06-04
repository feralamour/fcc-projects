# [Stock Price Checker](https://freecodecamp.org/learn/information-security/information-security-projects/stock-price-checker)

## Notes
Additional module: mongoose

Breakdown:
- Pull data from proxy server
- Check database for likes
  - If liked, check for existing IP
  - Add IP if not found, increment likes
- If multiple, replace `likes` with `rel_likes`

**HINT:** Only 1 like per IP should be accepted.

**Security:** set content security policies to only allow loading of scripts and CSS from your server

Stock Checker Proxy Server:
- Usage: GET https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/[symbol]/quote
- Where: symbol = msft | goog | aapl | ...

Tasks:
- Complete the project in [/routes/api.js](#routes/api.js) or by creating a handler/controller
- You will add any security features to [server.js](#server.js)
- Create all of the functional tests in [tests/2_functional-tests.js](#tests/2_functional-tests.js)
- Copy the [sample.env](#sample.env) file to [Secrets]() and set `NODE_ENV=test` and `DB`

Query parameter: `stock`
Response object: `stockData`

`StockData` Response fields:
- stock (string) - `"symbol":"GOOG"`
- price (integer) - `"latestPrice":2411.56`
- likes (integer) - `"likes": 3`
- rel_likes (integer, difference between likes on both stocks)


Example single stock response:
`{"stockData":{"stock":"GOOG","price":786.90,"likes":1}}`

Example multi-stock response:
`{"stockData":[{"stock":"MSFT","price":62.30,"rel_likes":-1},{"stock":"GOOG","price":786.90,"rel_likes":1}]}`

Example bad stock response:
`{"stockData":{"error":"external source error","likes":0}}`

Proxy Server Response: `{"symbol":"GOOG","companyName":"Alphabet Inc - Class C","primaryExchange":"NASDAQ/NGS (GLOBAL SELECT MARKET)","calculationPrice":"previousclose","open":null,"openTime":null,"openSource":"official","close":null,"closeTime":null,"closeSource":"official","high":null,"highTime":null,"highSource":null,"low":null,"lowTime":null,"lowSource":null,"latestPrice":2411.56,"latestSource":"Previous close","latestTime":"May 28, 2021","latestUpdate":1622174400000,"latestVolume":null,"iexRealtimePrice":null,"iexRealtimeSize":null,"iexLastUpdated":null,"delayedPrice":null,"delayedPriceTime":null,"oddLotDelayedPrice":null,"oddLotDelayedPriceTime":null,"extendedPrice":null,"extendedChange":null,"extendedChangePercent":null,"extendedPriceTime":null,"previousClose":2411.56,"previousVolume":1205382,"change":0,"changePercent":0,"volume":null,"iexMarketPercent":null,"iexVolume":null,"avgTotalVolume":1272820,"iexBidPrice":null,"iexBidSize":null,"iexAskPrice":null,"iexAskSize":null,"iexOpen":2409.02,"iexOpenTime":1622231988518,"iexClose":2411.52,"iexCloseTime":1622231999446,"marketCap":1628215396052,"peRatio":null,"week52High":2452.38,"week52Low":1347.01,"ytdChange":0.3765554718359705,"lastTradeTime":1622231999600,"isUSMarketOpen":false}`

## Testing
Write the following tests in [tests/2_functional-tests.js](#tests/2_functional-tests.js):

- Viewing one stock: GET request to [/api/stock-prices/]()
- Viewing one stock and liking it: GET request to [/api/stock-prices/]()
- Viewing the same stock and liking it again: GET request to [/api/stock-prices/]()
- Viewing two stocks: GET request to [/api/stock-prices/]()
- Viewing two stocks and liking them: GET request to [/api/stock-prices/]()

## User stories
You should set the content security policies to only allow loading of scripts and CSS from your server.

You can send a GET request to /api/stock-prices, passing a NASDAQ stock symbol to a stock query parameter. The returned object will contain a property named stockData.

The stockData property includes the stock symbol as a string, the price as a number, and likes as a number.

You can also pass along a like field as true (boolean) to have your like added to the stock(s). Only 1 like per IP should be accepted.

If you pass along 2 stocks, the returned value will be an array with information about both stocks. Instead of likes, it will display rel_likes (the difference between the likes on both stocks) for both stockData objects.

All 5 functional tests are complete and passing.