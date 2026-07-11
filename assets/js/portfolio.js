(function () {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)");
  const imageBase = "assets/images/portfolio/";
  const sourceProjects = Array.isArray(window.PORTFOLIO_PROJECTS)
    ? window.PORTFOLIO_PROJECTS
    : [];

  root.classList.add("js");

  const categoryMap = {
    "v-pills-mob-apps": "Mobile",
    "v-pills-web-apps": "Web",
    "v-pills-backend": "Backend",
    "v-pills-tv-apps": "TV",
    "v-pills-desktop-apps": "Desktop",
    "v-pills-games": "Games",
    "v-pills-more": "Engineering",
  };

  const categoryAccent = {
    Mobile: "#53e6c7",
    Web: "#7c5cff",
    Backend: "#ffce70",
    TV: "#ff806f",
    Desktop: "#80b7ff",
    Games: "#e978ff",
    Engineering: "#98a6b8",
  };

  const projectRecords = sourceProjects
    .filter((group) => categoryMap[group.id])
    .flatMap((group) =>
      (group.list || []).map((project) => ({
        name: project.name,
        category: categoryMap[group.id],
        images: Array.isArray(project.img) ? project.img.filter(Boolean) : [],
      }))
    );

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const clamp = (value, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

  const initials = (value) =>
    value
      .replace(/[^a-zA-Z0-9 ]/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  const header = document.getElementById("site-header");
  const progressBar = document.getElementById("scroll-progress-bar");
  const hero = document.querySelector(".hero");
  const depthCards = Array.from(document.querySelectorAll("[data-depth-card]"));
  const yearNode = document.getElementById("current-year");

  if (yearNode) yearNode.textContent = String(new Date().getFullYear());

  const menuButton = document.getElementById("menu-button");
  const mobileNav = document.getElementById("mobile-nav");

  const setMenu = (open) => {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileNav.hidden = !open;
  };

  menuButton?.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });

  mobileNav?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) setMenu(false);
  });

  const revealNodes = document.querySelectorAll(".reveal");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 }
    );
    revealNodes.forEach((node) => revealObserver.observe(node));
  }

  const navLinks = Array.from(document.querySelectorAll(".desktop-nav a"));
  const navSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        navLinks.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${visible.target.id}`
          );
        });
      },
      { rootMargin: "-20% 0px -60%", threshold: [0.05, 0.2, 0.5] }
    );
    navSections.forEach((section) => sectionObserver.observe(section));
  }

  if (!coarsePointer.matches && !reducedMotion.matches) {
    document.querySelectorAll("[data-tilt]").forEach((node) => {
      node.addEventListener("pointermove", (event) => {
        const rect = node.getBoundingClientRect();
        const x = clamp((event.clientX - rect.left) / rect.width);
        const y = clamp((event.clientY - rect.top) / rect.height);
        node.style.setProperty("--tilt-x", `${(x - 0.5) * 6}deg`);
        node.style.setProperty("--tilt-y", `${(0.5 - y) * 6}deg`);
      });
      node.addEventListener("pointerleave", () => {
        node.style.setProperty("--tilt-x", "0deg");
        node.style.setProperty("--tilt-y", "0deg");
      });
    });

    document.querySelectorAll(".depth-surface").forEach((node) => {
      node.addEventListener("pointermove", (event) => {
        const rect = node.getBoundingClientRect();
        node.style.setProperty(
          "--surface-x",
          String(((event.clientX - rect.left) / rect.width - 0.5) * 3)
        );
        node.style.setProperty(
          "--surface-y",
          String((0.5 - (event.clientY - rect.top) / rect.height) * 3)
        );
      });
      node.addEventListener("pointerleave", () => {
        node.style.setProperty("--surface-x", "0");
        node.style.setProperty("--surface-y", "0");
      });
    });
  }

  let archiveFilter = "All";
  let archiveQuery = "";
  let archiveExpanded = false;
  const archivePageSize = 12;
  const filterNode = document.getElementById("project-filters");
  const gridNode = document.getElementById("project-grid");
  const archiveStatus = document.getElementById("archive-status");
  const archiveMore = document.getElementById("archive-more");
  const projectSearch = document.getElementById("project-search");

  const filterOrder = [
    "All",
    "Mobile",
    "Web",
    "TV",
    "Backend",
    "Desktop",
    "Games",
    "Engineering",
  ];

  const renderFilters = () => {
    if (!filterNode) return;
    filterNode.innerHTML = filterOrder
      .map(
        (filter) =>
          `<button type="button" class="${
            filter === archiveFilter ? "is-active" : ""
          }" data-filter="${escapeHtml(filter)}" aria-pressed="${
            filter === archiveFilter
          }">${escapeHtml(filter)}</button>`
      )
      .join("");
  };

  const getFilteredProjects = () => {
    const query = archiveQuery.trim().toLowerCase();
    return projectRecords.filter((project) => {
      const categoryMatch =
        archiveFilter === "All" || project.category === archiveFilter;
      const queryMatch =
        !query ||
        `${project.name} ${project.category}`.toLowerCase().includes(query);
      return categoryMatch && queryMatch;
    });
  };

  const renderArchive = () => {
    if (!gridNode) return;
    const matching = getFilteredProjects();
    const visible = archiveExpanded
      ? matching
      : matching.slice(0, archivePageSize);

    gridNode.innerHTML = visible
      .map((project) => {
        const firstImage = project.images[0];
        const media = firstImage
          ? `<img src="${imageBase + escapeHtml(firstImage)}" alt="${escapeHtml(
              project.name
            )} project preview" loading="lazy" decoding="async">`
          : `<span class="archive-card__placeholder" aria-hidden="true">${escapeHtml(
              initials(project.name)
            )}</span>`;

        return `<button class="archive-card" type="button" data-open-project="${escapeHtml(
          project.name
        )}" style="--archive-accent: ${
          categoryAccent[project.category] || "#7c5cff"
        }">
          <span class="archive-card__media">${media}</span>
          <span class="archive-card__body">
            <span><span>${escapeHtml(project.category)}</span><strong>${escapeHtml(
          project.name
        )}</strong></span>
            <i class="archive-card__arrow" aria-hidden="true">↗</i>
          </span>
        </button>`;
      })
      .join("");

    gridNode.querySelectorAll("img").forEach((image) => {
      image.addEventListener("error", () => {
        const media = image.closest(".archive-card__media");
        const card = image.closest("[data-open-project]");
        if (!media || !card) return;
        media.innerHTML = `<span class="archive-card__placeholder" aria-hidden="true">${escapeHtml(
          initials(card.dataset.openProject || "AM")
        )}</span>`;
      });
    });

    if (archiveStatus) {
      archiveStatus.textContent = `${matching.length} ${
        matching.length === 1 ? "project" : "projects"
      } found${archiveFilter !== "All" ? ` in ${archiveFilter}` : ""}`;
    }

    if (archiveMore) {
      archiveMore.hidden = matching.length <= archivePageSize;
      archiveMore.innerHTML = archiveExpanded
        ? `Show fewer projects <span aria-hidden="true">↑</span>`
        : `Show more projects <span aria-hidden="true">↓</span>`;
    }
  };

  filterNode?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    archiveFilter = button.dataset.filter || "All";
    archiveExpanded = false;
    renderFilters();
    renderArchive();
  });

  projectSearch?.addEventListener("input", () => {
    archiveQuery = projectSearch.value;
    archiveExpanded = true;
    renderArchive();
  });

  archiveMore?.addEventListener("click", () => {
    archiveExpanded = !archiveExpanded;
    renderArchive();
    if (!archiveExpanded) {
      document.getElementById("archive")?.scrollIntoView({ block: "start" });
    }
  });

  renderFilters();
  renderArchive();

  const projectDialog = document.getElementById("project-dialog");
  const projectDialogTitle = document.getElementById("project-dialog-title");
  const projectDialogCategory = document.getElementById(
    "project-dialog-category"
  );
  const projectDialogGallery = document.getElementById(
    "project-dialog-gallery"
  );
  const projectDialogCount = document.getElementById("project-dialog-count");
  let returnFocusNode = null;

  const closeProjectDialog = () => {
    if (!projectDialog?.open) return;
    projectDialog.close();
  };

  const openProjectDialog = (name, trigger) => {
    if (!projectDialog) return;
    const project = projectRecords.find((item) => item.name === name);
    if (!project) return;
    returnFocusNode = trigger || document.activeElement;

    projectDialogTitle.textContent = project.name;
    projectDialogCategory.textContent = project.category;
    projectDialogCount.textContent = project.images.length
      ? `${project.images.length} interface ${
          project.images.length === 1 ? "screen" : "screens"
        }`
      : "Project archive entry";

    projectDialogGallery.innerHTML = project.images.length
      ? project.images
          .map(
            (image, index) => `<figure><img src="${imageBase + escapeHtml(
              image
            )}" alt="${escapeHtml(project.name)} interface screen ${
              index + 1
            }" loading="lazy" decoding="async"></figure>`
          )
          .join("")
      : `<div class="dialog-empty"><p>No public interface screens are attached to this archive entry yet.</p></div>`;

    projectDialogGallery.querySelectorAll("img").forEach((image) => {
      image.addEventListener("error", () => image.closest("figure")?.remove());
    });

    projectDialog.showModal();
    body.classList.add("dialog-open");
    projectDialog.querySelector("[data-close-project]")?.focus();
  };

  document.addEventListener("click", (event) => {
    const projectTrigger = event.target.closest("[data-open-project]");
    if (projectTrigger) {
      openProjectDialog(projectTrigger.dataset.openProject, projectTrigger);
    }
  });

  document
    .querySelector("[data-close-project]")
    ?.addEventListener("click", closeProjectDialog);

  projectDialog?.addEventListener("click", (event) => {
    if (event.target === projectDialog) closeProjectDialog();
  });

  projectDialog?.addEventListener("close", () => {
    body.classList.remove("dialog-open");
    if (returnFocusNode instanceof HTMLElement) returnFocusNode.focus();
  });

  projectDialog?.addEventListener("cancel", () => {
    body.classList.remove("dialog-open");
  });

  const copilotDialog = document.getElementById("copilot-dialog");
  const copilotMessages = document.getElementById("copilot-messages");
  const copilotForm = document.getElementById("copilot-form");
  const copilotInput = document.getElementById("copilot-input");
  const promptChips = document.getElementById("prompt-chips");
  let copilotReturnFocus = null;

  const copilotAnswers = [
    {
      terms: ["recruiter", "summary", "hire", "overview", "who is"],
      text: "Athul is a React Native-first Mobile Engineer with 7+ years in product teams. He currently works at Buy Me a Coffee, previously shipped consumer mobile and TV products at Riafy, and brings useful web, backend, realtime-media, and automation depth to mobile teams.",
      href: "#experience",
      label: "See the experience timeline",
    },
    {
      terms: ["react native", "mobile", "ios", "android", "app"],
      text: "The strongest mobile evidence is Buy Me a Coffee for creator-product systems, Voicenotes:AI for capture and intelligence, the wellness suite for mobile/TV range, and VCare for a service workflow. React Native is the center of Athul’s stack.",
      href: "#project-bmc",
      label: "Start with Buy Me a Coffee",
    },
    {
      terms: ["ai", "artificial", "voice", "intelligence", "notes"],
      text: "Voicenotes:AI is the clearest AI-facing project: a mobile capture experience for turning voice, meetings, ideas, and moments into something searchable and useful. This portfolio copilot is also intentionally built around grounded, local answers.",
      href: "#project-voicenotes",
      label: "View Voicenotes:AI",
    },
    {
      terms: ["realtime", "real-time", "webrtc", "media", "stream", "socket", "vlc", "watch party"],
      text: "Yes. Athul’s engineering archive includes WebRTC and Socket.IO integrations, a watch-party experiment, custom iframe/VLC player work, device media access, and React Native media tooling—useful experience for synchronized or media-heavy products.",
      href: "#profile",
      label: "See realtime capability",
    },
    {
      terms: ["tv", "television", "living room"],
      text: "Athul has worked across TV learning and wellness surfaces, including piano, craft, nursery rhymes, mindfulness, yoga, drawing, recipes, and kids content. That range sits alongside his mobile product background rather than as a separate specialty.",
      href: "#archive",
      label: "Browse the TV archive",
      filter: "TV",
    },
    {
      terms: ["web", "backend", "node", "full stack", "full-stack", "api", "desktop", "electron"],
      text: "Beyond mobile, Athul has shipped React web experiences and admin consoles, Node.js/Python backend work, Electron desktop experiments, Firebase/AWS delivery, and product automation. The value is end-to-end context, not a claim that every layer is the same depth.",
      href: "#archive",
      label: "Browse the wider archive",
    },
    {
      terms: ["experience", "career", "current", "company", "work history"],
      text: "Athul is a Mobile Engineer at Buy Me a Coffee (2022–present). Before that he was a Software Developer at Riafy Technologies (2019–2022) and an independent Web Developer (2017–2019), with earlier startup and full-stack training experience.",
      href: "#experience",
      label: "Open experience",
    },
    {
      terms: ["education", "degree", "college", "study"],
      text: "Athul holds a B.Tech in Computer Science and Engineering (2014–2018). His path into software started earlier through self-directed HTML/CSS learning and later an ICT Academy full-stack certification.",
      href: "#experience",
      label: "See the career path",
    },
    {
      terms: ["project", "how many", "archive", "range", "portfolio"],
      text: `The archive contains ${projectRecords.length} product builds and engineering explorations across mobile, web, backend, TV, desktop, games, and systems work. The six selected stories are the clearest visual evidence; the archive shows breadth.`,
      href: "#archive",
      label: "Explore the project archive",
    },
    {
      terms: ["contact", "email", "reach", "talk", "connect"],
      text: "The simplest route is email: athulchelad@gmail.com. You can also find Athul on LinkedIn and GitHub from the contact section.",
      href: "#contact",
      label: "Go to contact",
    },
  ];

  const getCopilotAnswer = (query) => {
    const normalized = query.toLowerCase();
    const scored = copilotAnswers
      .map((answer) => ({
        answer,
        score: answer.terms.reduce(
          (total, term) => total + (normalized.includes(term) ? term.length : 0),
          0
        ),
      }))
      .sort((a, b) => b.score - a.score)[0];

    if (scored?.score > 0) return scored.answer;
    return {
      text: "The short version: Athul is strongest in React Native mobile product engineering, with enough web, backend, realtime-media, TV, desktop, and automation experience to understand the whole product surface. Try asking about a platform, career history, AI, or media work.",
      href: "#profile",
      label: "See the profile",
    };
  };

  const addMessage = (role, text, link) => {
    if (!copilotMessages) return null;
    const message = document.createElement("div");
    message.className = `message message--${role}`;
    if (role === "assistant") {
      const icon = document.createElement("span");
      icon.textContent = "✦";
      message.append(icon);
    }
    const bubble = document.createElement("div");
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    bubble.append(paragraph);
    if (link?.href) {
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = `${link.label || "View evidence"} ↗`;
      anchor.addEventListener("click", () => copilotDialog?.close());
      bubble.append(anchor);
    }
    message.append(bubble);
    copilotMessages.append(message);
    copilotMessages.scrollTop = copilotMessages.scrollHeight;
    return message;
  };

  const addTyping = () => {
    if (!copilotMessages) return null;
    const message = document.createElement("div");
    message.className = "message message--assistant message--typing";
    message.innerHTML = "<span>✦</span><div><i></i><i></i><i></i></div>";
    copilotMessages.append(message);
    copilotMessages.scrollTop = copilotMessages.scrollHeight;
    return message;
  };

  const applyAnswerContext = (answer) => {
    if (!answer.filter) return;
    archiveFilter = answer.filter;
    archiveExpanded = true;
    archiveQuery = "";
    if (projectSearch) projectSearch.value = "";
    renderFilters();
    renderArchive();
  };

  const askCopilot = (query) => {
    const clean = query.trim();
    if (!clean) return;
    addMessage("user", clean);
    if (copilotInput) copilotInput.value = "";
    const typing = addTyping();
    const answer = getCopilotAnswer(clean);
    window.setTimeout(() => {
      typing?.remove();
      addMessage("assistant", answer.text, answer);
      applyAnswerContext(answer);
    }, reducedMotion.matches ? 0 : 480);
  };

  const openCopilot = (trigger) => {
    if (!copilotDialog) return;
    copilotReturnFocus = trigger || document.activeElement;
    copilotDialog.showModal();
    body.classList.add("dialog-open");
    window.setTimeout(() => copilotInput?.focus(), 50);
  };

  const closeCopilot = () => copilotDialog?.close();

  document.querySelectorAll("[data-open-copilot]").forEach((button) => {
    button.addEventListener("click", () => openCopilot(button));
  });

  document
    .querySelector("[data-close-copilot]")
    ?.addEventListener("click", closeCopilot);

  copilotDialog?.addEventListener("click", (event) => {
    if (event.target === copilotDialog) closeCopilot();
  });

  copilotDialog?.addEventListener("close", () => {
    body.classList.remove("dialog-open");
    if (copilotReturnFocus instanceof HTMLElement) copilotReturnFocus.focus();
  });

  copilotDialog?.addEventListener("cancel", () => {
    body.classList.remove("dialog-open");
  });

  copilotForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    askCopilot(copilotInput?.value || "");
  });

  promptChips?.addEventListener("click", (event) => {
    const prompt = event.target.closest("[data-prompt]")?.dataset.prompt;
    if (prompt) askCopilot(prompt);
  });

  const canvas = document.getElementById("spatial-canvas");
  const context = canvas?.getContext("2d");
  let canvasWidth = 0;
  let canvasHeight = 0;
  let canvasDpr = 1;
  let points = [];
  let pointerX = 0;
  let pointerY = 0;
  let lastCanvasFrame = 0;
  let needsScrollUpdate = true;

  const makePoints = () => {
    const count = window.innerWidth < 700 ? 48 : 88;
    points = Array.from({ length: count }, (_, index) => {
      const y = 1 - (index / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * index;
      return {
        x: Math.cos(theta) * radius,
        y,
        z: Math.sin(theta) * radius,
      };
    });
  };

  const resizeCanvas = () => {
    if (!canvas || !context || !hero) return;
    const rect = hero.getBoundingClientRect();
    canvasDpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvasWidth = Math.max(1, Math.round(rect.width));
    canvasHeight = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(canvasWidth * canvasDpr);
    canvas.height = Math.round(canvasHeight * canvasDpr);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    context.setTransform(canvasDpr, 0, 0, canvasDpr, 0, 0);
    makePoints();
  };

  const rotatePoint = (point, angleY, angleX) => {
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const x1 = point.x * cosY - point.z * sinY;
    const z1 = point.z * cosY + point.x * sinY;
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    return {
      x: x1,
      y: point.y * cosX - z1 * sinX,
      z: z1 * cosX + point.y * sinX,
    };
  };

  const drawCanvas = (time, heroProgress) => {
    if (!context || !canvas || reducedMotion.matches || document.hidden) return;
    if (time - lastCanvasFrame < 32) return;
    lastCanvasFrame = time;
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    const centerX = canvasWidth * (window.innerWidth < 900 ? 0.54 : 0.76);
    const centerY = canvasHeight * (window.innerWidth < 900 ? 0.7 : 0.46);
    const radius = Math.min(canvasWidth, canvasHeight) * (window.innerWidth < 900 ? 0.23 : 0.31);
    const angleY = time * 0.00008 + heroProgress * 0.95 + pointerX * 0.22;
    const angleX = -0.16 + pointerY * 0.14 + heroProgress * 0.16;
    const projected = points.map((point) => {
      const rotated = rotatePoint(point, angleY, angleX);
      const scale = 1 / (1.7 - rotated.z * 0.42);
      return {
        x: centerX + rotated.x * radius * scale,
        y: centerY + rotated.y * radius * scale,
        z: rotated.z,
        scale,
      };
    });

    context.lineWidth = 0.65;
    for (let i = 0; i < projected.length; i += 1) {
      const a = projected[i];
      for (let j = i + 1; j < projected.length; j += 1) {
        const b = projected[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 62) continue;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.strokeStyle = `rgba(124, 92, 255, ${
          (1 - distance / 62) * 0.13
        })`;
        context.stroke();
      }
    }

    projected.forEach((point, index) => {
      const mint = index % 7 === 0;
      context.beginPath();
      context.arc(point.x, point.y, Math.max(0.7, point.scale * 2.1), 0, Math.PI * 2);
      context.fillStyle = mint
        ? `rgba(83, 230, 199, ${0.34 + point.z * 0.12})`
        : `rgba(166, 150, 255, ${0.25 + point.z * 0.1})`;
      context.fill();
    });
  };

  hero?.addEventListener("pointermove", (event) => {
    if (coarsePointer.matches) return;
    const rect = hero.getBoundingClientRect();
    pointerX = clamp((event.clientX - rect.left) / rect.width, 0, 1) - 0.5;
    pointerY = clamp((event.clientY - rect.top) / rect.height, 0, 1) - 0.5;
  });

  const updateScrollScene = () => {
    const scrollTop = window.scrollY || 0;
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const pageProgress = clamp(scrollTop / maxScroll);
    if (progressBar) progressBar.style.transform = `scaleX(${pageProgress})`;
    header?.classList.toggle("is-scrolled", scrollTop > 28);

    const heroProgress = hero
      ? clamp(scrollTop / Math.max(1, hero.offsetHeight * 0.92))
      : 0;
    hero?.style.setProperty("--hero-scroll", heroProgress.toFixed(4));

    if (!reducedMotion.matches) {
      depthCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;
        const progress = clamp(
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        );
        card.style.setProperty("--card-progress", progress.toFixed(4));
      });
    }
    return heroProgress;
  };

  let cachedHeroProgress = 0;
  const motionLoop = (time) => {
    if (needsScrollUpdate) {
      cachedHeroProgress = updateScrollScene();
      needsScrollUpdate = false;
    }
    drawCanvas(time, cachedHeroProgress);
    window.requestAnimationFrame(motionLoop);
  };

  window.addEventListener(
    "scroll",
    () => {
      needsScrollUpdate = true;
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    resizeCanvas();
    needsScrollUpdate = true;
  });

  reducedMotion.addEventListener?.("change", () => {
    resizeCanvas();
    needsScrollUpdate = true;
  });

  resizeCanvas();
  updateScrollScene();
  window.requestAnimationFrame(motionLoop);
})();
