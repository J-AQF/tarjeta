
// Obtener referencias a los elementos del DOM
const nombreInput = document.getElementById('nombre');
const cargoInput = document.getElementById('cargo');
const colorInput = document.getElementById('colorFavorito');
const imagenInput = document.getElementById('imagen');
const btnGenerar = document.getElementById('generar');

// Elementos de la vista previa
const previewNombre = document.getElementById('previewNombre');
const previewCargo = document.getElementById('previewCargo');
const tarjetaPreview = document.getElementById('tarjetaPreview');
const previewImagen = document.getElementById('previewImagen');

// Contenedor de la galería
const galeriaContainer = document.getElementById('galeriaContainer');

// ACTUALIZACIÓN EN TIEMPO REAL 
nombreInput.addEventListener('input', function() {
    previewNombre.textContent = nombreInput.value || 'Nombre'; 
});

cargoInput.addEventListener('input', function() {
    previewCargo.textContent = cargoInput.value || 'Cargo';
});

// CAMBIO DE COLOR 
colorInput.addEventListener('input', function() {
    tarjetaPreview.style.backgroundColor = colorInput.value;
});

//  MANEJO DE IMAGEN 
imagenInput.addEventListener('change', function(event) {
    const file = event.target.files[0]; 
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImagen.src = e.target.result;
            previewImagen.style.display = 'block';
        };
        reader.readAsDataURL(file); 
    } else {
        previewImagen.style.display = 'none';
        previewImagen.src = '#';
    }
});

// --- guardar en galería y limpiar formulario ---
btnGenerar.addEventListener('click', function() {
    const nombre = previewNombre.textContent;
    const cargo = previewCargo.textContent;
    const colorFondo = tarjetaPreview.style.backgroundColor || colorInput.value;
    const imagenSrc = previewImagen.src; 

    // Crear una nueva tarjeta para la galería
    const nuevaTarjeta = document.createElement('div');
    nuevaTarjeta.className = 'tarjeta-galeria';
    nuevaTarjeta.style.backgroundColor = colorFondo;

    // Estructura interna de la tarjeta 
    nuevaTarjeta.innerHTML = `
        <div class="avatar">
            <img src="${imagenSrc}" alt="Avatar" style="${imagenSrc === '#' ? 'display: none;' : 'display: block;'}">
        </div>
        <h4>${nombre}</h4>
        <p>${cargo}</p>
    `;

    // Agregar la tarjeta a la galería
    galeriaContainer.appendChild(nuevaTarjeta);

    // Textos
    nombreInput.value = '';
    cargoInput.value = '';
    previewNombre.textContent = 'Nombre';
    previewCargo.textContent = 'Cargo';

    // Color: restablecer al valor por defecto #ffcc00)
    colorInput.value = '#ffcc00';
    tarjetaPreview.style.backgroundColor = '#ffcc00';

    // Imagen: limpiar input file y ocultar imagen en preview
    imagenInput.value = ''; // resetear el input file
    previewImagen.src = '#';
    previewImagen.style.display = 'none';
});
