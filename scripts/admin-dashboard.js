document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3001/bestillinger")
    .then((res) => res.json())
    .then((data) => renderOrders(data));

  document.getElementById("search").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    document.querySelectorAll(".order-card").forEach((card) => {
      card.style.display = card.innerText.toLowerCase().includes(query) ? "block" : "none";
    });
  });

  document.querySelectorAll(".tab").forEach((tabBtn) => {
    tabBtn.addEventListener("click", function () {
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
      this.classList.add("active");
      document.getElementById(this.dataset.target).classList.add("active");
    });
  });
});

function renderOrders(data) {
  const active = document.getElementById("aktive");
  const done = document.getElementById("fullforte");
  const cancelled = document.getElementById("kansellerte");

  data.sort((a, b) => new Date(a.dato + " " + a.tid) - new Date(b.dato + " " + b.tid));

  data.forEach((order, i) => {
    const card = document.createElement("div");
    card.className = "order-card";
    card.innerHTML = 
      <div class="status-label">Pr ${i + 1}</div>
      <h3>${order.tjeneste}</h3>
      <p><strong>Navn:</strong> ${order.navn}</p>
      <p><strong>Adresse:</strong> ${order.adresse}</p>
      <p><strong>Dato:</strong> ${order.dato}</p>
      <p><strong>Klokkeslett:</strong> ${order.tid}</p>
      <p><strong>Status:</strong> ${order.status}</p>
      <div class="card-actions">
        <button onclick="handleAction('godkjenn', ${order.id})">✅</button>
        <button onclick="handleAction('fullfor', ${order.id})">✔️</button>
        <button onclick="handleAction('slett', ${order.id})">❌</button>
      </div>
    ;
    if (order.status === "fullført") done.appendChild(card);
    else if (order.status === "kansellert") cancelled.appendChild(card);
    else active.appendChild(card);
  });
}

function handleAction(action, id) {
  let status = "";
  if (action === "godkjenn") status = "aktiv";
  else if (action === "fullfor") status = "fullført";
  else if (action === "slett") status = "kansellert";

  fetch(http://localhost:3001/bestillinger/${id}, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  })
    .then((res) => res.json())
    .then(() => location.reload())
    .catch((err) => console.error("Feil:", err));
}


