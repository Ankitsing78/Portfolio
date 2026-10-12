/**
 * Main Portfolio Application Logic
 * Ankit Baghel | Associate Project Manager & PMO Analyst
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

  if (!container) return;

  function renderProjects(filter = 'all') {
    const data = window.portfolioData || (typeof portfolioData !== 'undefined' ? portfolioData : null);
    if (!data || !data.projects || !Array.isArray(data.projects)) {
      console.warn("Portfolio data not available or failed to load projects-data.js.");
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <p style="color: var(--text-main); font-weight: 600; font-size: 1.05rem; margin-bottom: 0.5rem;">Project Highlights</p>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Interactive project highlights are temporarily unavailable. Key initiatives include Barista AI Chatbot (52–65% L0 deflection), AWS BCP Automation, IDARS Reporting Platform (10–20 hrs/wk saved), and personal projects tractechspares.com & policiesxray.com.</p>
        </div>
      `;
      return;
    }

    const projects = data.projects.filter(p => {
      return filter === 'all' || p.category === filter;
    });

    container.innerHTML = projects.map(proj => `
      <article class="project-card reveal-on-scroll">
        <div class="project-thumbnail-wrapper">
          <img src="${proj.image}" alt="${proj.title}" class="project-thumbnail" loading="lazy">
          <div class="project-overlay">
            <div class="project-tags">
              ${proj.isPersonal ? `<span class="tag" style="background: rgba(16, 185, 129, 0.2); color: #34d399; border-color: rgba(52, 211, 153, 0.4); font-weight: 600;">Personal / Hobby</span>` : ''}
              ${proj.tags.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="project-body">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.35rem;">
            <h3 class="project-title" style="margin-bottom: 0;">${proj.title}</h3>
          </div>
          ${proj.isPersonal ? `<div style="margin-bottom: 0.5rem;"><span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; color: #10b981;">Personal Project &bull; Built with AI</span></div>` : ''}
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
              <span>View Details</span>
              <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            ${proj.isPersonal ? `
              <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" aria-label="Visit ${proj.title} Live Site">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <span>Live Site</span>
              </a>
            ` : `
              <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" aria-label="GitHub Repository">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>Code</span>
              </a>
            `}
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
    const data = window.portfolioData || (typeof portfolioData !== 'undefined' ? portfolioData : null);
    if (!data || !data.projects) return;
    const proj = data.projects.find(p => p.id === id);
    if (!proj) return;

    modalTitle.textContent = proj.title;
    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem; border-radius: 12px; overflow: hidden;">
        <img src="${proj.image}" alt="${proj.title}" style="width: 100%; max-height: 380px; object-fit: cover;">
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
        ${proj.isPersonal ? `<span class="tag" style="background: rgba(16, 185, 129, 0.2); color: #34d399; border-color: rgba(52, 211, 153, 0.4); font-weight: 600;">Personal / Hobby Project (Built with AI Tooling)</span>` : ''}
        ${proj.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>

      <p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.5rem; color: var(--text-main);">
        ${proj.description}
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; background: var(--bg-surface); padding: 1.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
        <div>
          <h4 style="color: var(--primary-light); margin-bottom: 0.5rem; font-weight: 600;">${proj.isPersonal ? 'Context & Purpose' : 'The Challenge & Context'}</h4>
          <p style="font-size: 0.92rem; color: var(--text-muted);">${proj.challenge}</p>
        </div>
        <div>
          <h4 style="color: var(--primary-light); margin-bottom: 0.5rem; font-weight: 600;">${proj.isPersonal ? 'Implementation Approach' : 'The Delivery Solution'}</h4>
          <p style="font-size: 0.92rem; color: var(--text-muted);">${proj.solution}</p>
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
        ${proj.isPersonal ? `
          <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <span>Visit Live Website</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        ` : `
          <a href="${proj.liveUrl}" class="btn btn-primary">
            <span>Project Scope (Experience)</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
          <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            <span>GitHub Profile</span>
          </a>
        `}
      </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Resume Modal trigger
  document.querySelectorAll('.trigger-resume-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalTitle.textContent = "Curriculum Vitae — Ankit Baghel";
      modalBody.innerHTML = `
        <div class="resume-paper">
          <div class="resume-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; border-bottom: 2px solid #2563eb; padding-bottom: 1rem; margin-bottom: 1.5rem;">
            <div>
              <h1 style="font-size: 2.2rem; font-weight: 800; color: #1e293b; margin-bottom: 0.25rem;">ANKIT BAGHEL</h1>
              <p style="color: #2563eb; font-weight: 700; font-size: 1.15rem; margin-bottom: 0.4rem;">Associate Project Manager | PMO Analyst</p>
              <p style="font-size: 0.9rem; color: #475569; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
                <span>📍 Greater Noida</span> • 
                <span>🎓 M.Tech (BITS Pilani WILP)</span> • 
                <span>📞 +91 7302807688</span> • 
                <span>✉️ <a href="mailto:ankitsingh7836@gmail.com" style="color: #2563eb; text-decoration: underline;">ankitsingh7836@gmail.com</a></span> • 
                <span>💼 <a href="https://www.linkedin.com/in/ankit-baghel-20ba85176" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">linkedin.com/in/ankit-baghel-20ba85176</a></span>
              </p>
            </div>
            <div>
              <button class="btn btn-primary btn-sm" onclick="window.print()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          <div class="resume-section">
            <h2 class="resume-section-title">PROFESSIONAL SUMMARY</h2>
            <p style="line-height: 1.65; color: #334155;">
              Associate Project Manager and PMO Analyst with 5+ years of experience in technology delivery, PMO operational governance, and business analytics at Wipro Ltd. Proven track record governing $2.2M+ in cumulative vendor budgets across global accounts ($700K+ Levi Strauss, $1.5M Solvay OneDesk), covering end-to-end PO-to-invoice lifecycles and contract compliance. Delivered comprehensive performance monitoring and governance reporting for 100+ cross-functional resources across APAC, EMEA, US, and MEX, and initiated structured employee stack-ranking frameworks to drive operational excellence. Championed reporting automation pipelines on Solvay OneDesk that eliminated 10–20 hours of manual reporting effort weekly. Certified Information Security Administrator Associate (SC-401) with M.Tech in Computing Systems and Infrastructure from BITS Pilani (WILP).
            </p>
          </div>

          <div class="resume-section">
            <h2 class="resume-section-title">EXPERIENCE</h2>

            <!-- Role 1: Solvay -->
            <div style="margin-bottom: 1.5rem;">
              <div style="display:flex; justify-content:space-between; align-items: baseline; font-weight:700; color: #1e293b;">
                <span style="font-size: 1.05rem;">WIPRO Ltd. – Associate Project Manager</span>
                <span style="color: #2563eb; font-size: 0.95rem;">11/2025 – Present</span>
              </div>
              <div style="font-weight: 600; color: #64748b; font-size: 0.92rem; margin-bottom: 0.5rem;">Account: Solvay OneDesk</div>
              <ul style="padding-left: 1.25rem; font-size: 0.9rem; color: #475569; line-height: 1.6;">
                <li><strong>Vendor Lifecycle & Budget Governance:</strong> Owned end-to-end vendor management lifecycle from PO creation to invoice verification across dispatch, FTE, logistics, telecommunications, and asset management, governing a $1.5M vendor budget.</li>
                <li><strong>Performance Governance & Stack Ranking:</strong> Delivered governance reporting and operational performance monitoring for 48 resources; initiated an employee stack-ranking system to systematically identify top and bottom performers.</li>
                <li><strong>Financial Controls:</strong> Monitored band-wise PPC (Project Price Cost) and tracked operational expenditure against baseline financial models to ensure zero cost overruns.</li>
                <li><strong>SLA & KPI Tracking:</strong> Established delivery health metrics that contributed to an 8+ percentage point improvement in SLA performance and a 21–30% reduction in operational backlog.</li>
                <li><strong>Reporting Automation:</strong> Automated the operational reporting pipeline, eliminating 10–20 hours of manual effort per week and delivering real-time stakeholder visibility.</li>
              </ul>
            </div>

            <!-- Role 2: Levi's -->
            <div style="margin-bottom: 1.5rem;">
              <div style="display:flex; justify-content:space-between; align-items: baseline; font-weight:700; color: #1e293b;">
                <span style="font-size: 1.05rem;">WIPRO Ltd. – PMO Analyst / PMO Executive</span>
                <span style="color: #2563eb; font-size: 0.95rem;">09/2021 – 10/2025</span>
              </div>
              <div style="font-weight: 600; color: #64748b; font-size: 0.92rem; margin-bottom: 0.6rem;">Account: Levi Strauss & Co. IT Infrastructure</div>

              <!-- Domain 1 -->
              <div style="margin-bottom: 0.5rem;">
                <strong style="color: #0f172a; font-size: 0.92rem;">Project & Delivery Governance</strong>
                <ul style="padding-left: 1.25rem; margin-top: 0.25rem; font-size: 0.9rem; color: #475569;">
                  <li>Defined scope, timelines, milestones, and governance KPIs for infrastructure enhancement initiatives.</li>
                  <li>Owned performance monitoring and governance reporting for 100+ cross-functional resources across APAC, EMEA, US, and MEX (tracking ticket volumes, CSAT surveys, attendance, SLA/KPI adherence, and productivity metrics).</li>
                  <li>Leveraged Copilot, Power Query, Excel, and Power BI to orchestrate enterprise-scale datasets for infrastructure performance analytics.</li>
                </ul>
              </div>

              <!-- Domain 2 -->
              <div style="margin-bottom: 0.5rem;">
                <strong style="color: #0f172a; font-size: 0.92rem;">Business Analysis & Documentation</strong>
                <ul style="padding-left: 1.25rem; margin-top: 0.25rem; font-size: 0.9rem; color: #475569;">
                  <li>Conducted stakeholder workshops to gather business requirements; prepared Business Requirement Documents (BRD) and Functional Specifications.</li>
                  <li>Led technology KPI validation across multiple systems to deliver actionable insights and support executive decision-making.</li>
                  <li>Designed process flows for Global Service Desk standardization initiatives.</li>
                </ul>
              </div>

              <!-- Domain 3 -->
              <div style="margin-bottom: 0.5rem;">
                <strong style="color: #0f172a; font-size: 0.92rem;">Risk & Performance Management</strong>
                <ul style="padding-left: 1.25rem; margin-top: 0.25rem; font-size: 0.9rem; color: #475569;">
                  <li>Identified operational risks affecting SLA compliance and implemented mitigation plans.</li>
                  <li>Led 3 Lean initiatives saving $100K+ annually and initiated 10+ process-improvement programs to enhance service quality.</li>
                  <li>Maintained operational and financial data pipelines into Excel and Power BI for executive performance visibility.</li>
                </ul>
              </div>

              <!-- Domain 4 -->
              <div style="margin-bottom: 0.5rem;">
                <strong style="color: #0f172a; font-size: 0.92rem;">Vendor & Budget Governance</strong>
                <ul style="padding-left: 1.25rem; margin-top: 0.25rem; font-size: 0.9rem; color: #475569;">
                  <li>Governed a $700K+ vendor budget across Telecom, Dispatch, and FTEs.</li>
                  <li>Reviewed contracts, approved invoices against deliverables, and tracked vendor performance, SLA adherence, and penalty clauses.</li>
                  <li>Conducted quarterly budget reviews and financial cost tracking.</li>
                </ul>
              </div>

              <!-- Domain 5 -->
              <div>
                <strong style="color: #0f172a; font-size: 0.92rem;">Stakeholder & Client Management</strong>
                <ul style="padding-left: 1.25rem; margin-top: 0.25rem; font-size: 0.9rem; color: #475569;">
                  <li>Acted as PMO SPOC between business leaders, global delivery managers, and third-party vendors.</li>
                  <li>Presented weekly and monthly governance dashboards to senior leadership.</li>
                  <li>Managed communication for quarterly BCP activities and audit reviews, ensuring compliance within SLA and budget constraints.</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="resume-section">
            <h2 class="resume-section-title">KEY ACHIEVEMENTS</h2>
            <ul style="padding-left: 1.25rem; font-size: 0.92rem; color: #334155; line-height: 1.6;">
              <li>52–65% L0 ticket deflection via AI automation (11-month sustained performance).</li>
              <li>Overall service desk interaction deflection improved to 22% (+1.8% gain).</li>
              <li>7+ Internal Wipro Delivery & Recognition Awards (Best Debutant, Victory League x2, TopGear, Inspiring Performance).</li>
              <li>Strong delivery compliance for CMMI & BCP audits; closed BCP for 5+ international accounts.</li>
              <li>Personal showcase projects: Built tractechspares.com and policiesxray.com end-to-end with AI tooling for acquaintances.</li>
              <li>25% reduction in annual vendor spend (FY2024).</li>
            </ul>
          </div>

          <div class="resume-section">
            <h2 class="resume-section-title">CORE COMPETENCIES</h2>
            <p style="font-size: 0.9rem; margin-bottom: 0.4rem; color: #334155;"><strong>Project Lifecycle & Governance:</strong> MSA/SOW, Billing & Invoice, SLA/KPI Adherence, Automation, Productivity, Data Orchestration, Employee Stack Ranking</p>
            <p style="font-size: 0.9rem; margin-bottom: 0.4rem; color: #334155;"><strong>ITSM & Tools:</strong> ServiceNow, BMC Helix, Power BI (Dashboard Development), Advanced Excel (Pivot, Power Query, Automation), Power Automate</p>
            <p style="font-size: 0.9rem; margin-bottom: 0.4rem; color: #334155;"><strong>Vendor & Operations Management:</strong> Multi-Vendor Governance ($2.2M+ Cumulative Budget), Contract/PO/Invoice Lifecycle, Band-Wise PPC Tracking</p>
            <p style="font-size: 0.9rem; margin-bottom: 0.4rem; color: #334155;"><strong>Stakeholder Management:</strong> Global Delivery Teams (100+ Resources APAC/EMEA/US/MEX), Vendors, Procurement, Finance, Leadership</p>
            <p style="font-size: 0.9rem; margin-bottom: 0.4rem; color: #334155;"><strong>Governance & Compliance:</strong> ITIL, Lean Six Sigma, CMMI, BCP, MS 365 / Project Trackers</p>
            <p style="font-size: 0.9rem; color: #334155;"><strong>Automation & Analytics:</strong> AI-based L0 Automation, Executive Dashboards, KPI Standardization, Reporting Automation (10–20 hrs/wk saved)</p>
          </div>

          <div class="resume-section">
            <h2 class="resume-section-title">SKILLS – TOOLS & TECHNOLOGIES</h2>
            <p style="font-size: 0.9rem; margin-bottom: 0.35rem; color: #334155;">• Power BI | DAX | SQL | Data Modeling | Advanced Excel | Power Query | M365 Copilot | Process Automation</p>
            <p style="font-size: 0.9rem; margin-bottom: 0.35rem; color: #334155;">• Project Management | ITIL Framework | SLA & KPI Management | Global Delivery Governance</p>
            <p style="font-size: 0.9rem; margin-bottom: 0.35rem; color: #334155;">• SAP Ariba | Contract Management | PO & Invoice Governance | Financial Controls | Cost Optimization | Vendor Management</p>
            <p style="font-size: 0.9rem; color: #334155;">• Agile Methodology | Lean Methodology | Business Process Improvement | Business Continuity Plans</p>
          </div>

          <div class="resume-section">
            <h2 class="resume-section-title">PROJECT HIGHLIGHTS</h2>
            <p style="font-size: 0.9rem; margin-bottom: 0.45rem; color: #334155;"><strong>Barista AI Chatbot:</strong> Machine learning ticket classification & service desk deflection achieving 52–65% L0 deflection sustained over 11 months.</p>
            <p style="font-size: 0.9rem; margin-bottom: 0.45rem; color: #334155;"><strong>AWS-Based BCP Automation:</strong> Transitioned manual DR workflows to an AWS automated orchestration platform, closing BCP for 5+ international clients with 100% CMMI audit compliance.</p>
            <p style="font-size: 0.9rem; margin-bottom: 0.45rem; color: #334155;"><strong>IDARS Reporting Platform:</strong> Built a fully automated, no-human-touch ServiceNow reporting pipeline and Power BI model saving 10–20 hours of manual effort weekly.</p>
            <p style="font-size: 0.9rem; color: #334155;"><strong>Personal Projects (Built with AI Tooling):</strong> Tractech Spares (tractechspares.com) & PoliciesXray (policiesxray.com) built end-to-end with AI tooling for acquaintances.</p>
          </div>

          <div class="resume-section" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-top: 1rem;">
            <div>
              <h2 class="resume-section-title" style="margin-bottom: 0.5rem;">EDUCATION</h2>
              <p style="font-size: 0.88rem; font-weight: 700; color: #0f172a;">M.Tech – Computing Systems and Infrastructure</p>
              <p style="font-size: 0.85rem; color: #475569;">BITS Pilani (WILP) — Pilani, Rajasthan (11/2025)</p>
              <p style="font-size: 0.78rem; color: #64748b; margin-top: 0.2rem;">Concurrent with Wipro full-time employment</p>
              <p style="font-size: 0.88rem; font-weight: 700; color: #0f172a; margin-top: 0.5rem;">B.C.A – Computer Application</p>
              <p style="font-size: 0.85rem; color: #475569;">GLA University — Mathura, UP (05/2021)</p>
            </div>

            <div>
              <h2 class="resume-section-title" style="margin-bottom: 0.5rem;">AWARDS</h2>
              <p style="font-size: 0.75rem; color: #64748b; font-style: italic; margin-bottom: 0.35rem;">Internal Wipro recognition programs</p>
              <ul style="padding-left: 1.1rem; font-size: 0.85rem; color: #334155;">
                <li>Best Debutant</li>
                <li>Victory League (x2)</li>
                <li>Inspiring Performance</li>
                <li>Habit Flagbearer (x2)</li>
                <li>TopGear Challenge Reward (x2)</li>
              </ul>
            </div>

            <div>
              <h2 class="resume-section-title" style="margin-bottom: 0.5rem;">CREDENTIALS</h2>
              <p style="font-size: 0.8rem; font-weight: 700; color: #0f172a; margin-bottom: 0.2rem;">Certifications:</p>
              <ul style="padding-left: 1.1rem; font-size: 0.82rem; color: #334155; margin-bottom: 0.5rem;">
                <li>SC-401 — Microsoft Certified: Information Security Administrator Associate</li>
                <li>PL-300 — Microsoft Certified: Power BI Data Analyst Associate</li>
                <li>PL-700</li>
              </ul>
              <p style="font-size: 0.8rem; font-weight: 700; color: #0f172a; margin-bottom: 0.2rem;">Coursework / Skills:</p>
              <ul style="padding-left: 1.1rem; font-size: 0.82rem; color: #334155;">
                <li>SQL</li>
                <li>Python</li>
                <li>Linux</li>
              </ul>
            </div>
          </div>
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
