// Tabs functionaliteit
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Automatisch nummers toevoegen aan GLightbox
const galleries = document.querySelectorAll('.gallery');

galleries.forEach(gallery => {
    const images = gallery.querySelectorAll('a.glightbox');
    const total = images.length;

    images.forEach((img, index) => {
        img.setAttribute('data-title', `Foto ${index + 1} van ${total}`);
    });
});

// GLightbox initialisatie: alleen sluiten via kruisje
const lightbox = GLightbox({
    selector: '.glightbox',
    loop: true,
    zoomable: true,
    slideEffect: 'fade',
    closeOnOutsideClick: false, // NIET sluiten bij klik buiten
    closeOnEsc: false           // NIET sluiten bij Escape toets (optioneel)
});