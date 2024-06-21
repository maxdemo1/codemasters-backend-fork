
import fs from 'fs';
import * as path from "node:path";

const swaggerFile = path.resolve('swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFile, 'utf8'));

export default swaggerDocument;