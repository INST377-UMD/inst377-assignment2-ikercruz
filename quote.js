fetch('https://zenquotes.io/api/random')
  .then(res => res.json())
  .then(data => {
    document.getElementById('quote').textContent = `"${data[0].q}" — ${data[0].a}`;
  });
