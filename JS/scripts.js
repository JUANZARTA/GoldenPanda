document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.carousel');
    let counter = 0;

    function showImage() {
        images.forEach((image, index) => {
            if (index === counter) {
                image.style.opacity = '1';
            } else {
                image.style.opacity = '0';
            }
        });

        setTimeout(() => {
            if (counter >= images.length - 1) {
                counter = 0;
            } else {
                counter++;
            }
            showImage();
        }, 6000); 
    }

    showImage();
});

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav ul li a");
    links.forEach(link => {
        link.addEventListener("click", () => {
            const checkBox = document.getElementById("check");
            checkBox.checked = false;
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var dropdownParents = document.querySelectorAll('.dropdown-parent');

    // Itera sobre cada elemento li
    dropdownParents.forEach(function (parent) {
        // Agrega un evento clic a cada elemento li
        parent.addEventListener('click', function (e) {
            e.preventDefault();

            // Encuentra el submenú dentro del elemento li actual
            var submenu = parent.querySelector('.dropdown-content');

            // Alternar la visibilidad del submenú
            if (submenu.style.display === 'block') {
                submenu.style.display = 'none';
            } else {
                submenu.style.display = 'block';
            }
        });
    });

    // ... (otro código) ...
});

