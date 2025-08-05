import { translations } from "../localization/language.js";

export function changeLanguage(lang = "pl") {
  localStorage.setItem("lang", lang);
  applyTranslations(lang);
  updateFlagStyle(lang);
}

export function initTranslations() {
  const savedLang = localStorage.getItem("lang");
  const defaultLang =
    savedLang || (navigator.language.startsWith("pl") ? "pl" : "en");

  changeLanguage(defaultLang);

  const langPl = document.getElementById("lang-pl");
  const langEn = document.getElementById("lang-en");

  if (langPl && langEn) {
    langPl.addEventListener("click", () => changeLanguage("pl"));
    langEn.addEventListener("click", () => changeLanguage("en"));
  }
}

function applyTranslations(lang) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.dataset.i18n;
    // Replaced optional chaining with explicit check
    const translation =
      translations[lang] && translations[lang][key]
        ? translations[lang][key]
        : key;
    if (translation) {
      el.textContent = translation;
    }
  });
}

function updateFlagStyle(lang) {
  const langPl = document.querySelector("#lang-pl");
  const langEn = document.querySelector("#lang-en");

  if (langPl && langEn) {
    langPl.classList.toggle("inactive", lang !== "pl");
    langEn.classList.toggle("inactive", lang !== "en");
  }
}

export function getTranslation(key) {
  const lang = localStorage.getItem("lang") || "pl";
  return translations[lang] && translations[lang][key]
    ? translations[lang][key]
    : key;
}
