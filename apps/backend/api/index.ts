// import { log } from "@repo/logger";
import { createServer } from "./server";

const port = process.env.PORT || 5001;
const server = createServer();

server.listen(port, () => {
  // eslint-disable-next-line -- logger
  // log(`api running on ${port}`);
});

module.exports = server;