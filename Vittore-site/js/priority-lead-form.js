document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#contact-modal");
  const form = document.querySelector("#priority-lead-form");
  const status = document.querySelector("#priority-form-status");
  const openTriggers = document.querySelectorAll("[data-open-contact-modal]");
  const closeTriggers = document.querySelectorAll("[data-close-contact-modal]");

  if (!modal || !form) return;

  const setStatus = (message, tone = "") => {
    if (!status) return;
    status.textContent = message;
    status.dataset.tone = tone;
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
      setStatus("Preencha os dados principais para seguirmos com voce.", "error");
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const endpoint = form.dataset.endpoint?.trim();
    const openUrl = form.dataset.openUrl?.trim();

    setStatus("Enviando seu contato...", "loading");

    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error("request_failed");
        }

        setStatus("Recebemos seu contato e vamos seguir com prioridade.", "success");
        form.reset();
        return;
      } catch (error) {
        setStatus("Nao foi possivel registrar direto no MGOLD agora. Vamos abrir o portal para continuidade.", "error");
      }
    }

    try {
      localStorage.setItem("vittorePriorityLeadDraft", JSON.stringify({
        ...data,
        createdAt: new Date().toISOString()
      }));
    } catch (_) {
      // noop
    }

    if (openUrl) {
      window.open(openUrl, "_blank", "noopener,noreferrer");
    }

    setStatus("Contato preparado para tratamento prioritario. O MGOLD foi aberto para continuidade.", "success");
  });
});
