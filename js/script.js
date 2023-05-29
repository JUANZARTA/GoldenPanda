const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let slideIndex = 0;



// Mostrar la imagen actual
function showSlide() {
  const slides = slider.querySelectorAll('img');
  
  // Ocultar todas las imágenes
  slides.forEach((slide) => {
    slide.style.display = 'none';
  });
  
  // Mostrar la imagen actual
  slides[slideIndex].style.display = 'block';
}

// Avanzar a la siguiente imagen
function nextSlide() {
  const slides = slider.querySelectorAll('img');
  
  // Incrementar el índice de la imagen actual
  slideIndex++;
  
  // Verificar si se alcanzó el final de las imágenes y volver al principio
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  
  // Mostrar la imagen actual
  showSlide();
}

// Retroceder a la imagen anterior
function prevSlide() {
  const slides = slider.querySelectorAll('img');
  
  // Decrementar el índice de la imagen actual
  slideIndex--;
  
  // Verificar si se alcanzó el inicio de las imágenes y volver al final
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  
  // Mostrar la imagen actual
  showSlide();
}

// Event listeners para los botones de navegación
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Mostrar la primera imagen al cargar la página
showSlide();


//----------------------------------


