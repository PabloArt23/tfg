"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const obraedit_1 = require("../controllers/obraedit");
const validate_tokens_1 = __importDefault(require("./validate-tokens"));
const router = (0, express_1.Router)();
router.get('/', validate_tokens_1.default, obraedit_1.getObraAEditar);
exports.default = router;
