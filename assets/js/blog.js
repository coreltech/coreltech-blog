// assets/js/blog.js

async function fetchBlogPosts() {
  const container = document.getElementById("post-list");

  try {
    const response = await fetch("feed/posts.json");
    const posts = await response.json();

    posts.forEach(post => {
      const postElement = document.createElement("div");
      postElement.className = "post-card";

      const thumbnail = post.thumbnail || "assets/img/blog-article-default.webp";

      postElement.innerHTML = `
        <img src="${thumbnail}" alt="${post.title}" class="post-img">
        <h3>${post.title}</h3>
        <p><em>${post.date}</em></p>
        <p>${post.summary}</p>
        <a href="${post.url}" class="btn-secondary">Leer más</a>
      `;
      container.appendChild(postElement);
    });
  } catch (error) {
    container.innerHTML = "<p>No se pudieron cargar los artículos</p>";
    console.error("Error al cargar artículos:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchBlogPosts);