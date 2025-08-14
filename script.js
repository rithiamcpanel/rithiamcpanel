document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll gölge efekti
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Hamburger menü
  const hamburger = document.getElementById('hamburger');
  hamburger?.addEventListener('click', () => {
    document.querySelector('.nav-left')?.classList.toggle('show');
    document.querySelector('.nav-right')?.classList.toggle('show');
  });

  // IP kopyalama
  window.copyIP = function () {
    const ipElement = document.getElementById("server-ip");
    const msg = document.getElementById("copy-msg");

    if (ipElement && msg) {
      const ip = ipElement.innerText;
      navigator.clipboard.writeText(ip).then(() => {
        msg.style.opacity = "1";
        setTimeout(() => (msg.style.opacity = "0"), 2000);
      });
    }
  };

  // Modal açma/kapatma
  window.openModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'flex';
  };

  window.closeModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
  };

  window.onclick = function (event) {
    document.querySelectorAll('.modal').forEach(modal => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  };

  // Kategori geçişi
  const buttons = document.querySelectorAll('.category-btn');
  const categories = document.querySelectorAll('.category-content');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.dataset.category;
      categories.forEach(cat => {
        cat.style.display = cat.id === 'category-' + target ? 'block' : 'none';
      });
    });
  });

  // Discord online sayısı çekme
  const guildId = "1378363165204807752";
  fetch(`https://discord.com/api/guilds/${guildId}/widget.json`)
    .then(response => response.json())
    .then(data => {
      const countElement = document.getElementById("discord-count");
      if (countElement) {
        countElement.textContent = `${data.presence_count} çevrimiçi kullanıcı`;
      }
    })
    .catch(error => {
      const countElement = document.getElementById("discord-count");
      if (countElement) {
        countElement.textContent = "Bilgi alınamadı.";
      }
      console.error("Discord verisi alınamadı:", error);
    });

  // Yumuşak scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
// Galeri görseline tıklayınca büyüt
document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', function () {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = "block";
    modalImg.src = this.src;
  });
});

function closeImageModal() {
  document.getElementById('imageModal').style.display = "none";
}

const logoutBtn = document.getElementById("logoutBtn");
if (storedUser) {
  logoutBtn.style.display = "inline-block";
}

function logoutUser() {
  localStorage.removeItem("username");
  location.reload();
}
// Navbar'daki galeri linkini gizle (eğer kullanıcı giriş yaptıysa)
document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
  if (isLoggedIn) {
    const galleryLink = document.querySelector('nav a[href*="gallery"]');
    if (galleryLink) galleryLink.style.display = "none";
  }
});
// Giriş yapıldığında çalıştır
localStorage.setItem("userLoggedIn", "true");

// İsteğe bağlı: yönlendirme
window.location.href = "index.html";
localStorage.removeItem("userLoggedIn");
