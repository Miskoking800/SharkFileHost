const form = document.getElementById("file-upload-form");
const input = document.getElementById("fileToUpload");
const button = document.getElementById("uploadButton");
const status = document.getElementById("uploadStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const file = input.files[0];
  if (file) {
    button.disabled = true;
    const id = generateId();
    const name = file.name;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const url = `${window.location.origin}/files/${id}`;
          status.innerHTML = `File uploaded successfully! Here's your link: <a href="${url}">${url}</a>`;
        } else {
          status.innerHTML = `Error uploading file: ${xhr.statusText}`;
        }
        button.disabled = false;
      }
    };
    xhr.open("POST", "/upload");
    const formData = new FormData();
    formData.append("fileToUpload", file);
    formData.append("id", id);
    xhr.send(formData);
    status.innerHTML = "Uploading file...";
  }
});

function generateId() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < 10; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}
