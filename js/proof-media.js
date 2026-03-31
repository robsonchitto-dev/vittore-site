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
        src="assets/images/carro-reparado.jpeg"
        alt="Aplicacao da tecnica PDR durante a reparacao"
        loading="lazy"
        decoding="async"
      >
      <figcaption class="proof-media-caption">
        <span class="proof-media-label">Aplicacao PDR</span>
        <strong>Execucao tecnica com foco em acabamento e consistencia de entrega.</strong>
        <p>As imagens atuais do site passam a refletir apenas os arquivos existentes na pasta de assets, sem depender de midias antigas.</p>
      </figcaption>
    </figure>
  `;

  proofGrid.prepend(article);

  const image = article.querySelector("img");
  if (image) {
    image.addEventListener("error", () => {
      image.src = "assets/images/carro-danificado.jpeg";
    }, { once: true });
  }
});
