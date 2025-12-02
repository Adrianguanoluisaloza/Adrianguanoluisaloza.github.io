document.addEventListener('DOMContentLoaded', function () {
  // Resaltar el enlace activo del menú según la página actual
  var current = location.pathname.split('/').pop() || 'index_luz_de_esmeraldas.html';
  var links = document.querySelectorAll('nav a');
  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute('href');
    if (href === current) {
      links[i].classList.add('active');
    } else {
      links[i].classList.remove('active');
    }
  }

  // Manejo básico del formulario de contacto (sin recargar la página)
  var form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('¡Mensaje enviado correctamente! (Simulación)');
      form.reset();
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('nav a');
  let current = location.pathname.split('/').pop();
  if (!current) current = 'index_luz_de_esmeraldas.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current) {
      link.classList.add('active');
    }
  });
});
