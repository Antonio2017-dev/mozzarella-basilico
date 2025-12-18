(function () {
  const DEFAULT_LANG = "en";
  const SUPPORTED = ["en", "es", "it"];

  // Phone / WhatsApp
  const PHONE_E164 = "+18097761737";
  const PHONE_TEL = "tel:+18097761737";

  const waMsg = {
    en: "Hi! I’d like to reserve a table at Mozzarella & Basilico.",
    es: "¡Hola! Me gustaría reservar una mesa en Mozzarella & Basilico.",
    it: "Ciao! Vorrei prenotare un tavolo da Mozzarella & Basilico."
  };

  function getLang() {
    const saved = localStorage.getItem("lang");
    if (saved && SUPPORTED.includes(saved)) return saved;
    const nav = (navigator.language || "").slice(0, 2).toLowerCase();
    return SUPPORTED.includes(nav) ? nav : DEFAULT_LANG;
  }

  function setLang(lang) {
    localStorage.setItem("lang", lang);
    applyLang(lang);
    updateLangButtons(lang);
    updateReserveLinks(lang);
  }

  function applyLang(lang) {
    const dict = window.I18N?.[lang];
    if (!dict) return;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    document.documentElement.setAttribute("lang", lang);
  }

  function updateLangButtons(lang) {
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === lang);
    });
  }

  function updateReserveLinks(lang) {
    const msg = encodeURIComponent(waMsg[lang] || waMsg.en);
    const waLink = `https://wa.me/${PHONE_E164.replace("+","")}?text=${msg}`;

    document.querySelectorAll("[data-whatsapp]").forEach((a) => a.setAttribute("href", waLink));
    document.querySelectorAll("[data-call]").forEach((a) => a.setAttribute("href", PHONE_TEL));
  }

  // Bind buttons
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang-btn]");
    if (!btn) return;
    setLang(btn.getAttribute("data-lang-btn"));
  });

  // Init
  const lang = getLang();
  applyLang(lang);
  updateLangButtons(lang);
  updateReserveLinks(lang);
})();
