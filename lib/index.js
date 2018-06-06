"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PuppeteerService_1 = require("./services/PuppeteerService");
class HeadlessPoolPuppeteer extends PuppeteerService_1.default {
}
exports.HeadlessPoolPuppeteer = HeadlessPoolPuppeteer;
class HeadlessPool extends HeadlessPoolPuppeteer {
}
exports.default = HeadlessPool;
