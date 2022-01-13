import express from "express";
import { textQuery, eventQuery } from "../controller/chatbot.js";
const router = express.Router();

router.post("/api/df_event_query", eventQuery);
router.post("/api/df_text_query", textQuery);
export default router;
