(function ($) {
    "use strict";
    
    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Typed Initiate
    if ($('.hero .hero-text h2').length == 1) {
        var typed_strings = $('.hero .hero-text .typed-text').text();
        var typed = new Typed('.hero .hero-text h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            }
        }
    });
    
    
    
    // Portfolio filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);

// Obtener el formulario por su ID
var form = document.getElementById("contactForm");

// Agregar un evento de escucha para cuando se envíe el formulario
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Evitar el envío del formulario por defecto

  // Obtener los valores de los campos del formulario
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Crear un objeto FormData y agregar los valores del formulario
  var formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("message", message);

  // Crear una solicitud AJAX
  var xhr = new XMLHttpRequest();

  // Establecer la URL del formulario de destino y el método de envío
  xhr.open("POST", "https://formspree.io/f/mlekkanz");

  // Agregar un encabezado para indicar que se espera una respuesta JSON
  xhr.setRequestHeader("Accept", "application/json");

  // Enviar la solicitud con los datos del formulario
  xhr.send(formData);

  // Función de callback para manejar la respuesta
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // La solicitud se completó con éxito
        var successMessage = document.getElementById("success");
        successMessage.innerHTML = "<div class='alert alert-success'>" +
          "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
          "<strong>Your message has been sent.</strong>" +
          "</div>";
        form.reset(); // Restablecer el formulario
      } else {
        // Hubo un error al enviar el formulario
        var errorMessage = document.getElementById("success");
        errorMessage.innerHTML = "<div class='alert alert-danger'>" +
          "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
          "<strong>Sorry " + name + ", it seems that our mail server is not responding. Please try again later!</strong>" +
          "</div>";
      }
    }
  };
});
