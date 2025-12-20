import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { dataBettas } from "./data";
import {
  createBetta,
  createBettaSchema,
  BettaClass,
  BettaSchema,
  Betta,
  updateBetta,
} from "../type/schema";
export const bettaRoute = new Hono();

let bettas: BettaClass[] = dataBettas;

// get all bettas
bettaRoute.get("/", (c) => {
  return c.json(bettas);
});

// Get one betta By Slug
bettaRoute.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const betta = bettas.find((betta) => betta.slug === slug);

  if (!betta) {
    return c.notFound();
  }

  return c.json(betta);
});

// Get one Betta by ID
bettaRoute.get("/id/:id", (c) => {
  const id = c.req.param("id");
  const betta = bettas.find((betta) => betta.id === id);

  if (!betta) {
    return c.json({
      message: "Not Found Betta",
    });
  }

  return c.json(betta);
});

//Get by complex
bettaRoute.get("/complex/:complex", (c) => {
  const complex = c.req.param("complex").toLowerCase();
  const betta = bettas.filter((betta) => betta.complex === complex);

  if (!betta) {
    return c.notFound();
  }

  return c.json(betta);
});

// Add new Data
bettaRoute.post("/", zValidator("json", createBettaSchema), (c) => {
  const body: createBetta = c.req.valid("json");

  const newBetta = new BettaClass(body);

  bettas = [...dataBettas, newBetta];

  return c.json(newBetta, 201);
});

// Delete Data by id
bettaRoute.delete("/:id", (c) => {
  const id = c.req.param("id").toLowerCase();

  const checkId = bettas.find((betta) => betta.id === id);
  if (!checkId) return c.json({ message: "Wrong ID" });

  const updatedBettas = bettas.filter((betta) => betta.id !== id);
  const deletedBetta = bettas.filter((betta) => betta.id == id);

  bettas = updatedBettas;
  return c.json({
    message: "Bettas has been deleted",
    deletedBetta: deletedBetta,
  });
});

// Update Data
bettaRoute.patch(
  "/:id",
  zValidator("json", updateBetta.partial()),
  async (c) => {
    const id = c.req.param("id");
    const body: Betta = await c.req.json();
    const betta = bettas.find((betta) => betta.id === id);

    if (!betta) return c.json({ message: "Betta not found" });

    const newBettaData = { ...betta, ...body, updateAt: new Date() };

    bettas = bettas.map((betta) => (betta.id === id ? newBettaData : betta));

    return c.json({
      message: "Betta Has been Updates",
      newBettaData: newBettaData,
      oldBettaData: betta,
    });
  }
);

bettaRoute.put("/:id", zValidator("json", updateBetta), async (c) => {
  const id = c.req.param("id");
  const body: updateBetta = await c.req.json();
  const betta = bettas.find((betta) => betta.id === id);

  if (!betta) return c.json({ message: "Betta not found" });

  const newBettaData = {
    id: id,
    slug: body.name.toLocaleLowerCase().trim().split(" ").join("-"),
    ...body,
    createdAt: betta.createdAt,
    updateAt: new Date(),
  };

  bettas = bettas.map((betta) => (betta.id === id ? newBettaData : betta));

  return c.json({
    message: "Betta Has been Updates",
    newBettaData: newBettaData,
    oldBettaData: betta,
  });
});
