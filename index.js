const http = require('http');
const app = require('./app');
const PORT = 3003;

const server = http.createServer(app);

const servidor = server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = servidor;
