"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web_1 = require("./application/web");
const logging_1 = require("./application/logging");
const util_1 = __importDefault(require("util"));
const child_process_1 = require("child_process");
const port = process.env.PORT || 5000;
const execPromise = util_1.default.promisify(child_process_1.exec);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logging_1.logger.info('Running migrations...');
            yield execPromise('npx prisma migrate deploy');
            logging_1.logger.info('Migrations completed.');
            web_1.web.listen(port, () => {
                logging_1.logger.info(`Listening on port ${port}`);
            });
        }
        catch (error) {
            logging_1.logger.error('Error running migrations:', error);
            process.exit(1); // Exit with failure
        }
    });
}
startServer();
