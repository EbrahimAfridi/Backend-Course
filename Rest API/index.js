const express = require("express");
const app = express();
const users = require("./Mock Data/MOCK_DATA.json");
const PORT = 8080;

// Routes
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/users", (req, res) => {
  const html = `<ul>
    ${users.map((user) => `<li>${user.first_name}</li> <br />`).join("")}
  </ul>`;
  res.send(html);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    console.log("PATCH");
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    console.log("DELETE");
    return res.json({ status: "Pending" });
  });

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
