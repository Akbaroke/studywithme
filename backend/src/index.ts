import { web } from './application/web';
import { logger } from './application/logging';
import util from 'util';
import { exec } from 'child_process';

const port = process.env.PORT || 5000;
const execPromise = util.promisify(exec);

async function startServer() {
  try {
    logger.info('Running migrations...');
    await execPromise('npx prisma migrate deploy');
    logger.info('Migrations completed.');

    web.listen(port, () => {
      logger.info(`Listening on port ${port}`);
    });
  } catch (error) {
    logger.error('Error running migrations:', error);
    process.exit(1); // Exit with failure
  }
}

startServer();