document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#contact-modal");
  const form = document.querySelector("#priority-lead-form");
  const status = document.querySelector("#priority-form-status");
  const openTriggers = document.querySelectorAll("[data-open-contact-modal]");
  const closeTriggers = document.querySelectorAll("[data-close-contact-modal]");
  const defaultFormName = "SpiegaL'essenziale";
  const defaultUtm = {
    utm_source: "site",
    utm_medium: "modal",
    utm_campaign: "spiega-lessenziale"
  };

  if (!modal || !form) return;

  const pathname = window.location.pathname.toLowerCase();
  const htmlLang = (document.documentElement.lang || "").toLowerCase();

  const pageLang = (() => {
    if (pathname.endsWith("italiano.html") || htmlLang.startsWith("it")) return "it";
    if (pathname.endsWith("english.html") || htmlLang.startsWith("en")) return "en";
    if (pathname.endsWith("portugal.html") || htmlLang === "pt-pt") return "pt-pt";
    return "pt";
  })();

  const messagesByLang = {
    pt: {
      required: "Preencha os dados principais para seguirmos com voce.",
      sending: "Enviando seu contato...",
      success: "Recebemos seu contato e vamos seguir com prioridade.",
      fallbackError: "Nao foi possivel registrar direto no MGOLD agora. Vamos abrir o portal para continuidade.",
      prepared: "Contato preparado para tratamento prioritario. O MGOLD foi aberto para continuidade."
    },
    "pt-pt": {
      required: "Preencha os dados principais para podermos avancar.",
      sending: "A enviar o seu contacto...",
      success: "Recebemos o seu contacto e vamos dar seguimento com prioridade.",
      fallbackError: "Nao foi possivel registar diretamente no MGOLD agora. Vamos abrir o portal para dar continuidade.",
      prepared: "Contacto preparado para tratamento prioritario. O MGOLD foi aberto para continuidade."
    },
    en: {
      required: "Please fill in the main details so we can move forward.",
      sending: "Sending your contact...",
      success: "We received your contact and will move forward with priority.",
      fallbackError: "We could not register this directly in MGOLD right now. We will open the portal to continue.",
      prepared: "Contact prepared for priority handling. MGOLD has been opened to continue."
    },
    it: {
      required: "Compila i dati principali per poter procedere.",
      sending: "Invio del contatto in corso...",
      success: "Abbiamo ricevuto il tuo contatto e procederemo con priorita.",
      fallbackError: "Non e stato possibile registrare direttamente su MGOLD in questo momento. Apriremo il portale per continuare.",
      prepared: "Contatto preparato per gestione prioritaria. MGOLD e stato aperto per continuare."
    }
  };

  const messages = messagesByLang[pageLang] || messagesByLang.pt;
  const trimValue = (value) => typeof value === "string" ? value.trim() : "";
  const queryParams = new URLSearchParams(window.location.search);

  const setStatus = (message, tone = "") => {
    if (!status) return;
    status.textContent = message;
    status.dataset.tone = tone;
  };

  const buildPayload = (data) => {
    const pick = (...keys) => {
      for (const key of keys) {
        const value = trimValue(data[key]);
        if (value) return value;
      }
      return "";
    };

    const name = pick("responsavel", "name", "nome");
    const whatsapp = pick("whatsapp", "phone");
    const email = pick("email");
    const company = pick("empresa", "company", "azienda");
    const vehicleCount = pick("quantidade_veiculos", "vehicleCount", "numeroVeicoli");
    const cityProvince = pick("localidade", "cityProvince", "cittaProvincia");
    const message = pick("mensagem", "message");

    const payload = {
      formName: trimValue(form.dataset.formName) || defaultFormName,
      name,
      nome: name,
      whatsapp,
      phone: whatsapp,
      email,
      company,
      azienda: company,
      vehicleCount,
      numeroVeicoli: vehicleCount,
      cityProvince,
      cittaProvincia: cityProvince,
      message,
      mensagem: message,
      pageUrl: window.location.href,
      utm_source: trimValue(queryParams.get("utm_source")) || defaultUtm.utm_source,
      utm_medium: trimValue(queryParams.get("utm_medium")) || defaultUtm.utm_medium,
      utm_campaign: trimValue(queryParams.get("utm_campaign")) || defaultUtm.utm_campaign
    };

    const hp = pick("hp");
    if (hp) {
      payload.hp = hp;
    }

    return Object.fromEntries(
      Object.entries(payload).filter(([, value]) => value !== "")
    );
  };

  const openModal = () => {
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    setStatus("");

    window.setTimeout(() => {
      const firstField = form.querySelector("input, select, textarea");
      if (firstField) firstField.focus();
    }, 60);
  };

  const closeModal = () => {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
  };

  openTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });

  closeTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      closeModal();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  const validateForm = () => {
    const requiredFields = form.querySelectorAll("[required]");
    for (const field of requiredFields) {
      if (!field.value.trim()) {
        field.focus();
        field.reportValidity?.();
        return false;
      }
    }
    return true;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setStatus(messages.required, "error");
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const endpoint = form.dataset.endpoint?.trim();
    const openUrl = form.dataset.openUrl?.trim();
    const payload = buildPayload(data);

    setStatus(messages.sending, "loading");

    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error("request_failed");
        }

        setStatus(messages.success, "success");
        form.reset();
        return;
      } catch (error) {
        setStatus(messages.fallbackError, "error");
      }
    }

    try {
      localStorage.setItem("vittorePriorityLeadDraft", JSON.stringify({
        ...payload,
        createdAt: new Date().toISOString()
      }));
    } catch (_) {
      // noop
    }

    if (openUrl) {
      window.open(openUrl, "_blank", "noopener,noreferrer");
    }

    setStatus(messages.prepared, "success");
  });
});
