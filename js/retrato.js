// Obtener la lista de archivos de la carpeta "Imagenes Renderizadas"
fetch("https://api.github.com/repos/JUANZARTA/Arte/contents/retratos")
  .then(response => response.json())
  .then(data => {
    const imageFiles = data.filter(item => item.type === "file" && item.name.match(/\.(jpg|jpeg|png|gif|tif)$/));
    const imageUrls = imageFiles.map(item => item.download_url);

    // Generar los elementos <img> para cada imagen y agregarlos al slider
    imageUrls.forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      img.alt = "Foto";
      slider.appendChild(img);
    });

    // Mostrar la primera imagen al cargar la página
    showSlide();
  })
  .catch(error => console.error(error));