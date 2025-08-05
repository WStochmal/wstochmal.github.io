document.addEventListener("DOMContentLoaded", () => {
  const projectsElements = document.querySelectorAll(".project-element");
  const projectWindow = document.getElementById("project-window");
  const projectsList = document.querySelector(".projects-list");
  const closeButton = document.getElementById("close");
  const nameEl = document.getElementById("project-name");
  const descEl = document.getElementById("project-description");
  const overlay = document.querySelector(".project-overlay");
  const projectHeader = document.getElementById("project-header");
  const projectWindowContent = document.getElementById(
    "project-window-content"
  );
  const lang = localStorage.getItem("lang") || "pl";

  const mouseCursor = document.querySelector("#mouseCursor");

  const sections = {
    details: document.getElementById("project-details"),
    services: document.getElementById("project-services"),
    technologies: document.getElementById("project-technologies"),
    media: document.getElementById("project-media"),
  };

  // Update project content
  function updateProjectContent(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    // Update header
    nameEl.textContent =
      typeof data.name === "object" ? data.name[lang] : data.name || "";
    descEl.textContent =
      typeof data.description === "object"
        ? data.description[lang]
        : data.description || "";

    // Details section
    renderSection(
      sections.details,
      () => {
        if (!data.details) return null;
        const tbody = document.createElement("tbody");
        const tr = document.createElement("tr");
        [
          data.details.client && data.details.client[lang],
          data.details.location && data.details.location[lang],
          data.details.type && data.details.type[lang],
        ].forEach((val) => {
          const td = document.createElement("td");
          td.textContent = val || "-";
          tr.appendChild(td);
        });

        return tr;
      },
      ".project-section-content-table-body"
    );

    // Services section
    renderSection(sections.services, () => {
      if (!Array.isArray(data.services)) return null;
      const ul = document.createElement("ul");
      data.services.forEach((service) => {
        const li = document.createElement("li");
        li.textContent = service;
        ul.appendChild(li);
      });
      return ul;
    });

    // Technologies section
    renderSection(sections.technologies, () => {
      if (!Array.isArray(data.technologies)) return null;
      const container = document.createElement("div");
      container.classList.add("technologies-container");
      data.technologies.forEach((tech) => {
        const item = document.createElement("div");
        item.textContent = tech;
        container.appendChild(item);
      });
      return container;
    });

    // Media section
    renderSection(sections.media, () => {
      if (!Array.isArray(data.media)) return null;
      const container = document.createElement("div");
      data.media.forEach((media) => {
        if (media.type === "image") {
          const newMedia = document.createElement("img");
          newMedia.classList.add("project-media");
          newMedia.src = media.src;
          newMedia.alt = media.alt || "";
          newMedia.style.maxWidth = "100%";
          newMedia.style.marginTop = "10px";
          container.appendChild(newMedia);
        } else if (media.type === "video") {
          const newMedia = document.createElement("iframe");
          newMedia.classList.add("project-media");
          newMedia.src = media.src;
          newMedia.title = media.alt || "";
          newMedia.allow =
            "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          newMedia.allowFullscreen = true;
          newMedia.style.width = "100%";
          newMedia.style.height = "400px";
          container.appendChild(newMedia);
        }
      });
      return container;
    });

    // Other Projects section
    const otherProjectsContainer =
      document.getElementById("project-list-other");
    otherProjectsContainer.innerHTML = "";
    const otherProjectsHeader = document.createElement("h4");
    otherProjectsHeader.classList.add("project-section-header");
    otherProjectsHeader.textContent =
      lang === "en" ? "Other Projects" : "Pozostałe projekty";
    otherProjectsContainer.appendChild(otherProjectsHeader);

    const otherProjectsList = document.createElement("div");
    otherProjectsList.classList.add("other-projects-list");

    let index = 1;
    projectsElements.forEach((otherElement) => {
      const otherProjectId = otherElement.getAttribute("data-id");
      if (otherProjectId !== projectId) {
        const otherProjectData = projectsData[otherProjectId];
        if (otherProjectData) {
          const projectItem = document.createElement("div");
          projectItem.classList.add("other-project-element");
          projectItem.setAttribute("data-id", otherProjectId);

          const projectHeader = document.createElement("h4");
          const projectLink = document.createElement("a");
          projectLink.href = "#";
          projectLink.textContent = `${String(index).padStart(2, "0")}. `;

          const projectName = document.createElement("span");
          const name =
            typeof otherProjectData.name === "object"
              ? otherProjectData.name[lang]
              : otherProjectData.name;

          projectName.textContent = name || otherElement.textContent;

          projectHeader.appendChild(projectLink);
          projectHeader.appendChild(projectName);
          projectItem.appendChild(projectHeader);

          projectItem.addEventListener("click", (e) => {
            e.preventDefault();
            updateProjectContent(otherProjectId);
          });

          otherProjectsList.appendChild(projectItem);
          index++;
        }
      }
    });

    if (otherProjectsList.hasChildNodes()) {
      otherProjectsContainer.appendChild(otherProjectsList);
      otherProjectsContainer.style.display = "block";
    } else {
      otherProjectsContainer.style.display = "none";
    }
  }

  // Generic section rendering function
  function renderSection(
    sectionEl,
    contentBuilderFn,
    contentSelector = ".project-section-content"
  ) {
    const contentContainer = sectionEl.querySelector(contentSelector);
    contentContainer.innerHTML = "";
    const content = contentBuilderFn();
    sectionEl.style.display =
      content && content.hasChildNodes() ? "block" : "none";
    if (content) contentContainer.appendChild(content);
  }

  // Handle project element click
  projectsElements.forEach((element) => {
    const projectId = element.getAttribute("data-id");
    element.addEventListener("click", () => {
      document.body.style.overflowY = "hidden";
      projectWindow.classList.add("show");
      projectsList.classList.add("hide");
      updateProjectContent(projectId);
      animateOverlay();
    });
    element.addEventListener("mouseenter", () => {
      console.log("hovered");
      mouseCursor.classList.add("-hovered");
      mouseCursor.innerHTML = `<span>${
        lang === "en" ? "View" : "Zobacz"
      }</span>`;
    });
    element.addEventListener("mouseleave", () => {
      mouseCursor.classList.remove("-hovered");
      mouseCursor.innerHTML = `<span></span>`;
    });
  });

  const animateOverlay = () => {
    setTimeout(() => {
      overlay.style.transform = `translateX(-100%)`;
      setTimeout(() => {
        overlay.style.transition = "none";
        overlay.offsetHeight;
        overlay.style.transform = "translateX(100%)";
        setTimeout(() => {
          overlay.style.transition = "transform 1.6s";
        }, 50);
      }, 800);
    }, 400);
  };

  // Handle close button
  closeButton.addEventListener("click", () => {
    document.body.style.overflowY = "auto";
    projectWindow.classList.remove("show");
    projectsList.classList.remove("hide");
    resetProjectContent();
  });

  // Reset project content
  function resetProjectContent() {
    overlay.style.transform = "translateX(0%)";
    overlay.style.transition = "transform 0.8s";

    nameEl.textContent = "";
    descEl.textContent = "";
    Object.values(sections).forEach((section) => {
      section.style.display = "none";
      section.querySelector(".project-section-content").innerHTML = "";
    });
    const otherProjectsContainer =
      document.getElementById("project-list-other");
    otherProjectsContainer.innerHTML = "";
  }
});
