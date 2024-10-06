import morgan from "morgan";
import chalk from "chalk";

export const morganMiddleware = morgan(function (tokens, req, res) {
    const time = Date.parse(tokens.date(req, res)) + 5.5 * 60 * 60 * 1000;

    return [
        chalk.hex('#34ace0')(tokens.method(req, res)),
        chalk.hex('#ffb142')(tokens.status(req, res)),
        chalk.hex('#ff5252')(tokens.url(req, res)),
        chalk.hex('#2ed573')(tokens['response-time'](req, res) + ' ms'),
        chalk.hex('#f78fb3')(new Date(time).toUTCString())
    ].join(' ');
});