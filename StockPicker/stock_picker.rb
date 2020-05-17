def stock_picker(stock_prices)
  # Iterate over (buy price, buy day) pair and return
  # (best buy day, best sell day) pair
  stock_prices.each_with_index.reduce([0, 1]) do |best, buy|
    buy_price, buy_day = buy

    # Iterate over (sell price, sell day) pair and return
    # (best buy day, best sell day) pair
    stock_prices.each_with_index.reduce(best) do |best, sell|
      best_buy_day, best_sell_day = best
      sell_price, sell_day = sell

      profit = sell_price - buy_price
      best_profit = stock_prices[best_sell_day] - stock_prices[best_buy_day]

      # If sell day is after buy day (you can't sell what you
      # didn't buy yet...) and profit at the current buy and
      # sell days is higher than profit at best buy and sell
      # days, update the latter with the current buy and sell
      # days
      if (sell_day > buy_day) && (profit > best_profit)
        [buy_day, sell_day]
      else
        best
      end
    end
  end
end

stock_prices = [17, 3, 6, 9, 15, 8, 6, 1, 10]

best_buy_day, best_sell_day = stock_picker(stock_prices)

best_buy_price = stock_prices[best_buy_day]
best_sell_price = stock_prices[best_sell_day]
profit = best_sell_price - best_buy_price

puts "You will maximize profit (#{profit} €) if you buy on " \
  "day #{best_buy_day} (#{best_buy_price} €) and sell on day " \
  "#{best_sell_day} (#{best_sell_price} €)."