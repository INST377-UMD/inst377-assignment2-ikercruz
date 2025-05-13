document.addEventListener("DOMContentLoaded", () => {
    fetch('https://dog.ceo/api/breeds/image/random/10')
      .then(res => res.json())
      .then(data => {
        const carousel = document.getElementById('carousel');
        data.message.forEach(img => {
          const slide = document.createElement('div');
          slide.innerHTML = `<img src="${img}" class="carousel-img">`;
          carousel.appendChild(slide);
        });
        setTimeout(() => {
          new SimpleSlider('#carousel');
        }, 100);
      });
  });
  

fetch('https://dogapi.dog/api/v2/breeds')
  .then(res => res.json())
  .then(data => {
    const breedButtons = document.getElementById('breed-buttons');
    data.data.forEach(breed => {
      const btn = document.createElement('button');
      btn.className = 'custom-btn';
      btn.textContent = breed.attributes.name;
      btn.setAttribute('data-id', breed.id);
      btn.onclick = () => showBreedInfo(breed.id);
      breedButtons.appendChild(btn);
    });
  });

function showBreedInfo(id) {
  fetch(`https://dogapi.dog/api/v2/breeds/${id}`)
    .then(res => res.json())
    .then(data => {
      const attr = data.data.attributes;
      const container = document.getElementById('breed-info');
      container.innerHTML = `
        <h3>${attr.name}</h3>
        <p><strong>Description:</strong> ${attr.description}</p>
        <p><strong>Min Life:</strong> ${attr.life.min} years</p>
        <p><strong>Max Life:</strong> ${attr.life.max} years</p>
      `;
      container.style.display = 'block';
    });
}

if (annyang) {
  annyang.addCommands({
    'load dog breed *breed': breed => {
      const buttons = document.querySelectorAll('#breed-buttons button');
      for (const btn of buttons) {
        if (btn.textContent.toLowerCase() === breed.toLowerCase()) {
          btn.click();
          break;
        }
      }
    }
  });
}
