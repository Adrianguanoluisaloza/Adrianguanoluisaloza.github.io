document.addEventListener('DOMContentLoaded', function () {
  // Resalta el enlace del menú correspondiente a la página actual
  var current = location.pathname.split('/').pop();
  if (!current) current = 'index_basico.html';
  var links = document.querySelectorAll('nav a');
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute('href') === current) {
      links[i].classList.add('active');
    }
  }

  // Manejo simple del formulario (solo alerta y reset)
  var form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Formulario enviado (demo)');
      form.reset();
    });
  }
});
