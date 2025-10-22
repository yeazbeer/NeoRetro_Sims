
// script.js - small JS for modal, filters, search, and contact form
document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  const year = new Date().getFullYear();
  document.getElementById('year')?.textContent && (document.getElementById('year').textContent = year);
  document.getElementById('year2')?.textContent && (document.getElementById('year2').textContent = year);
  document.getElementById('year3')?.textContent && (document.getElementById('year3').textContent = year);
  document.getElementById('year4')?.textContent && (document.getElementById('year4').textContent = year);

  // Modal handling (works for both pages)
  function openModal(title, img, price) {
    const modal = document.getElementById('product-modal');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('#modal-title').textContent = title;
    modal.querySelector('#modal-img').src = img;
    modal.querySelector('#modal-price').textContent = price;
  }
  function closeModal() {
    const modal = document.getElementById('product-modal');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
  }
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const t = e.currentTarget;
      openModal(t.dataset.title, t.dataset.img, t.dataset.price);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  document.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // Category filters
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      document.querySelectorAll('.card').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
      // highlight
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Shop search + sort
  const searchInput = document.getElementById('search');
  const sortSelect = document.getElementById('sort');
  function filterAndSort() {
    const q = searchInput ? searchInput.value.toLowerCase() : '';
    const grid = document.getElementById('products-grid') || document.getElementById('featured-grid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.card'));
    cards.forEach(c => {
      const title = c.querySelector('h3')?.textContent?.toLowerCase() || '';
      c.style.display = title.includes(q) ? '' : 'none';
    });
    if (sortSelect) {
      const val = sortSelect.value;
      if (val === 'price-asc' || val === 'price-desc') {
        const sorted = cards.sort((a,b) => {
          const pa = parseFloat((a.dataset.price || a.getAttribute('data-price') || '0').replace('৳', ''));
          const pb = parseFloat((b.dataset.price || b.getAttribute('data-price') || '0').replace('৳', ''));
          return val === 'price-asc' ? pa - pb : pb - pa;
        });
        // re-append in order
        sorted.forEach(c => grid.appendChild(c));
      }
    }
  }
  searchInput?.addEventListener('input', filterAndSort);
  sortSelect?.addEventListener('change', filterAndSort);

  // Contact form (client-side demo)
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    // simple validation already via required, show message
    const success = document.getElementById('contact-success');
    if (success) {
      success.style.display = 'block';
    } else {
      alert('Message sent (demo).');
    }
    contactForm.reset();
  });

  // Small "Add to cart" demo
  document.getElementById('add-to-cart')?.addEventListener('click', () => {
    alert('Added to cart (demo).');
  });
  document.getElementById('add-to-cart-2')?.addEventListener('click', () => {
    alert('Added to cart (demo).');
  });
});
