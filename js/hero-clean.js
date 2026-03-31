document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const root = document.documentElement;
  const heroTrustStrip =
    (hero.nextElementSibling && hero.nextElementSibling.classList.contains("trust-strip"))
      ? hero.nextElementSibling
      : document.querySelector("main > .trust-strip");

  const pathname = window.location.pathname.toLowerCase();
  const htmlLang = (document.documentElement.lang || "").toLowerCase();

  const pageLang = (() => {
    if (pathname.endsWith("italiano.html") || htmlLang.startsWith("it")) return "it";
    if (pathname.endsWith("english.html") || htmlLang.startsWith("en")) return "en";
    if (pathname.endsWith("portugal.html") || htmlLang === "pt-pt") return "pt-pt";
    return "pt";
  })();

  const copyByLang = {
    pt: {
      primary: "Falar com especialista",
      secondary: "Entender o PDR",
      captions: [
        "Precisão em cada detalhe.",
        "Seu carro reparado com os mais altos padrões de qualidade.",
        "Mais tranquilidade para você."
      ]
    },
    "pt-pt": {
      primary: "Falar com especialista",
      secondary: "Perceber o PDR",
      captions: [
        "Precisão em cada detalhe.",
        "O seu carro reparado com os mais altos padrões de qualidade.",
        "Mais tranquilidade para si."
      ]
    },
    en: {
      primary: "Talk to a specialist",
      secondary: "Understand PDR",
      captions: [
        "Precision in every detail.",
        "Your vehicle repaired to the highest quality standards.",
        "More peace of mind for you."
      ]
    },
    it: {
      primary: "Parla con un esperto",
      secondary: "Scopri il PDR",
      captions: [
        "Precisione in ogni dettaglio.",
        "La tua auto riparata secondo i piu alti standard di qualita.",
        "Piu tranquillita per te."
      ]
    }
  };

  const labels = copyByLang[pageLang] || copyByLang.pt;

  hero.classList.add("hero--clean", "hero--full-video");

  const primaryAction =
    hero.querySelector(".button-primary") ||
    hero.querySelector(".btn-primary") ||
    hero.querySelector(".hero-actions a");

  if (primaryAction) {
    primaryAction.textContent = labels.primary;
    primaryAction.setAttribute("href", "#contato");
    primaryAction.setAttribute("data-open-contact-modal", "");
  }

  const secondaryAction =
    hero.querySelector(".button-secondary") ||
    hero.querySelector(".btn-secondary") ||
    hero.querySelectorAll(".hero-actions a")[1];

  if (secondaryAction) {
    secondaryAction.textContent = labels.secondary;
    secondaryAction.setAttribute("href", "#pdr");
  }

  [
    ".hero-panel",
    ".hero-proof",
    ".hero-highlight",
    ".hero-card",
    ".hero-floating-card",
    ".hero-aside-card",
    ".hero-box",
    ".hero-callout",
    ".hero-media-card",
    ".hero-mini-proof",
    ".trust-strip"
  ].forEach((selector) => {
    hero.querySelectorAll(selector).forEach((element) => {
      element.classList.add("hero-clean-muted");
    });
  });

  const mediaContainer =
    hero.querySelector(".hero-media") ||
    hero.querySelector(".hero-visual") ||
    hero.querySelector(".hero-image");

  if (mediaContainer) {
    mediaContainer.classList.add("hero-clean-muted");
  }

  if (heroTrustStrip) {
    const mobileFold = window.matchMedia("(max-width: 640px)");
    const foldRevealOffset = 120;
    let revealedByScroll = false;

    const revealTrustStrip = () => {
      if (revealedByScroll) return;
      revealedByScroll = true;
      root.classList.add("mobile-hero-fold-revealed");
    };

    const syncMobileHeroGate = () => {
      revealedByScroll = false;
      root.classList.remove("mobile-hero-fold-gated", "mobile-hero-fold-revealed");

      if (!mobileFold.matches) return;

      root.classList.add("mobile-hero-fold-gated");

      if (window.scrollY > foldRevealOffset) {
        revealTrustStrip();
      }
    };

    const handleMobileScroll = () => {
      if (!mobileFold.matches || revealedByScroll) return;
      if (window.scrollY > foldRevealOffset) {
        revealTrustStrip();
      }
    };

    syncMobileHeroGate();

    if (typeof mobileFold.addEventListener === "function") {
      mobileFold.addEventListener("change", syncMobileHeroGate);
    } else if (typeof mobileFold.addListener === "function") {
      mobileFold.addListener(syncMobileHeroGate);
    }

    window.addEventListener("scroll", handleMobileScroll, { passive: true });
    window.addEventListener("resize", syncMobileHeroGate, { passive: true });
  }

  if (hero.querySelector(".hero-video-stage")) return;

  const videoItems = [
    {
      src: "assets/images/v1.mp4",
      caption: labels.captions[0],
      duration: 6500
    },
    {
      src: "assets/images/v2.mp4",
      caption: labels.captions[1],
      duration: 6500
    },
    {
      src: "assets/images/v3.mp4",
      caption: labels.captions[2],
      duration: 6500
    }
  ];

  const stage = document.createElement("div");
  stage.className = "hero-video-stage";

  const videoA = document.createElement("video");
  const videoB = document.createElement("video");

  [videoA, videoB].forEach((video) => {
    video.className = "hero-bg-video";
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = false;
    video.preload = "metadata";
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");
    stage.appendChild(video);
  });

  const caption = document.createElement("div");
  caption.className = "hero-video-caption";
  caption.textContent = videoItems[0].caption;
  stage.appendChild(caption);

  hero.insertBefore(stage, hero.firstChild);

  let activeVideo = videoA;
  let inactiveVideo = videoB;
  let currentIndex = 0;
  let switchTimer = null;
  let fallbackTriggered = false;

  const clearSwitchTimer = () => {
    if (switchTimer) {
      window.clearTimeout(switchTimer);
      switchTimer = null;
    }
  };

  const fallbackToStatic = () => {
    if (fallbackTriggered) return;
    fallbackTriggered = true;
    clearSwitchTimer();
    stage.classList.add("hero-video-stage--fallback");
    caption.textContent = labels.captions[0];
  };

  const queueNext = () => {
    clearSwitchTimer();
    const currentItem = videoItems[currentIndex];
    switchTimer = window.setTimeout(() => {
      switchTo((currentIndex + 1) % videoItems.length);
    }, currentItem.duration || 6500);
  };

  const playVideo = (video) => {
    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {
        fallbackToStatic();
      });
    }
  };

  const setSource = (video, src) => {
    video.src = src;
    video.load();
  };

  const switchTo = (nextIndex) => {
    currentIndex = nextIndex;
    const nextItem = videoItems[nextIndex];

    inactiveVideo.classList.remove("is-active");
    inactiveVideo.classList.add("is-preparing");
    setSource(inactiveVideo, nextItem.src);

    const onLoaded = () => {
      inactiveVideo.removeEventListener("loadeddata", onLoaded);
      inactiveVideo.classList.remove("is-preparing");
      inactiveVideo.classList.add("is-active");
      activeVideo.classList.remove("is-active");
      activeVideo.pause();
      caption.textContent = nextItem.caption;
      playVideo(inactiveVideo);
      const previous = activeVideo;
      activeVideo = inactiveVideo;
      inactiveVideo = previous;
      queueNext();
    };

    inactiveVideo.addEventListener("loadeddata", onLoaded);
  };

  [videoA, videoB].forEach((video) => {
    video.addEventListener("error", fallbackToStatic);
  });

  videoA.classList.add("is-active");
  setSource(videoA, videoItems[0].src);
  videoA.addEventListener(
    "loadeddata",
    () => {
      playVideo(videoA);
      queueNext();
    },
    { once: true }
  );

  const mediaPlan = [
    {
      selectors: ["#pdr", ".section-pdr"],
      note:
        "Imagem sugerida aqui: detalhe do amassado com reflexo controlado para explicar o PDR com precisão visual."
    },
    {
      selectors: ["#prova-real", "#prova", ".proof-real-section"],
      note:
        "Imagem sugerida aqui: antes e depois frontal para reforçar prova real e percepção de resultado."
    },
    {
      selectors: ["#operacao-escala", ".operation-section"],
      note:
        "Imagem sugerida aqui: técnico em execução com ferramenta PDR para comunicar operação especializada."
    },
    {
      selectors: ["#desafio", ".challenge-section", "#modelo"],
      note:
        "Imagem sugerida aqui: granizo em contexto para conectar evento, urgência e demanda concentrada."
    }
  ];

  mediaPlan.forEach(({ selectors, note }) => {
    const section = document.querySelector(selectors.join(", "));
    if (!section || section.querySelector(".media-placement-note")) return;

    section.setAttribute("data-media-note", note);
  });
});
