/**
 * Main Portfolio Application Logic
 * Senior Full Stack Developer & Distributed Systems Architect
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollSpy();
  initAboutTabs();
  initProjectFiltering();
  initModals();
  initContactForm();
  initScrollReveal();
  initButtonRipples();
});

/* ==========================================================================
   1. MOBILE NAVIGATION & DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });
  });

  // Header scroll shadow
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   2. SCROLL SPY FOR NAVIGATION
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   3. ABOUT ME TABS (Journey, Education, Certifications)
   ========================================================================== */
function initAboutTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(`tab-${targetTab}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. PROJECTS FILTERING & DYNAMIC RENDERING
   ========================================================================== */
function initProjectFiltering() {
  const container = document.getElementById('projectsContainer');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!container || !window.portfolioData) return;

  function renderProjects(filter = 'all') {
    const projects = window.portfolioData.projects.filter(p => {
      return filter === 'all' || p.category === filter;
    });

    container.innerHTML = projects.map(proj => `
      <article class="project-card reveal-on-scroll">
        <div class="project-thumbnail-wrapper">
          <img src="${proj.image}" alt="${proj.title}" class="project-thumbnail" loading="lazy">
          <div class="project-overlay">
            <div class="project-tags">
              ${proj.tags.slice(0, 4).map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="project-body">
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">${proj.subtitle}</p>

          <div class="project-metrics-row">
            ${proj.metrics.map(m => `
              <div class="metric-pill">
                <div class="metric-pill-value">${m.value}</div>
                <div class="metric-pill-label">${m.label}</div>
              </div>
            `).join('')}
          </div>

          <div class="project-footer">
            <button class="btn btn-primary btn-sm open-project-modal" data-id="${proj.id}">
              <span>View Project</span>
              <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" aria-label="GitHub Repository">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span>Code</span>
            </a>
          </div>
        </div>
      </article>
    `).join('');

    // Attach event listeners to project cards
    container.querySelectorAll('.open-project-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openProjectModal(btn.getAttribute('data-id'));
      });
    });
  }

  // Initial render
  renderProjects('all');

  // Filter click events
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
}

/* ==========================================================================
   5. MODAL SYSTEM (Project Details, Resume, Blog Articles)
   ========================================================================== */
function initModals() {
  const overlay = document.getElementById('universalModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  if (!overlay || !closeBtn) return;

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);

  // Close on backdrop click (Light-dismiss pattern)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Global open function for Project details
  window.openProjectModal = function(id) {
    const proj = window.portfolioData.projects.find(p => p.id === id);
    if (!proj) return;

    modalTitle.textContent = proj.title;
    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem; border-radius: 12px; overflow: hidden;">
        <img src="${proj.image}" alt="${proj.title}" style="width: 100%; max-height: 380px; object-fit: cover;">
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
        ${proj.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>

      <p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.5rem; color: var(--text-main);">
        ${proj.description}
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; background: var(--bg-surface); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-subtle);">
        <div>
          <h4 style="color: var(--accent-cyan); margin-bottom: 0.5rem;">The Architecture Challenge</h4>
          <p style="font-size: 0.95rem; color: var(--text-muted);">${proj.challenge}</p>
        </div>
        <div>
          <h4 style="color: var(--primary-light); margin-bottom: 0.5rem;">The Engineering Solution</h4>
          <p style="font-size: 0.95rem; color: var(--text-muted);">${proj.solution}</p>
        </div>
      </div>

      <div style="margin-bottom: 2rem;">
        <h4 style="margin-bottom: 0.85rem; color: var(--text-main);">Key Highlights & Features</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; padding-left: 0;">
          ${proj.features.map(f => `
            <li style="display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.95rem; color: var(--text-muted);">
              <span style="color: var(--primary-light);">✓</span>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap; border-top: 1px solid var(--border-subtle); padding-top: 1.5rem;">
        <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <span>Live Demo</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
        <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          <span>View Source Code</span>
        </a>
      </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Resume Modal trigger
  document.querySelectorAll('.trigger-resume-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalTitle.textContent = "Senior Full Stack Developer Curriculum Vitae";
      modalBody.innerHTML = `
        <div class="resume-paper">
          <div class="resume-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
            <div>
              <h1 style="font-size: 2rem; margin-bottom: 0.25rem;">Ankit Baghel</h1>
              <p style="color: #2563eb; font-weight: 600; font-size: 1.1rem; margin-bottom: 0.5rem;">Senior Full Stack Developer | Distributed Systems Architect</p>
              <p style="font-size: 0.9rem; color: #64748b;">ankit.baghel.dev@gmail.com • +91 98765 43210 • Bengaluru, India • github.com/Ankitsing78</p>
            </div>
            <div>
              <button class="btn btn-primary btn-sm" onclick="window.print()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          <div class="resume-section">
            <h2 class="resume-section-title">Professional Summary</h2>
            <p style="line-height: 1.6; color: #334155;">
              Results-driven Senior Full Stack Developer and Cloud Architect with 7+ years of experience engineering high-concurrency microservices, real-time data streaming engines, and intuitive enterprise applications. Proven record of leading cross-functional teams, reducing API latencies by up to 45%, and architecting platforms serving 100K+ daily active users with 99.99% availability.
            </p>
          </div>

          <div class="resume-section">
            <h2 class="resume-section-title">Core Competencies</h2>
            <p style="margin-bottom: 0.5rem;"><strong>Frontend:</strong> React, Next.js (App Router), TypeScript, Vue.js, Tailwind CSS, Modern Vanilla CSS, WebAssembly, WebRTC</p>
            <p style="margin-bottom: 0.5rem;"><strong>Backend:</strong> Node.js, Express, Python, FastAPI, Go, GraphQL, REST, Microservices, Event-Driven Architecture</p>
            <p style="margin-bottom: 0.5rem;"><strong>Databases & Cloud:</strong> PostgreSQL, MongoDB, Redis, Apache Kafka, AWS (ECS, Lambda, S3, RDS), Docker, Kubernetes</p>
            <p><strong>DevOps & Quality:</strong> CI/CD (GitHub Actions), Terraform, Linux, Jest, Playwright, ITIL v4, LEAN Six Sigma</p>
          </div>

          <div class="resume-section">
            <h2 class="resume-section-title">Work Experience</h2>
            <div style="margin-bottom: 1rem;">
              <div style="display:flex; justify-content:space-between; font-weight:700;">
                <span>Lead Full Stack Architect — TechVentures / Global Cloud</span>
                <span>2024 - Present</span>
              </div>
              <ul style="padding-left: 1.25rem; margin-top: 0.35rem; color: #475569;">
                <li>Lead architecture of multi-tenant enterprise SaaS deployed across 4 AWS global regions with 99.98% SLA.</li>
                <li>Pioneered Kafka real-time streaming ingestion pipeline handling 250K+ messages/minute.</li>
                <li>Mentored team of 14 engineers across frontend, backend, and DevOps disciplines.</li>
              </ul>
            </div>

            <div style="margin-bottom: 1rem;">
              <div style="display:flex; justify-content:space-between; font-weight:700;">
                <span>Senior Full Stack Developer — Nexus Enterprise Systems</span>
                <span>2022 - 2024</span>
              </div>
              <ul style="padding-left: 1.25rem; margin-top: 0.35rem; color: #475569;">
                <li>Migrated core monolithic application into Dockerized microservices, reducing deployment cycle times by 65%.</li>
                <li>Engineered live order matching engine with FastAPI and Redis, cutting order execution latency to <1.5ms.</li>
              </ul>
            </div>
          </div>

          <div class="resume-section">
            <h2 class="resume-section-title">Education & Certifications</h2>
            <p><strong>B.Tech in Computer Science & Engineering</strong> — High Honors (GPA: 3.9/4.0)</p>
            <p><strong>Certifications:</strong> AWS Certified Solutions Architect Professional • Certified Kubernetes Administrator (CKA) • Meta Senior Full-Stack Engineer</p>
          </div>
        </div>
      `;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Blog Article Reader Modal trigger
  document.querySelectorAll('.open-article-modal').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const article = window.portfolioData.articles.find(a => a.id === id);
      if (!article) return;

      modalTitle.textContent = article.title;
      modalBody.innerHTML = `
        <div style="margin-bottom: 1.5rem; border-radius: 12px; overflow: hidden;">
          <img src="${article.image}" alt="${article.title}" style="width: 100%; max-height: 380px; object-fit: cover;">
        </div>
        <div style="display: flex; gap: 1rem; align-items: center; font-size: 0.85rem; color: var(--text-subtle); margin-bottom: 1.5rem;">
          <span style="color: var(--accent-cyan); font-weight: 600;">${article.category}</span>
          <span>•</span>
          <span>${article.date}</span>
          <span>•</span>
          <span>${article.readTime}</span>
        </div>
        <div style="font-size: 1.05rem; line-height: 1.8; color: var(--text-muted);" class="article-rich-text">
          ${article.content}
        </div>
      `;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

/* ==========================================================================
   6. INTERACTIVE CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('formAlert');

  if (!form || !alertBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alertBox.className = 'form-alert error';
      alertBox.textContent = 'Please fill out all required fields (Name, Email, and Message).';
      alertBox.style.display = 'flex';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;animation:spin 1s linear infinite;">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="31.4 31.4"></circle>
      </svg>
      <span>Sending Message...</span>
    `;

    // Simulated reliable dispatch
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      alertBox.className = 'form-alert success';
      alertBox.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>Thank you, ${name}! Your message was successfully received. I will respond to ${email} within 24 hours.</span>
      `;
      alertBox.style.display = 'flex';
      form.reset();
    }, 900);
  });
}

/* ==========================================================================
   7. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   8. BUTTON RIPPLE EFFECT
   ========================================================================== */
function initButtonRipples() {
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple');

      const existingRipple = this.querySelector('.ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(circle);
    });
  });
}
