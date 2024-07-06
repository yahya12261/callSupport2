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
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailService {
    constructor() {
        var _a, _b;
        console.log(process.env.EMAIL, process.env.EMAIL_PASSOWRD);
        this.transporter = nodemailer_1.default.createTransport({
            service: process.env.MAILTYPE,
            auth: {
                user: (_a = process.env.EMAIL) === null || _a === void 0 ? void 0 : _a.toString(),
                pass: (_b = process.env.EMAIL_PASSOWRD) === null || _b === void 0 ? void 0 : _b.toString()
            }
        });
    }
    sendEmail(to, subject, text) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const mailOptions = {
                from: (_a = process.env.EMAIL) === null || _a === void 0 ? void 0 : _a.toString(),
                to,
                subject,
                text
            };
            try {
                yield this.transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
            }
            catch (error) {
                console.error('Error sending email:', error);
                throw error;
            }
        });
    }
}
exports.EmailService = EmailService;
// Usage example
//# sourceMappingURL=EmailService.js.map