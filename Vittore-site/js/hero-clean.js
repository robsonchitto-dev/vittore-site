document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  hero.classList.add("hero--clean");

  const primaryAction =
    hero.querySelector(".button-primary") ||
    hero.querySelector(".btn-primary") ||
    hero.querySelector(".hero-actions a");

  if (primaryAction) {
    primaryAction.textContent = "Falar com especialista";
    primaryAction.setAttribute("href", "#contato");
    primaryAction.setAttribute("data-open-contact-modal", "");
  }

  const secondaryAction =
    hero.querySelector(".button-secondary") ||
    hero.querySelector(".btn-secondary") ||
    hero.querySelectorAll(".hero-actions a")[1];

  if (secondaryAction) {
    secondaryAction.textContent = "Entender o PDR";
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

  if (mediaContainer && !mediaContainer.querySelector("video")) {
    mediaContainer.classList.add("hero-media--video");
    mediaContainer.innerHTML = "";

    const videoItems = [
      {
        src: "assets/images/video1.mp4",
        caption: "Precisão em cada detalhe.",
        duration: 6000
      },
      {
        src: "assets/images/antes familia.mp4",
      caption: "Seu carro reparado com os mais altos padrões de qualidade.",
        duration: 6000
      },
      {
        src: "assets/images/famila feliz.mp4",
        caption: "Mais tranquilidade para você.",
        duration: 6000
      }
    ];

    let currentVideoIndex = 0;
    let captionPreparedToExit = false;
    let videoSwitchTimeout = null;

    const video = document.createElement("video");
    video.className = "hero-clean-video";
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    video.poster = "assets/images/carro-em-reparo.jpg";
    video.setAttribute("autoplay", "");
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    const source = document.createElement("source");
    source.type = "video/mp4";
    source.src = videoItems[currentVideoIndex].src;

    video.appendChild(source);
    mediaContainer.appendChild(video);

    const heroCaption = document.createElement("div");
    heroCaption.className = "hero-media-caption hero-media-caption--center";
    heroCaption.innerHTML = `
      <strong class="hero-caption-line is-active">${videoItems[currentVideoIndex].caption}</strong>
    `;
    mediaContainer.appendChild(heroCaption);

    const fallbackToImage = () => {
      mediaContainer.innerHTML = `
        <img src="assets/images/carro-em-reparo.jpg" alt="Tecnico em execucao de reparo PDR em ambiente controlado">
        <div class="hero-media-caption hero-media-caption--center">
          <strong class="hero-caption-line is-active">Precisão em cada detalhe.</strong>
        </div>
      `;
    };

    const setCaptionVisible = (visible) => {
      const line = mediaContainer.querySelector(".hero-caption-line");
      if (!line) return;

      if (visible) {
        line.classList.remove("is-exiting");
        void line.offsetWidth;
        line.classList.add("is-active");
        return;
      }

      line.classList.remove("is-active");
      line.classList.add("is-exiting");
    };

    const updateCaption = (text) => {
      const line = mediaContainer.querySelector(".hero-caption-line");
      if (!line) return;

      setCaptionVisible(false);

      window.setTimeout(() => {
        line.textContent = text;
        setCaptionVisible(true);
      }, 170);
    };

    const loadVideoAtIndex = (index) => {
      currentVideoIndex = index;
      captionPreparedToExit = false;
      if (videoSwitchTimeout) {
        window.clearTimeout(videoSwitchTimeout);
        videoSwitchTimeout = null;
      }
      source.src = videoItems[currentVideoIndex].src;
      updateCaption(videoItems[currentVideoIndex].caption);
      video.classList.add("is-switching");
      video.load();
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(() => {
          fallbackToImage();
        });
      }
    };

    const queueNextVideo = () => {
      const nextIndex = (currentVideoIndex + 1) % videoItems.length;
      const currentDuration = videoItems[currentVideoIndex].duration || 3000;
      const captionExitLead = 420;

      videoSwitchTimeout = window.setTimeout(() => {
        loadVideoAtIndex(nextIndex);
      }, currentDuration);

      window.setTimeout(() => {
        if (!captionPreparedToExit) {
          captionPreparedToExit = true;
          setCaptionVisible(false);
        }
      }, Math.max(0, currentDuration - captionExitLead));
    };

    video.addEventListener("timeupdate", () => {
      if (!Number.isFinite(video.duration)) return;
    });

    video.addEventListener("loadeddata", () => {
      captionPreparedToExit = false;
      video.classList.remove("is-switching");
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(() => {
          fallbackToImage();
        });
      }
      queueNextVideo();
    });

    video.addEventListener("error", () => {
      if (videoSwitchTimeout) {
        window.clearTimeout(videoSwitchTimeout);
        videoSwitchTimeout = null;
      }
      const nextIndex = currentVideoIndex + 1;
      if (nextIndex < videoItems.length) {
        loadVideoAtIndex(nextIndex);
        return;
      }
      fallbackToImage();
    });
  }

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
