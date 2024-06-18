import { web } from './application/web';
import { logger } from './application/logging';

web.listen(5000, () => {
  logger.info('Listening on port 5000');
});
