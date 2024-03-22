import 'module-alias/register'
import { setupApp } from '@/main/config/app'

(async () => {
  const { httpServer } = await setupApp();

  httpServer.listen(3000, () => {
    console.log('HTTP Server and Socket Server are running at http://localhost:3000');
  });
})()
