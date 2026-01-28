document.addEventListener('DOMContentLoaded', () => {

  const fileInput = document.getElementById('Bestanden');
  const trigger   = document.getElementById('fileTrigger');
  const label     = document.getElementById('fileLabel');
  const preview   = document.getElementById('preview');
  const dropzone  = document.getElementById('dropzone');

  let filesArray = [];

  /* ===== OPEN FILE SELECT ===== */
  trigger.addEventListener('click', () => fileInput.click());

  /* ===== FILE SELECT ===== */
  fileInput.addEventListener('change', e => {
    filesArray = [];
    handleFiles(e.target.files);
  });

  /* ===== DRAG & DROP – CRUCIAAL ===== */
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
    dropzone.addEventListener(event, e => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  dropzone.addEventListener('dragenter', () =>
    dropzone.classList.add('dragover')
  );

  dropzone.addEventListener('dragleave', () =>
    dropzone.classList.remove('dragover')
  );

  dropzone.addEventListener('drop', e => {
    dropzone.classList.remove('dragover');
    filesArray = [];
    handleFiles(e.dataTransfer.files);
  });

  /* ===== HANDLE FILES ===== */
  function handleFiles(fileList) {
    Array.from(fileList).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      filesArray.push(file);
    });

    syncInput();
    renderPreview();
  }

  /* ===== SYNC INPUT ===== */
  function syncInput() {
    const dataTransfer = new DataTransfer();
    filesArray.forEach(file => dataTransfer.items.add(file));
    fileInput.files = dataTransfer.files;

    label.textContent = filesArray.length
      ? filesArray.map(f => f.name).join(', ')
      : 'Geen bestanden gekozen';
  }

  /* ===== RENDER PREVIEW ===== */
  function renderPreview() {
    preview.innerHTML = '';

    filesArray.forEach((file, index) => {
      const reader = new FileReader();

      reader.onload = e => {
        const item = document.createElement('div');
        item.className = 'preview-item';

        item.innerHTML = `
          <img src="${e.target.result}" alt="${file.name}">
          <button type="button" class="remove-btn" aria-label="Verwijder foto">
            ×
          </button>
        `;

        item.querySelector('.remove-btn').addEventListener('click', () => {
          filesArray.splice(index, 1);
          syncInput();
          renderPreview();
        });

        preview.appendChild(item);
      };

      reader.readAsDataURL(file);
    });
  }

});