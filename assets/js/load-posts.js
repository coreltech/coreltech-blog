// 🧠 Sistema universal de carga de artículos
document.addEventListener("DOMContentLoaded", () => {
  const postList = document.getElementById("post-list");
  const categoryPosts = document.getElementById("category-posts");
  const hero = document.querySelector(".hero");
  const category = hero?.getAttribute("data-category");

  // Ruta correcta a posts.json
  fetch("feed/posts.json")
    .then((res) => {
      if (!res.ok) throw new Error(`Error ${res.status}: No se encontró posts.json`);
      return res.json();
    })
    .then((posts) => {
      // Filtrar si es una categoría
      const filtered = category && category !== "blog" 
        ? posts.filter(p => p.category === category) 
        : posts;

      // Limitar a 3 en portada
      const toDisplay = category === "blog" ? filtered.slice(0, 3) : filtered;

      // Mostrar artículos
      const container = postList || categoryPosts;
      if (!container) return;

      toDisplay.forEach((post, index) => {
        const article = document.createElement("article");
        article.className = "post-card";

        // Si es el primero en portada, hazlo destacado
        if (category === "blog" && index === 0) {
          article.classList.add("post-card-featured");
          article.innerHTML = `
            <div class="featured-img" style="background-image: url('${post.thumbnail || 'assets/img/blog-article-default.webp'}')"></div>
            <div class="featured-content">
              <span class="tag">${post.category}</span>
              <h2>${post.title}</h2>
              <p class="meta">
                Por <strong>${post.author || 'Redacción'}</strong> • ${post.date} • ${post.readingTime}
              </p>
              <p>${post.summary}</p>
              <a href="${post.url}" class="btn-primary">Leer artículo</a>
            </div>
          `;
        } else {
          article.innerHTML = `
            <img src="${post.thumbnail || 'assets/img/blog-article-default.webp'}" alt="${post.title}" class="post-img">
            <h3>${post.title}</h3>
            <p class="meta">
              Por <strong>${post.author || 'Redacción'}</strong> • ${post.date} • ${post.readingTime}
            </p>
            <a href="${post.url}" class="btn-secondary">Leer más →</a>
          `;
        }

        container.appendChild(article);
      });
    })
    .catch((err) => {
      console.error("❌ Error al cargar artículos:", err);
      const container = postList || categoryPosts;
      if (container) {
        container.innerHTML = `
          <p style="text-align: center; color: #e74c3c; padding: 2rem; background: #fdecea; border-radius: 10px;">
            ⚠️ No se pudieron cargar los artículos.<br>
            Verifica que <strong>feed/posts.json</strong> exista y tenga formato correcto.
          </p>
        `;
      }
    });
});