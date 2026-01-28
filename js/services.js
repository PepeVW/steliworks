$(document).ready(function () {

  /* ===========================
     HERO CAROUSEL INIT
     =========================== */
  const $carousel = $('.hero-carousel');
  const $swipeHint = $('.swipe-hint');

  $carousel.owlCarousel({
    loop: true,
    items: 1,
    nav: true,              // Pijlen actief (CSS verbergt mobiel)
    dots: false,
    autoplay: false,        // GEEN autoplay
    smartSpeed: 600,
    navText: [
      '<i class="bx bx-chevron-left"></i>',
      '<i class="bx bx-chevron-right"></i>'
    ]
  });

  /* ===========================
     SWIPE-HINT VERBERGEN NA EERSTE INTERACTIE
     =========================== */
  let swipeUsed = false;

  function hideSwipeHint() {
    if (!swipeUsed && $swipeHint.length) {
      swipeUsed = true;
      $swipeHint.fadeOut(300, function () {
        $(this).remove();
      });
    }
  }

  // Trigger bij swipe/drag/tap
  $carousel.on('drag.owl.carousel', hideSwipeHint);
  $carousel.on('touchstart', hideSwipeHint);
  $carousel.on('touchend', hideSwipeHint);

  /* ===========================
     DIENSTEN SECTIE ANIMATIES
     =========================== */
  // Gebruik IntersectionObserver voor performance-friendly scroll animatie
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeUp 1s ease forwards";
        observer.unobserve(entry.target); // stop observer voor deze card
      }
    });
  }, { threshold: 0.2 }); // 20% zichtbaar triggers animatie

  // Selecteer alle dienst cards
  document.querySelectorAll('.dienst-card').forEach(card => {
    card.style.opacity = 0; // begin onzichtbaar
    observer.observe(card);  // observe scroll
  });

});