// server.js
require('dotenv').config();
const app = require('./src/app');
const port =process.env.PORT_SERVER || 3000;
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
