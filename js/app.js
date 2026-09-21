/* ============================================
   APP.JS — Main application logic
   ============================================ */

(function () {
  'use strict';

  /* ---------- Theme Toggle ---------- */
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let currentTheme = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', currentTheme);
  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      updateThemeIcon();
      // Re-render charts with new theme colors
      if (window.portfolioCharts) {
        Object.values(window.portfolioCharts).forEach(function (chart) {
          chart.destroy();
        });
      }
      renderCharts();
    });
  }

  function updateThemeIcon() {
    if (!themeToggle) return;
    themeToggle.setAttribute('aria-label', 'Switch to ' + (currentTheme === 'dark' ? 'light' : 'dark') + ' mode');
    themeToggle.innerHTML = currentTheme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  function getChartColors() {
    const isDark = currentTheme === 'dark';
    return {
      text: isDark ? '#7a8a80' : '#7a7974',
      grid: isDark ? '#2a342e' : '#dcd9d5',
      primary: isDark ? '#4ec896' : '#0f5132',
      accent: isDark ? '#00d97f' : '#00a86b',
      blue: isDark ? '#5591c7' : '#006494',
      gold: isDark ? '#e8af34' : '#d19900',
      orange: isDark ? '#fdab43' : '#da7101',
      purple: isDark ? '#a86fdf' : '#7a39bb'
    };
  }

  /* ---------- Mobile Nav Toggle ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      mobileNav.setAttribute('aria-hidden', !isOpen);
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ---------- Header Scroll Behavior ---------- */
  const header = document.getElementById('header');
  let lastScrollY = 0;

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;

    if (scrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    lastScrollY = scrollY;
  }, { passive: true });

  /* ---------- Active Nav Link on Scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function updateActiveNav() {
    var scrollY = window.scrollY + 100;
    var current = '';

    sections.forEach(function (section) {
      if (scrollY >= section.offsetTop) {
        current = section.id;
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('is-active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('is-active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ---------- Render Project Cards ---------- */
  const projectsGrid = document.getElementById('projectsGrid');
  const projects = PORTFOLIO_DATA.projects;

  function renderProjects() {
    projectsGrid.innerHTML = projects.map(function (p, i) {
      var tagsHtml = p.tagLabels.map(function (tag) {
        return '<span class="project-card__tag">' + tag + '</span>';
      }).join('');
      var cardKpisHtml = p.cardKpis ? '<div class="project-card__kpis">' + p.cardKpis.map(function (kpi) {
        return '<div class="project-card__kpi"><strong>' + kpi.value + '</strong><span>' + kpi.label + '</span></div>';
      }).join('') + '</div>' : '';
      var cardImageHtml = p.dashboardImages && p.dashboardImages.length > 0 ?
        '<div class="project-card__image-wrap"><img class="project-card__image" src="' + p.dashboardImages[0].src + '" alt="' + p.dashboardImages[0].alt + '" loading="lazy"><span class="project-card__image-label">Dashboard preview</span></div>' :
        '<div class="project-card__image-wrap project-card__image-wrap--empty"><span>Case study</span></div>';

      return (
        '<article class="project-card" data-project-id="' + p.id + '" data-tags="' + p.tags.join(',') + '" tabindex="0" role="button" aria-label="View details for ' + p.title + '">' +
        cardImageHtml +
        '<div class="project-card__content">' +
        '<div class="project-card__topline"><span class="project-card__number">' + String(i + 1).padStart(2, '0') + '</span><span class="project-card__type">' + (p.tagLabels[0] || 'Project') + '</span></div>' +
        '<div class="project-card__tags">' + tagsHtml + '</div>' +
        '<h3 class="project-card__title">' + p.title + '</h3>' +
        '<p class="project-card__desc">' + p.shortDesc + '</p>' +
        cardKpisHtml +
        '<span class="project-card__link"><span>View project</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>' +
        '</div>' +
        '</article>'
      );
    }).join('');

    // Attach click handlers
    projectsGrid.querySelectorAll('.project-card').forEach(function (card) {
      card.addEventListener('click', function () {
        openModal(card.getAttribute('data-project-id'));
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(card.getAttribute('data-project-id'));
        }
      });
    });
  }

  /* ---------- Project Filtering ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      filterBtns.forEach(function (b) { b.classList.remove('filter-btn--active'); });
      btn.classList.add('filter-btn--active');

      var cards = projectsGrid.querySelectorAll('.project-card');
      cards.forEach(function (card) {
        var tags = card.getAttribute('data-tags').split(',');
        if (filter === 'all' || tags.indexOf(filter) !== -1) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  /* ---------- Modal ---------- */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const imageLightbox = document.getElementById('imageLightbox');
  const imageLightboxImage = document.getElementById('imageLightboxImage');
  const imageLightboxClose = document.getElementById('imageLightboxClose');

  function openModal(projectId) {
    var project = projects.find(function (p) { return p.id === projectId; });
    if (!project) return;

    var tagsHtml = project.tagLabels.map(function (tag) {
      return '<span class="modal__tag">' + tag + '</span>';
    }).join('');

    var iconSvg = {
      problem: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 8v5"/><path d="M12 16h.01"/></svg>',
      objective: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
      tools: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16"/><path d="M7 7V5h10v2"/><rect x="5" y="7" width="14" height="12" rx="2"/></svg>',
      technical: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 8h8v8H8z"/><path d="M10 12h4"/><path d="M12 10v4"/></svg>',
      process: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16"/><path d="M4 12h10"/><path d="M4 18h16"/></svg>',
      findings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l4 4 10-10"/></svg>',
      skills: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 8h10v8H7z"/><path d="M9 12h6"/></svg>'
    };

    var objectivesHtml = '';
    if (project.objectives && project.objectives.length > 0) {
      objectivesHtml =
        '<h4 class="modal__section-header"><span class="modal__icon">' + iconSvg.objective + '</span>Project Objectives</h4>' +
        '<ul>' + project.objectives.map(function (objective) {
          return '<li>' + objective + '</li>';
        }).join('') + '</ul>';
    }

    var toolsHtml = '';
    if (project.tools && project.tools.length > 0) {
      toolsHtml =
        '<h4 class="modal__section-header"><span class="modal__icon">' + iconSvg.tools + '</span>Tools and Technologies</h4>' +
        '<ul>' + project.tools.map(function (tool) {
          return '<li>' + tool + '</li>';
        }).join('') + '</ul>';
    }

    var technicalSkillsHtml = '';
    if (project.technicalSkills && project.technicalSkills.length > 0) {
      technicalSkillsHtml =
        '<h4 class="modal__section-header"><span class="modal__icon">' + iconSvg.technical + '</span>Technical skills demonstrated</h4>' +
        '<ul>' + project.technicalSkills.map(function (skill) {
          return '<li>' + skill + '</li>';
        }).join('') + '</ul>';
    }

    var dataPreparationHtml = '';
    if (project.dataPreparation && project.dataPreparation.length > 0) {
      dataPreparationHtml =
        '<h4 class="modal__section-header"><span class="modal__icon">' + iconSvg.process + '</span>Data preparation</h4>' +
        '<ul>' + project.dataPreparation.map(function (item) {
          return '<li>' + item + '</li>';
        }).join('') + '</ul>';
    }

    var dataPreparationNoteHtml = project.dataPreparationNote ?
      '<p>' + project.dataPreparationNote + '</p>' : '';

    var dashboardFeaturesHtml = project.dashboardFeatures ?
      '<h4 class="modal__section-header"><span class="modal__icon">' + iconSvg.process + '</span>' + project.dashboardFeatures + '</h4>' : '';

    var co2EmissionsByCountryHtml = project.co2EmissionsByCountry ?
      '<h4 class="modal__section-header"><span class="modal__icon">' + iconSvg.findings + '</span>' + project.co2EmissionsByCountry + '</h4>' +
      (project.co2EmissionsByCountryText ? '<p>' + project.co2EmissionsByCountryText + '</p>' : '') : '';

    var annualCo2EmissionsHtml = project.annualCo2Emissions ?
      '<h4 class="modal__section-header"><span class="modal__icon">' + iconSvg.process + '</span>' + project.annualCo2Emissions + '</h4>' +
      (project.annualCo2EmissionsText ? '<p>' + project.annualCo2EmissionsText + '</p>' : '') : '';

    var co2VsPopulationHtml = project.co2VsPopulation ?
      '<h4 class="modal__section-header"><span class="modal__icon">' + iconSvg.findings + '</span>' + project.co2VsPopulation + '</h4>' +
      (project.co2VsPopulationText ? '<p>' + project.co2VsPopulationText + '</p>' : '') : '';

    var interactiveSlicersHtml = project.interactiveSlicers ?
      '<h4 class="modal__section-header"><span class="modal__icon">' + iconSvg.tools + '</span>' + project.interactiveSlicers + '</h4>' +
      (project.interactiveSlicersText ? '<p>' + project.interactiveSlicersText.replace(/\n/g, '<br>') + '</p>' : '') : '';

    var keyFindingsHtml = project.keyFindings ?
      '<h4 class="modal__section-header"><span class="modal__icon">' + iconSvg.findings + '</span>' + project.keyFindings + '</h4>' +
      (project.keyFindingsTitle ? '<h5 class="modal__subheading">' + project.keyFindingsTitle + '</h5>' : '') +
      (project.keyFindingsText ? '<p>' + project.keyFindingsText + '</p>' : '') : '';

    var emissionsConcentrationHtml = project.emissionsConcentration ?
      '<h4 class="modal__section-header">' + project.emissionsConcentration + '</h4>' +
      (project.emissionsConcentrationText ? '<p>' + project.emissionsConcentrationText.replace(/\n/g, '<br>').replace('This concentration reflects the influence of:', '<strong>This concentration reflects the influence of:</strong>') + '</p>' : '') : '';

    var populationAssociatedWithEmissionsHtml = project.populationAssociatedWithEmissions ?
      '<h4 class="modal__section-header">' + project.populationAssociatedWithEmissions + '</h4>' +
      (project.populationAssociatedWithEmissionsText ? '<p>' + project.populationAssociatedWithEmissionsText.replace(/\n/g, '<br>') + '</p>' : '') : '';

    var totalAndPerCapitaEmissionsHtml = project.totalAndPerCapitaEmissions ?
      '<h4 class="modal__section-header">' + project.totalAndPerCapitaEmissions + '</h4>' +
      (project.totalAndPerCapitaEmissionsText ? '<p>' + project.totalAndPerCapitaEmissionsText.replace(/\n/g, '<br>') + '</p>' : '') : '';

    var historicalGrowthHtml = project.historicalGrowth ?
      '<h4 class="modal__section-header">' + project.historicalGrowth + '</h4>' +
      (project.historicalGrowthText ? '<p>' + project.historicalGrowthText.replace(/\n/g, '<br>') + '</p>' : '') : '';

    var china2021IncreaseHtml = project.china2021Increase ?
      '<h4 class="modal__section-header">' + project.china2021Increase + '</h4>' +
      (project.china2021IncreaseText ? '<p>' + project.china2021IncreaseText.replace(/\n/g, '<br>') + '</p>' : '') : '';

    var limitationsHtml = project.limitations ?
      '<h4 class="modal__section-header">' + project.limitations + '</h4>' +
      (project.datasetLimitations ? '<h5 class="modal__subheading">' + project.datasetLimitations + '</h5>' : '') +
      (project.datasetLimitationsText ? '<p>' + project.datasetLimitationsText + '</p>' : '') +
      (project.datasetLimitationSections ? project.datasetLimitationSections.map(function (section) {
        return '<h5 class="modal__subheading">' + section.title + '</h5><p>' + section.text + '</p>';
      }).join('') : '') : '';

    var conclusionHtml = project.conclusion ?
      '<h4 class="modal__section-header">' + project.conclusion + '</h4>' +
      (project.conclusionText ? '<p>' + project.conclusionText.replace(/\n/g, '<br>') + '</p>' : '') : '';

    var skillsHtml = project.skills.map(function (skill) {
      return '<span class="modal__tag">' + skill + '</span>';
    }).join('');

    var dashboardImagesHtml = project.dashboardImages && project.dashboardImages.length > 0 ?
      '<section class="modal__gallery" aria-label="Dashboard screenshots">' +
      '<h4 class="modal__section-header">Dashboard screenshots</h4>' +
      '<div class="modal__gallery-grid"><figure class="modal__gallery-item"><img src="' + project.dashboardImages[0].src + '" alt="' + project.dashboardImages[0].alt + '" loading="lazy" tabindex="0" role="button"><figcaption>' + project.dashboardImages[0].caption + '</figcaption></figure>' +
      '</div></section>' : '';

    var dashboardImagesAfterLinksHtml = project.dashboardImages && project.dashboardImages.length > 1 ?
      '<section class="modal__gallery modal__gallery--after-links" aria-label="Additional dashboard screenshots">' +
      '<h4 class="modal__section-header">More dashboard screenshots</h4>' +
      '<div class="modal__gallery-grid">' + project.dashboardImages.slice(1).map(function (image) {
        return '<figure class="modal__gallery-item"><img src="' + image.src + '" alt="' + image.alt + '" loading="lazy" tabindex="0" role="button"><figcaption>' + image.caption + '</figcaption></figure>';
      }).join('') +
      '</div></section>' : '';

    var projectObjectiveHtml = project.projectObjective ?
      '<h4 class="modal__section-header">' + project.projectObjective + '</h4>' +
      (project.projectObjectiveQuestions ? '<ul>' + project.projectObjectiveQuestions.map(function (question) {
        return '<li>' + question + '</li>';
      }).join('') + '</ul>' : '') +
      (project.projectObjectiveText ? '<p>' + project.projectObjectiveText + '</p>' : '') : '';

    var projectOverviewHtml = project.projectOverviewTitle ?
      '<h4 class="modal__section-header">' + project.projectOverviewTitle + '</h4>' +
      (project.projectOverviewText ? '<p>' + project.projectOverviewText.replace(/\n/g, '<br>') + '</p>' : '') +
      (project.projectOverviewQuestions ? '<ul>' + project.projectOverviewQuestions.map(function (question) {
        return '<li>' + question + '</li>';
      }).join('') + '</ul>' : '') +
      (project.projectOverviewConclusion ? '<p>' + project.projectOverviewConclusion + '</p>' : '') : '';

    var businessObjectiveHtml = project.businessObjectiveTitle ?
      '<h4 class="modal__section-header">' + project.businessObjectiveTitle + '</h4>' +
      (project.businessObjectiveText ? '<p>' + project.businessObjectiveText.replace(/\n/g, '<br>') + '</p>' : '') +
      (project.businessObjectiveAreas ? '<ul>' + project.businessObjectiveAreas.map(function (area) {
        return '<li>' + area + '</li>';
      }).join('') + '</ul>' : '') : '';

    var salesToolsHtml = project.salesToolsTitle ?
      '<h4 class="modal__section-header">' + project.salesToolsTitle + '</h4>' +
      (project.salesTools ? '<div class="modal__tools-table">' + project.salesTools.map(function (row) {
        return '<div class="modal__tools-row"><strong>' + row.tool + '</strong><span>' + row.usage + '</span></div>';
      }).join('') + '</div>' : '') : '';

    var powerBiToolsHtml = project.powerBiToolsTitle ?
      '<h4 class="modal__section-header">' + project.powerBiToolsTitle + '</h4>' +
      (project.powerBiTools ? '<div class="modal__tools-table">' + project.powerBiTools.map(function (row) {
        return '<div class="modal__tools-row"><strong>' + row.area + '</strong><span>' + row.skills + '</span></div>';
      }).join('') + '</div>' : '') : '';

    var powerBiHighlightsHtml = project.powerBiHighlightsTitle ?
      '<h4 class="modal__section-header">' + project.powerBiHighlightsTitle + '</h4>' +
      (project.powerBiCorePerformanceTitle ? '<h4 class="modal__section-header">' + project.powerBiCorePerformanceTitle + '</h4>' : '') +
      (project.powerBiCorePerformanceIntro ? '<p>' + project.powerBiCorePerformanceIntro + '</p>' : '') +
      (project.powerBiCorePerformance ? '<div class="modal__tools-table">' + project.powerBiCorePerformance.map(function (row) {
        return '<div class="modal__tools-row"><strong>' + row.metric + '</strong><span>' + row.result + '</span></div>';
      }).join('') + '</div>' : '') +
      (project.powerBiCorePerformanceText ? '<p>' + project.powerBiCorePerformanceText + '</p>' : '') +
      (project.powerBiRevenueTitle ? '<h4 class="modal__section-header">' + project.powerBiRevenueTitle + '</h4><p>' + project.powerBiRevenueText.replace(/\n/g, '<br>') + '</p>' : '') +
      (project.powerBiBrandTitle ? '<h4 class="modal__section-header">' + project.powerBiBrandTitle + '</h4><p>' + project.powerBiBrandText.replace(/\n/g, '<br>') + '</p>' : '') +
      (project.powerBiColorTitle ? '<h4 class="modal__section-header">' + project.powerBiColorTitle + '</h4>' : '') +
      (project.powerBiColorIntro ? '<p>' + project.powerBiColorIntro + '</p>' : '') +
      (project.powerBiColorRows ? '<div class="modal__tools-table">' + project.powerBiColorRows.map(function (row) {
        return '<div class="modal__tools-row"><strong>' + row.metric + '</strong><span>' + row.result + '</span></div>';
      }).join('') + '</div>' : '') +
      (project.powerBiColorText ? '<p>' + project.powerBiColorText.replace(/\n/g, '<br>') + '</p>' : '') +
      (project.powerBiIncomeTitle ? '<h4 class="modal__section-header">' + project.powerBiIncomeTitle + '</h4><p>' + project.powerBiIncomeText.replace(/\n/g, '<br>') + '</p>' : '') +
      (project.powerBiGrowthTitle ? '<h4 class="modal__section-header">' + project.powerBiGrowthTitle + '</h4><p>' + project.powerBiGrowthText + '</p>' : '') : '';

    var powerBiRecommendationsHtml = project.powerBiRecommendationsTitle ?
      '<h4 class="modal__section-header">' + project.powerBiRecommendationsTitle + '</h4>' +
      (project.powerBiRecommendations ? project.powerBiRecommendations.map(function (recommendation) {
        return '<h5 class="modal__subheading">' + recommendation.title + '</h5>' +
          (recommendation.text ? '<p>' + recommendation.text + '</p>' : '') +
          (recommendation.action ? '<p><strong>Recommended action:</strong> ' + recommendation.action + '</p>' : '');
      }).join('') : '') : '';

    var powerBiReflectionHtml = project.powerBiReflectionTitle ?
      '<h4 class="modal__section-header">' + project.powerBiReflectionTitle + '</h4>' +
      (project.powerBiReflectionText ? '<p>' + project.powerBiReflectionText.replace(/\n/g, '<br>') + '</p>' : '') : '';

    var approachHtml = project.approachTitle ?
      '<h4 class="modal__section-header">' + project.approachTitle + '</h4>' +
      (project.approachIntro ? '<p>' + project.approachIntro + '</p>' : '') +
      (project.approachSteps ? '<ul>' + project.approachSteps.map(function (step) {
        return '<li>' + step + '</li>';
      }).join('') + '</ul>' : '') : '';

    var demonstratedSkillsHtml = project.demonstratedSkillsTitle ?
      '<h4 class="modal__section-header">' + project.demonstratedSkillsTitle + '</h4>' +
      (project.demonstratedSkillsIntro ? '<p>' + project.demonstratedSkillsIntro + '</p>' : '') +
      (project.demonstratedSkills ? '<ul>' + project.demonstratedSkills.map(function (skill) {
        return '<li>' + skill + '</li>';
      }).join('') + '</ul>' : '') +
      (project.demonstratedSkillsConclusion ? '<p>' + project.demonstratedSkillsConclusion + '</p>' : '') : '';

    var dashboardFindingsHtml = '';
    if (project.dashboardKpisTitle) {
      dashboardFindingsHtml +=
        '<h4 class="modal__section-header">' + project.dashboardKpisTitle + '</h4>' +
        (project.dashboardKpisIntro ? '<p>' + project.dashboardKpisIntro + '</p>' : '') +
        (project.dashboardKpis ? '<div class="modal__tools-table">' + project.dashboardKpis.map(function (row) {
          return '<div class="modal__tools-row"><strong>' + row.metric + '</strong><span>' + row.result + ' — ' + row.meaning + '</span></div>';
        }).join('') + '</div>' : '') +
        (project.dashboardKpisConclusion ? '<p>' + project.dashboardKpisConclusion + '</p>' : '');
    }
    if (project.financialHealthTitle) {
      dashboardFindingsHtml += '<h4 class="modal__section-header">' + project.financialHealthTitle + '</h4>' +
        (project.financialHealthText ? '<p>' + project.financialHealthText.replace(/\n/g, '<br>') + '</p>' : '');
    }
    if (project.profitableProductsTitle) {
      dashboardFindingsHtml += '<h4 class="modal__section-header">' + project.profitableProductsTitle + '</h4>' +
        (project.profitableProductsIntro ? '<p>' + project.profitableProductsIntro + '</p>' : '') +
        (project.profitableProducts ? '<div class="modal__tools-table">' + project.profitableProducts.map(function (row) {
          return '<div class="modal__tools-row"><strong>' + row.metric + '</strong><span>' + row.result + '</span></div>';
        }).join('') + '</div>' : '') +
        (project.profitableProductsText ? '<p>' + project.profitableProductsText.replace(/\n/g, '<br>') + '</p>' : '');
    }
    if (project.cityCogsTitle) {
      dashboardFindingsHtml += '<h4 class="modal__section-header">' + project.cityCogsTitle + '</h4>' +
        (project.cityCogsIntro ? '<p>' + project.cityCogsIntro + '</p>' : '') +
        (project.cityCogs ? '<div class="modal__tools-table">' + project.cityCogs.map(function (row) {
          return '<div class="modal__tools-row"><strong>' + row.metric + '</strong><span>' + row.result + '</span></div>';
        }).join('') + '</div>' : '') +
        (project.cityCogsText ? '<p>' + project.cityCogsText.replace(/\n/g, '<br>') + '</p>' : '');
    }
    if (project.customerActivityTitle) {
      dashboardFindingsHtml += '<h4 class="modal__section-header">' + project.customerActivityTitle + '</h4>' +
        (project.customerActivityIntro ? '<p>' + project.customerActivityIntro + '</p>' : '') +
        (project.customerActivity ? '<div class="modal__tools-table">' + project.customerActivity.map(function (row) {
          return '<div class="modal__tools-row"><strong>' + row.metric + '</strong><span>' + row.result + '</span></div>';
        }).join('') + '</div>' : '') +
        (project.customerActivityText ? '<p>' + project.customerActivityText.replace(/\n/g, '<br>') + '</p>' : '');
    }
    if (project.recommendationsTitle) {
      dashboardFindingsHtml += '<h4 class="modal__section-header">' + project.recommendationsTitle + '</h4>' +
        (project.recommendationsIntro ? '<p>' + project.recommendationsIntro + '</p>' : '') +
        (project.salesRecommendations ? '<ul class="modal__list--plain">' + project.salesRecommendations.map(function (recommendation) {
          return '<li>' + recommendation + '</li>';
        }).join('') + '</ul>' : '');
    }
    if (project.finalTakeawayTitle) {
      dashboardFindingsHtml += '<h4 class="modal__section-header">' + project.finalTakeawayTitle + '</h4>' +
        (project.finalTakeawayText ? '<p>' + project.finalTakeawayText.replace(/\n/g, '<br>') + '</p>' : '');
    }

    var hrToolsHtml = project.hrToolsTitle ?
      '<h4 class="modal__section-header">' + project.hrToolsTitle + '</h4>' +
      (project.hrTools ? '<div class="modal__tools-table">' + project.hrTools.map(function (row) {
        return '<div class="modal__tools-row"><strong>' + row.area + '</strong><span>' + row.tools + '</span></div>';
      }).join('') + '</div>' : '') : '';

    var keySkillsHtml = project.keySkillsTitle ?
      '<h4 class="modal__section-header">' + project.keySkillsTitle + '</h4>' +
      (project.keySkills ? '<ul>' + project.keySkills.map(function (skill) {
        return '<li>' + skill + '</li>';
      }).join('') + '</ul>' : '') : '';

    var dataCleaningHtml = project.dataCleaningTitle ?
      '<h4 class="modal__section-header">' + project.dataCleaningTitle + '</h4>' +
      (project.dataCleaningIntro ? '<p>' + project.dataCleaningIntro + '</p>' : '') +
      (project.dataQualityTitle ? '<h5 class="modal__subheading">' + project.dataQualityTitle + '</h5>' : '') +
      (project.dataQualityRows ? '<div class="modal__tools-table modal__quality-table">' + project.dataQualityRows.map(function (row) {
        return '<div class="modal__tools-row"><strong>' + row.issue + '</strong><span>' + row.resolution + '</span></div>';
      }).join('') + '</div>' : '') +
      (project.dataCleaningConclusion ? '<p>' + project.dataCleaningConclusion + '</p>' : '') : '';

    var dataModelHtml = project.dataModelTitle ?
      '<h4 class="modal__section-header">' + project.dataModelTitle + '</h4>' +
      (project.dataModelIntro ? '<p>' + project.dataModelIntro + '</p>' : '') +
      (project.calculatedFieldsTitle ? '<h5 class="modal__subheading">' + project.calculatedFieldsTitle + '</h5>' : '') +
      (project.calculatedFields ? '<ul>' + project.calculatedFields.map(function (field) {
        return '<li>' + field + '</li>';
      }).join('') + '</ul>' : '') +
      (project.dateModelText ? '<p>' + project.dateModelText + '</p>' : '') +
      (project.dateRelationships ? '<ul>' + project.dateRelationships.map(function (relationship) {
        return '<li>' + relationship + '</li>';
      }).join('') + '</ul>' : '') +
      (project.dateModelConclusion ? '<p>' + project.dateModelConclusion + '</p>' : '') : '';

    var dashboardOverviewHtml = project.dashboardOverviewTitle ?
      '<h4 class="modal__section-header">' + project.dashboardOverviewTitle + '</h4>' +
      (project.dashboardOverviewRows ? '<div class="modal__tools-table modal__dashboard-table">' + project.dashboardOverviewRows.map(function (row) {
        return '<div class="modal__tools-row"><strong>' + row.page + '</strong><span>' + row.purpose + '</span></div>';
      }).join('') + '</div>' : '') : '';

    var interactiveFeaturesHtml = project.interactiveFeaturesTitle ?
      '<h4 class="modal__section-header">' + project.interactiveFeaturesTitle + '</h4>' +
      (project.interactiveFeatures ? '<ul>' + project.interactiveFeatures.map(function (feature) {
        return '<li>' + feature + '</li>';
      }).join('') + '</ul>' : '') : '';

    var hrFindingsHtml = project.hrFindingsSections ? project.hrFindingsSections.map(function (section) {
      return '<h4 class="modal__section-header">' + section.title + '</h4>' +
        (section.bullets ? '<ul>' + section.bullets.map(function (bullet) {
          return '<li>' + bullet + '</li>';
        }).join('') + '</ul>' : '') +
        (section.note ? '<p>' + section.note + '</p>' : '');
    }).join('') : '';

    var keyInsightsHtml = project.keyInsightsTitle ?
      '<h4 class="modal__section-header">' + project.keyInsightsTitle + '</h4>' : '';

    var attritionFindingsHtml = project.attritionFindingsTitle ?
      '<h4 class="modal__section-header">' + project.attritionFindingsTitle + '</h4>' +
      (project.attritionFindings ? '<ul>' + project.attritionFindings.map(function (finding) {
        return '<li>' + finding + '</li>';
      }).join('') + '</ul>' : '') +
      (project.attritionFindingsNote ? '<p>' + project.attritionFindingsNote + '</p>' : '') : '';

    var recommendationsHtml = project.recommendations ?
      '<h4 class="modal__section-header">' + project.recommendationsTitle + '</h4>' +
      (project.recommendationsIntro ? '<p>' + project.recommendationsIntro + '</p>' : '') +
      (project.recommendations ? project.recommendations.map(function (recommendation) {
        return '<h5 class="modal__subheading">' + recommendation.title + '</h5>' +
          (recommendation.text ? '<p>' + recommendation.text + '</p>' : '') +
          (recommendation.bullets ? '<ul>' + recommendation.bullets.map(function (bullet) {
            return '<li>' + bullet + '</li>';
          }).join('') + '</ul>' : '');
      }).join('') : '') : '';

    var limitationsAndLearningHtml = '';
    if (project.keyLimitationsTitle) {
      limitationsAndLearningHtml +=
        '<h4 class="modal__section-header">' + project.keyLimitationsTitle + '</h4>' +
        (project.keyLimitationsIntro ? '<p>' + project.keyLimitationsIntro + '</p>' : '') +
        (project.keyLimitations ? '<ul>' + project.keyLimitations.map(function (limitation) {
          return '<li>' + limitation + '</li>';
        }).join('') + '</ul>' : '');
    }
    if (project.learningTitle) {
      limitationsAndLearningHtml +=
        '<h4 class="modal__section-header">' + project.learningTitle + '</h4>' +
        (project.learningIntro ? '<p>' + project.learningIntro + '</p>' : '') +
        (project.learningTakeawaysTitle ? '<h5 class="modal__subheading">' + project.learningTakeawaysTitle + '</h5>' : '') +
        (project.learningTakeaways ? '<ul>' + project.learningTakeaways.map(function (takeaway) {
          return '<li>' + takeaway + '</li>';
        }).join('') + '</ul>' : '');
    }

    var linksHtml = '';
    if (project.links && project.links.length > 0) {
      linksHtml = project.links.map(function (link) {
        return '<a href="' + link.url + '" class="btn btn--primary" target="_blank" rel="noopener">' + link.label + '</a>';
      }).join('');
    }

    var problemHtml = project.problem ?
      '<h4 class="modal__section-header"><span class="modal__icon">' + iconSvg.problem + '</span>Problem</h4>' +
      '<p>' + project.problem + '</p>' : '';

    modalBody.innerHTML =
      '<h3 id="modalTitle">' + project.title + '</h3>' +
      '<div class="modal__tags">' + tagsHtml + '</div>' +
      '<p>' + project.shortDesc + '</p>' +
      dashboardImagesHtml +
      problemHtml +
      projectOverviewHtml +
      businessObjectiveHtml +
      salesToolsHtml +
      powerBiToolsHtml +
      powerBiHighlightsHtml +
      powerBiRecommendationsHtml +
      powerBiReflectionHtml +
      approachHtml +
      demonstratedSkillsHtml +
      dashboardFindingsHtml +
      objectivesHtml +
      projectObjectiveHtml +
      hrToolsHtml +
      keySkillsHtml +
      dataCleaningHtml +
      dataModelHtml +
      dashboardOverviewHtml +
      interactiveFeaturesHtml +
      keyInsightsHtml +
      hrFindingsHtml +
      attritionFindingsHtml +
      recommendationsHtml +
      limitationsAndLearningHtml +
      toolsHtml +
      technicalSkillsHtml +
      dataPreparationHtml +
      dataPreparationNoteHtml +
      dashboardFeaturesHtml +
      co2EmissionsByCountryHtml +
      annualCo2EmissionsHtml +
      co2VsPopulationHtml +
      interactiveSlicersHtml +
      keyFindingsHtml +
      emissionsConcentrationHtml +
      populationAssociatedWithEmissionsHtml +
      totalAndPerCapitaEmissionsHtml +
      historicalGrowthHtml +
      china2021IncreaseHtml +
      limitationsHtml +
      conclusionHtml +
      '<h4 class="modal__section-header"><span class="modal__icon">' + iconSvg.skills + '</span>Skills Demonstrated</h4>' +
      '<div class="modal__tags">' + skillsHtml + '</div>' +
      (linksHtml ? '<div class="modal__links">' + linksHtml + '</div>' : '') +
      dashboardImagesAfterLinksHtml;

    modalOverlay.classList.add('is-open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('is-open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openLightbox(image) {
    if (!imageLightbox || !imageLightboxImage) return;
    imageLightboxImage.src = image.src;
    imageLightboxImage.alt = image.alt;
    imageLightbox.classList.add('is-open');
    imageLightbox.setAttribute('aria-hidden', 'false');
    imageLightboxClose.focus();
  }

  function closeLightbox() {
    if (!imageLightbox || !imageLightboxImage) return;
    imageLightbox.classList.remove('is-open');
    imageLightbox.setAttribute('aria-hidden', 'true');
    imageLightboxImage.removeAttribute('src');
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });
  }
  if (modalBody) {
    modalBody.addEventListener('click', function (e) {
      var image = e.target.closest('.modal__gallery-item img');
      if (image) openLightbox(image);
    });
    modalBody.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.modal__gallery-item img')) {
        e.preventDefault();
        openLightbox(e.target);
      }
    });
  }
  if (imageLightboxClose) imageLightboxClose.addEventListener('click', closeLightbox);
  if (imageLightbox) {
    imageLightbox.addEventListener('click', function (e) {
      if (e.target === imageLightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && imageLightbox && imageLightbox.classList.contains('is-open')) {
      closeLightbox();
    } else if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) {
      closeModal();
    }
  });

  /* ---------- Render Tools Marquee ---------- */
  var toolsTrack = document.getElementById('toolsTrack');
  var tools = [
    { name: 'Power BI', desc: 'Interactive dashboards and reports with DAX measures and Power Query data transformation.', icon: 'chart' },
    { name: 'VS Code', desc: 'Code editing and project development for building and maintaining analytics portfolio work.', icon: 'code' },
    { name: 'Excel', desc: 'Advanced formulas, pivot tables, conditional formatting, and data cleaning.', icon: 'grid' },
    { name: 'Power Query', desc: 'Data extraction, transformation, and loading (ETL) for analysis workflows.', icon: 'check' },
    { name: 'SQL', desc: 'Querying databases, filtering, aggregating, and managing relational data.', icon: 'database' },
    { name: 'Python', desc: 'Data analysis with pandas and matplotlib, automation, and visualization.', icon: 'code' },
    { name: 'Data Cleaning', desc: 'Handling duplicates, outliers, missing values, mixed formats, and data quality flags.', icon: 'check' },
    { name: 'Data Modeling', desc: 'Designing data structures, relationships, and star schemas for analytics.', icon: 'database' },
    { name: 'Exploratory Data Analysis', desc: 'Discovering patterns, trends, and insights through visual and statistical exploration.', icon: 'chart' },
    { name: 'SPSS', desc: 'Statistical analysis software for hypothesis testing and research data.', icon: 'chart' },
    { name: 'Zotero', desc: 'Reference management for academic and professional research citations.', icon: 'book' }
  ];

  var toolIcons = {
    chart: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    grid: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    database: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    code: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    check: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
    book: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
  };

  function renderTools() {
    if (!toolsTrack) return;
    var toolsDuplicated = tools.concat(tools);
    toolsTrack.innerHTML = toolsDuplicated.map(function (t) {
      var iconHtml = toolIcons[t.icon] || toolIcons.chart;
      return (
        '<button class="tool-item" type="button" data-tool-name="' + t.name + '" data-tool-desc="' + t.desc.replace(/"/g, '&quot;') + '" aria-label="' + t.name + ': ' + t.desc + '">' +
        '<div class="tool-item__icon tool-item__icon--' + t.icon + '">' + iconHtml + '</div>' +
        '<span class="tool-item__name">' + t.name + '</span>' +
        '</button>'
      );
    }).join('');

    // Floating popover for click descriptions
    var popover = document.querySelector('.tools-popover');
    if (!popover) return;
    var activeBtn = null;

    function showPopover(btn) {
      var name = btn.getAttribute('data-tool-name');
      var desc = btn.getAttribute('data-tool-desc');
      popover.innerHTML = '<strong>' + name + '</strong><span>' + desc + '</span>';
      popover.hidden = false;
      popover.classList.add('tools-popover--visible');
      activeBtn = btn;
      // Position below the clicked button
      var rect = btn.getBoundingClientRect();
      var popWidth = 260;
      var left = rect.left + rect.width / 2 - popWidth / 2;
      var top = rect.bottom + 10;
      // Clamp to viewport
      if (left < 8) left = 8;
      if (left + popWidth > window.innerWidth - 8) left = window.innerWidth - 8 - popWidth;
      popover.style.left = left + 'px';
      popover.style.top = top + 'px';
      popover.style.width = popWidth + 'px';
      // Pause marquee
      toolsTrack.style.animationPlayState = 'paused';
    }

    function hidePopover() {
      popover.classList.remove('tools-popover--visible');
      popover.hidden = true;
      activeBtn = null;
      toolsTrack.style.animationPlayState = '';
    }

    // Click to toggle
    toolsTrack.addEventListener('click', function (e) {
      var btn = e.target.closest('.tool-item');
      if (!btn) return;
      e.preventDefault();
      if (activeBtn === btn) {
        hidePopover();
      } else {
        showPopover(btn);
      }
    });

    // Also show on hover (desktop)
    toolsTrack.addEventListener('mouseenter', function (e) {
      var btn = e.target.closest('.tool-item');
      if (!btn) return;
      if (activeBtn !== btn) showPopover(btn);
    }, true);

    // Hide on outside click
    document.addEventListener('click', function (e) {
      if (activeBtn && !popover.contains(e.target) && !e.target.closest('.tool-item')) {
        hidePopover();
      }
    });

    // Hide on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && activeBtn) hidePopover();
    });

    // Hide on scroll
    window.addEventListener('scroll', function () { if (activeBtn) hidePopover(); }, true);
  }

  /* ---------- Animated Counter ---------- */
  function animateCounters() {
    var counters = document.querySelectorAll('[data-count]');
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = parseInt(entry.target.getAttribute('data-count'), 10);
          var current = 0;
          var step = Math.max(1, Math.ceil(target / 30));
          var interval = setInterval(function () {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            entry.target.textContent = current + '+';
          }, 50);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { counterObserver.observe(c); });
  }

  /* ---------- Resume Check ---------- */
  function checkResume() {
    var hint = document.getElementById('resumeHint');
    if (!hint) return;
    fetch('assets/resume.pdf', { method: 'HEAD' })
      .then(function (res) {
        if (!res.ok) throw new Error('Not found');
        hint.textContent = 'Resume PDF is available for download.';
      })
      .catch(function () {
        hint.textContent = 'Resume PDF coming soon — add your resume.pdf to the assets folder to enable download.';
      });
  }

  /* ---------- Interactive Charts ---------- */
  window.portfolioCharts = {};

  function renderCharts() {
    if (typeof Chart === 'undefined') return;

    var colors = getChartColors();
    var data = PORTFOLIO_DATA.chartData;

    Chart.defaults.font.family = "'Work Sans', sans-serif";
    Chart.defaults.color = colors.text;

    // Hires vs Terminations (line chart)
    var hiresCtx = document.getElementById('hiresChart');
    if (hiresCtx) {
      window.portfolioCharts.hires = new Chart(hiresCtx, {
        type: 'line',
        data: {
          labels: data.hiresTerminations.labels,
          datasets: [
            {
              label: 'Hires',
              data: data.hiresTerminations.hires,
              borderColor: colors.primary,
              backgroundColor: colors.primary + '20',
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: colors.primary,
              borderWidth: 2
            },
            {
              label: 'Terminations',
              data: data.hiresTerminations.terminations,
              borderColor: colors.blue,
              backgroundColor: colors.blue + '20',
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: colors.blue,
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { padding: 16, font: { size: 12 } } },
            tooltip: { mode: 'index', intersect: false }
          },
          scales: {
            x: { grid: { color: colors.grid }, ticks: { font: { size: 11 } } },
            y: { grid: { color: colors.grid }, beginAtZero: true, ticks: { font: { size: 11 } } }
          }
        }
      });
    }

    // Department Headcount (bar chart)
    var deptCtx = document.getElementById('deptChart');
    if (deptCtx) {
      window.portfolioCharts.dept = new Chart(deptCtx, {
        type: 'bar',
        data: {
          labels: data.departmentHeadcount.labels,
          datasets: [{
            label: 'Headcount',
            data: data.departmentHeadcount.counts,
            backgroundColor: [colors.primary, colors.blue, colors.accent, colors.gold, colors.purple, colors.blue, colors.primary, colors.accent],
            borderRadius: 6,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11 } } },
            y: { grid: { color: colors.grid }, beginAtZero: true, ticks: { font: { size: 11 } } }
          }
        }
      });
    }

    // Salary Distribution (histogram)
    var salaryCtx = document.getElementById('salaryChart');
    if (salaryCtx) {
      window.portfolioCharts.salary = new Chart(salaryCtx, {
        type: 'bar',
        data: {
          labels: data.salaryDistribution.labels,
          datasets: [{
            label: 'Employees',
            data: data.salaryDistribution.counts,
            backgroundColor: colors.primary,
            borderRadius: 6,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11 } } },
            y: { grid: { color: colors.grid }, beginAtZero: true, ticks: { font: { size: 11 } } }
          }
        }
      });
    }
  }

  /* ---------- Footer Year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Init ---------- */
  renderProjects();
  renderTools();
  renderCharts();
  animateCounters();
  checkResume();
  updateActiveNav();
})();
