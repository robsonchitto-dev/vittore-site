(function () {
  const sourceMap = new Map([
    ["assets/images/video1.mp4", "assets/images/v1.mp4"],
    ["assets\\images\\video1.mp4", "assets/images/v1.mp4"],
    ["assets/images/antes familia.mp4", "assets/images/v2.mp4"],
    ["assets\\images\\antes familia.mp4", "assets/images/v2.mp4"],
    ["assets/images/famila feliz.mp4", "assets/images/v3.mp4"],
    ["assets\\images\\famila feliz.mp4", "assets/images/v3.mp4"],
    ["assets/images/familia feliz.mp4", "assets/images/v3.mp4"],
    ["assets\\images\\familia feliz.mp4", "assets/images/v3.mp4"]
  ]);

  function normalize(value) {
    if (!value) return value;
    const clean = String(value).trim();
    for (const [from, to] of sourceMap.entries()) {
      if (clean.includes(from)) return clean.replace(from, to);
    }
    return clean;
  }

  const nativeSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    if (
      (this.tagName === "VIDEO" || this.tagName === "SOURCE") &&
      String(name).toLowerCase() === "src"
    ) {
      return nativeSetAttribute.call(this, name, normalize(value));
    }
    return nativeSetAttribute.call(this, name, value);
  };

  const mediaSrc = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, "src");
  if (mediaSrc && mediaSrc.set) {
    Object.defineProperty(HTMLMediaElement.prototype, "src", {
      configurable: true,
      enumerable: mediaSrc.enumerable,
      get: mediaSrc.get,
      set(value) {
        mediaSrc.set.call(this, normalize(value));
      }
    });
  }

  const sourceSrc = Object.getOwnPropertyDescriptor(HTMLSourceElement.prototype, "src");
  if (sourceSrc && sourceSrc.set) {
    Object.defineProperty(HTMLSourceElement.prototype, "src", {
      configurable: true,
      enumerable: sourceSrc.enumerable,
      get: sourceSrc.get,
      set(value) {
        sourceSrc.set.call(this, normalize(value));
      }
    });
  }

  function patchExistingVideos() {
    const videos = document.querySelectorAll("video, source");
    videos.forEach((node) => {
      const current = node.getAttribute("src") || node.src;
      const next = normalize(current);
      if (!current || current === next) return;

      node.setAttribute("src", next);
      if (node.tagName === "VIDEO") {
        try {
          node.load();
        } catch (_) {
          // no-op
        }
      }
    });
  }

  const observer = new MutationObserver(() => {
    patchExistingVideos();
  });

  function start() {
    patchExistingVideos();
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src"]
    });

    let runs = 0;
    const timer = setInterval(() => {
      patchExistingVideos();
      runs += 1;
      if (runs >= 20) clearInterval(timer);
    }, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
