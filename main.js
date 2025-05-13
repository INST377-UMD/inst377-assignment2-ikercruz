if (annyang) {
    const commands = {
      'hello': () => alert('Hello World'),
      'change color to *color': (color) => {document.body.style.backgroundColor = color.trim().toLowerCase();},
      'navigate to *page': (page) => {
        const lower = page.toLowerCase();
        if (lower.includes('stock')) window.location.href = 'stocks.html';
        else if (lower.includes('dog')) window.location.href = 'dogs.html';
        else if (lower.includes('home')) window.location.href = 'index.html';
      }
    };
    annyang.addCommands(commands);
  }
  