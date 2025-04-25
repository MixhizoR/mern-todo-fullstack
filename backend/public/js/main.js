document.addEventListener("DOMContentLoaded", () => {

  // Helper: API request
  const apiRequest = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Server error.");
    return response.json();
  };

  // Helper: Display error
  const displayError = (element, message) => {
    element.innerHTML = `<p style="color:red;">${message}</p>`;
  };

  // GET all posts
  const initializeGetAllPosts = () => {
    const fetchButton = document.getElementById("fetch-posts-button");
    const displayContainer = document.getElementById("posts-container");
    if (!fetchButton || !displayContainer) return;

    fetchButton.addEventListener("click", async () => {
      try {
        const posts = await apiRequest("/api/posts");
        displayContainer.innerHTML = posts
          .map(post => `<li>${post._id} - ${post.title}</li>`)
          .join("");
      } catch (error) {
        displayError(displayContainer, error.message);
        console.error(error);
      }
    });
  };

  // GET post by ID
  const initializeGetPostById = () => {
    const fetchButton = document.getElementById("fetch-post-button");
    const displayContainer = document.getElementById("post-container");
    const idInput = document.getElementById("post-id");
    if (!fetchButton || !displayContainer || !idInput) return;

    fetchButton.addEventListener("click", async () => {
      const id = idInput.value.trim();
      if (!id) {
        displayError(displayContainer, "Please enter an ID.");
        return;
      }
      try {
        const post = await apiRequest(`/api/posts/${id}`);
        displayContainer.innerHTML = `<li>${post._id} - ${post.title}</li>`;
      } catch (error) {
        displayError(displayContainer, error.message);
        console.error(error);
      }
    });
  };

  // CREATE post
  const initializeCreatePost = () => {
    const createButton = document.getElementById("create-post-button");
    const displayContainer = document.getElementById("create-post-container");
    const titleInput = document.getElementById("create-title");
    if (!createButton || !displayContainer || !titleInput) return;

    createButton.addEventListener("click", async () => {
      const title = titleInput.value.trim();
      if (!title) {
        displayError(displayContainer, "Please enter a title.");
        return;
      }
      try {
        const newPost = await apiRequest("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title }),
        });
        displayContainer.innerHTML = `<li>${newPost._id} - ${newPost.title}</li>`;
        titleInput.value = "";
      } catch (error) {
        displayError(displayContainer, error.message);
        console.error(error);
      }
    });
  };

  // UPDATE post
  const initializeUpdatePost = () => {
    const updateButton = document.getElementById("update-post-button");
    const displayContainer = document.getElementById("update-post-container");
    const idInput = document.getElementById("update-id");
    const titleInput = document.getElementById("update-title");
    if (!updateButton || !displayContainer || !idInput || !titleInput) return;

    updateButton.addEventListener("click", async () => {
      const id = idInput.value.trim();
      const title = titleInput.value.trim();
      if (!id || !title) {
        displayError(displayContainer, "Please enter both ID and new title.");
        return;
      }
      try {
        const updatedPost = await apiRequest(`/api/posts/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title }),
        });
        displayContainer.innerHTML = `<li>${updatedPost._id} - ${updatedPost.title}</li>`;
        idInput.value = "";
        titleInput.value = "";
      } catch (error) {
        displayError(displayContainer, error.message);
        console.error(error);
      }
    });
  };

  // DELETE post
  const initializeDeletePost = () => {
    const deleteButton = document.getElementById("delete-post-button");
    const displayContainer = document.getElementById("delete-post-container");
    const idInput = document.getElementById("delete-id");
    if (!deleteButton || !displayContainer || !idInput) return;

    deleteButton.addEventListener("click", async () => {
      const id = idInput.value.trim();
      if (!id) {
        displayError(displayContainer, "Please enter an ID.");
        return;
      }
      try {
        const response = await apiRequest(`/api/posts/${id}`, { method: "DELETE" });
        const { message, post } = response;
        displayContainer.innerHTML = `<li>${message} - ${post?._id || ""} ${post?.title || ""}</li>`;
        idInput.value = "";
      } catch (error) {
        displayError(displayContainer, error.message);
        console.error(error);
      }
    });
  };

  // DELETE all posts
  const initializeDeleteAllPosts = () => {
    const deleteButton = document.getElementById("delete-all-posts-button");
    const displayContainer = document.getElementById("delete-all-posts-container");
    if (!deleteButton || !displayContainer) return;

    deleteButton.addEventListener("click", async () => {
      try {
        const response = await apiRequest("/api/posts", { method: "DELETE" });
        const { message } = response;
        displayContainer.innerHTML = `<li>${message}</li>`;
      } catch (error) {
        displayError(displayContainer, error.message);
        console.error(error);
      }
    });
  };

  // Initialize all handlers
  initializeGetAllPosts();
  initializeGetPostById();
  initializeCreatePost();
  initializeUpdatePost();
  initializeDeletePost();
  initializeDeleteAllPosts();
});
