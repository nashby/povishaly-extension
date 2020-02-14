const formatPrices = function(pricesJson) {
  var str = '\n'

  var formatter = new Intl.NumberFormat('RU', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  pricesJson.forEach(price => {
    var date = new Date(price['modified_at']).toLocaleDateString('RU');
    var price = formatter.format(price['price_usd']);

    str += `${date}: ${price}\n`;
  })

  return str;
}

const addOldPrices = function() {
  const urlParts = window.location.href.split('/');
  const onlinerId = urlParts[urlParts.length - 1];

  fetch(`https://povishaly.space/appartments/${onlinerId}`)
    .then((response) => {
      return response.json();
    })
    .then((prices) => {
      if (prices && prices.length > 1) {
        var pricesHTML = document.querySelector('.apartment-bar__price-value_complementary');
        pricesHTML.innerHTML += formatPrices(prices);

        // fix css issues after adding new content
        var rightPart = document.querySelector('.apartment-bar__part_right');
        var pricePart = document.querySelector('.apartment-bar__item_price');
        rightPart.style.height = `${pricePart.offsetHeight}px`;
      }
    });
}

addOldPrices();
