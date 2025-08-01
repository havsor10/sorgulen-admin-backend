
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Gjør public filer tilgjengelig (login.html, admin-dashboard.html, etc.)
app.use(express.static(path.join(__dirname)));

const dataPath = path.join(__dirname, "data", "bestillinger.json");

app.get("/bestillinger", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Kunne ikke hente bestillinger" });
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server kjører på port ${PORT}`);
});
