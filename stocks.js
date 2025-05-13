const apiKey = 'a3kMIm5LMARdbSHYKIaN_nWDvI_uTfYv';

async function fetchStock() {
  const ticker = document.getElementById('ticker').value.toUpperCase();
  const days = document.getElementById('range').value;
  const canvas = document.getElementById('stockChart');
  const message = document.getElementById('noDataMessage');

  if (!ticker) {
    message.textContent = "Please enter a stock ticker.";
    canvas.style.display = 'none';
    return;
  }

  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - parseInt(days));

  const formatDate = d => d.toISOString().split('T')[0];

  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${formatDate(start)}/${formatDate(end)}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("Polygon API response:", data);

    if (!data.results || data.results.length === 0) {
      message.textContent = "No stock data found. Try a different ticker.";
      canvas.style.display = 'none';
      return;
    }

    const dates = data.results.map(p => new Date(p.t).toLocaleDateString());
    const closes = data.results.map(p => p.c);

    message.textContent = '';
    canvas.style.display = 'block';

    const ctx = canvas.getContext('2d');

    if (window.myChart) window.myChart.destroy();

    window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: `${ticker} Closing Prices`,
          data: closes,
          borderColor: 'blue',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        responsive: false,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  } catch (err) {
    console.error("Fetch error:", err);
    message.textContent = "Error loading data. Check your API key or internet connection.";
    canvas.style.display = 'none';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetch('https://cors-anywhere.herokuapp.com/https://tradestie.com/api/v1/apps/reddit?date=2022-04-03')
    .then(res => res.json())
    .then(data => {
      console.log("Fetched Reddit data:", data); 

      const top5 = data.slice(0, 5);
      const tbody = document.querySelector('#redditTable tbody');

      if (!tbody) {
        console.error('Missing <tbody>!');
        return;
      }

      top5.forEach(stock => {
        console.log("Stock:", stock); 

        const row = document.createElement('tr');
        row.innerHTML = `
          <td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a></td>
          <td>${stock.no_of_comments}</td>
          <td>
            ${stock.sentiment === 'Bullish'
              ? '<img src="assets/icons/bull.png" width="25">'
              : '<img src="assets/icons/bear.png" width="25">'}
          </td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(err => {
      console.error("Reddit API fetch failed:", err);
    });
});


if (annyang) {
  annyang.addCommands({
    'lookup *stock': stock => {
      document.getElementById('ticker').value = stock.toUpperCase();
      document.getElementById('range').value = '30';
      fetchStock();
    }
  });
}
