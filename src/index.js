import './style.scss';

(() => {
  const zoomItem = document.querySelectorAll('.zoom-image');

  let zoomEl;
  let rootRect;

  zoomItem.forEach((el) => {
    const src = el.getAttribute('src');

    el.addEventListener('mouseenter', () => {
      rootRect = el.getBoundingClientRect();
      renderZoom(el, src);
    });

    el.addEventListener('mousemove', (evt) => {
      const posX = evt.pageX - rootRect.left;
      const posY = evt.pageY - rootRect.top;

      const posXPercentage = (posX / el.offsetWidth) * 100;
      const posYPercentage = (posY / el.offsetHeight) * 100;

      const zoomImage = zoomEl.querySelector('.zoom-area__img');
      zoomImage.style.transform = `translate(-${posXPercentage}%, -${posYPercentage}%)`;
    });

    el.addEventListener('mouseleave', () => removeZoom());
  });

  const renderZoom = (el, src, alt = 'preview') => {
    const template = `
      <div class="zoom-area">
        <img src="${src}" alt="${alt}" class="zoom-area__img" />
      </div>
    `;

    el.insertAdjacentHTML('afterend', template.trim());

    zoomEl = document.querySelector('.zoom-area');
    zoomEl.style.top = `${rootRect.top}px`;
    zoomEl.style.left = `${rootRect.right + 20}px`;
  };

  const removeZoom = () => {
    zoomEl.remove();
  };
})();
