// 🧠 Sistema universal de carga de artículos
document.addEventListener("DOMContentLoaded", () => {
  const postList = document.getElementById("post-list"); // Para index.html
  const categoryPosts = document.getElementById("category-posts"); // Para hardware.html, software.html, redes.html
  const hero = document.querySelector(".hero");
  const category = hero?.getAttribute("data-category"); // Obtiene la categoría de la página

  // Ruta correcta a posts.json
  fetch("feed/posts.json")
    .then((res) => {
      if (!res.ok) throw new Error(`Error ${res.status}: No se encontró posts.json`);
      return res.json();
    })
    .then((posts) => {

      // Determinar el contenedor donde se insertarán los posts
      const container = postList || categoryPosts;
      if (!container) {
        console.warn("No se encontró un contenedor para los posts (#post-list o #category-posts)");
        return;
      }

      // 1. Si es una página de categoría específica (hardware, software, redes)
      if (category && category !== "blog") {
        // Filtrar posts por la categoría de la página
        const filteredPosts = posts.filter(p => p.category.toLowerCase() === category.toLowerCase());

        if (filteredPosts.length === 0) {
            container.innerHTML = `
              <div style="text-align: center; padding: 3rem; background: #f8f9fa; border-radius: 12px; margin: 2rem 0;">
                <h3>No hay artículos disponibles en la categoría <strong>${category}</strong> aún.</h3>
                <p><a href="index.html" style="color: #0070f3; text-decoration: none;">Ver todos los artículos</a></p>
              </div>
            `;
            return;
        }

        // Limpiar el contenedor
        container.innerHTML = '';

        // Para páginas de categoría, usar el formato de tarjeta lateral (magazine-card)
        filteredPosts.forEach(post => {
          const article = document.createElement("article");
          article.className = "magazine-card"; // Usa el estilo ya definido en blog.css
          article.innerHTML = `
            <img src="${post.thumbnail || 'assets/img/blog-article-default.webp'}" alt="${post.title}" class="card-img" loading="lazy">
            <div class="card-body">
              <span class="tag">${post.category}</span>
              <h3>${post.title}</h3>
              <div class="post-meta">
                <span>Por <strong>${post.author || 'Redacción'}</strong></span>
                <span>•</span>
                <span>${post.date}</span>
                <span>•</span>
                <span>${post.readingTime || '3 min'}</span>
              </div>
              <a href="${post.url}" class="read-more">Leer más →</a>
            </div>
          `;
          container.appendChild(article);
        });
      }
      // 2. Si es la portada del blog (index.html) - Diseño Pirámide
      else if (category === "blog") {
        // Tomar los primeros 4 artículos para el diseño pirámide
        const latestPosts = posts.slice(0, 4);

        if (latestPosts.length < 4) {
            container.innerHTML = `
              <div style="text-align: center; padding: 3rem; background: #f8f9fa; border-radius: 12px; margin: 2rem 0;">
                <h3>No hay suficientes artículos para mostrar el diseño de portada.</h3>
                <p>Se necesitan al menos 4 artículos.</p>
              </div>
            `;
            return;
        }

        // Limpiar el contenedor
        container.innerHTML = '';

        // Artículo destacado (el más reciente)
        const featuredPost = latestPosts[0];
        const regularPosts = latestPosts.slice(1, 4); // Los siguientes 3

        // Crear estructura del diseño pirámide
        let html = '';

        // Artículo destacado
        html += `
          <div class="top-article-container">
            <article class="top-article">
              <img src="${featuredPost.thumbnail || 'assets/img/blog-article-default.webp'}" alt="${featuredPost.title}">
              <div class="article-content">
                <span class="category-tag">${featuredPost.category}</span>
                <h2>${featuredPost.title}</h2>
                <div class="post-meta">
                  <span>Por <strong>${featuredPost.author || 'Redacción'}</strong></span>
                  <span>•</span>
                  <span>${featuredPost.date}</span>
                  <span>•</span>
                  <span>${featuredPost.readingTime || '3 min'}</span>
                </div>
                <p>${featuredPost.summary || 'Lee este interesante artículo sobre tecnología y desarrollo.'}</p>
                <a href="${featuredPost.url}" class="btn-primary">Leer artículo completo</a>
              </div>
            </article>
          </div>
        `;

        // Fila de artículos regulares (3 artículos)
        html += '<div class="bottom-articles-row">';
        regularPosts.forEach(post => {
          html += `
            <article class="bottom-article">
              <img src="${post.thumbnail || 'assets/img/blog-article-default.webp'}" alt="${post.title}" loading="lazy">
              <div class="article-content">
                <span class="tag">${post.category}</span>
                <h3>${post.title}</h3>
                <div class="post-meta">
                  <span>Por <strong>${post.author || 'Redacción'}</strong></span>
                  <span>•</span>
                  <span>${post.date}</span>
                </div>
                <a href="${post.url}" class="read-more">Leer más →</a>
              </div>
            </article>
          `;
        });
        html += '</div>';

        container.innerHTML = html;
      }
      // 3. Fallback por si acaso no se detecta correctamente la categoría
      else {
         console.warn("No se pudo determinar el tipo de página o categoría para cargar posts.");
         container.innerHTML = `
          <div style="text-align: center; padding: 3rem; background: #fdecea; border-radius: 12px; margin: 2rem 0; color: #e74c3c;">
            <h3>⚠️ Configuración de página no reconocida</h3>
            <p>Verifica que la página tenga correctamente configurado el atributo <code>data-category</code> en la sección <code>.hero</code>.</p>
          </div>
        `;
      }
    })
    .catch((err) => {
      console.error("❌ Error al cargar artículos:", err);
      const container = postList || categoryPosts;
      if (container) {
        container.innerHTML = `
          <div style="text-align: center; padding: 3rem; background: #fdecea; border-radius: 12px; margin: 2rem 0; color: #e74c3c;">
            <h3>⚠️ Error al cargar artículos</h3>
            <p>Verifica que <strong>feed/posts.json</strong> exista y tenga el formato correcto.</p>
            <p><small>${err.message}</small></p>
          </div>
        `;
      }
    });
});