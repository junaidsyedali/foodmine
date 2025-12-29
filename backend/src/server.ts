import express from "express";
import cors from "cors";
import { sample_foods, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
const PORT = 5000;
app.use(cors({ credentials: true, origin: ["http://localhost:4200"] }));
app.disable("etag");

app.get("/api/foods", (req, res) => {
  res.json(sample_foods);
});

app.get("/api/foods/tags", (req, res) => {
  res.json(sample_tags);
});

app.get("/api/foods/:foodId", (req, res) => {
  const foodId = req.params.foodId;
  const food = sample_foods.find((food) => food.id === foodId);
  res.json(food);
});

app.get("/api/foods/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const filteredFoods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.json(filteredFoods);
});

app.get("/api/foods/tag/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const filteredFoods = sample_foods.filter((food) =>
    food.tags.includes(tagName)
  );
  res.json(filteredFoods);
});

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;
  const user = sample_users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "secretkey",
    {
      expiresIn: "30d",
    }
  );
  user.token = token;
  return user;
};

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
