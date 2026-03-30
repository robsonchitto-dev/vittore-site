document.addEventListener("DOMContentLoaded", () => {
  const proofSection = document.querySelector("#prova-real, #prova, .proof-real-section");
  if (!proofSection) return;

  const proofGrid = proofSection.querySelector(".proof-real-grid") || proofSection;
  if (proofSection.querySelector(".proof-media-card")) return;

  const article = document.createElement("article");
  article.className = "proof-real-card proof-media-card";

  article.innerHTML = `
    <figure class="proof-media-figure">
      <img
        src="assets/images/antes-depois-real.jpg"
        alt="Comparacao visual de antes e depois em reparacao PDR"
        loading="lazy"
        decoding="async"
      >
      <figcaption class="proof-media-caption">
        <span class="proof-media-label">Antes e depois</span>
        <strong>Resultado visivel com mais tranquilidade para quem precisa entregar bem.</strong>
        <p>Quando o dano permite PDR, o parceiro ganha previsibilidade, menos desgaste operacional e mais confianca na entrega final.</p>
      </figcaption>
    </figure>
  `;

  proofGrid.prepend(article);

  const image = article.querySelector("img");
  if (image) {
    image.addEventListener("error", () => {
      image.src = "assets/images/antes-depois-real.svg";
    }, { once: true });
  }
});
