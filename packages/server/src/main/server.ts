import 'module-alias/register'
import { setupApp } from '@/main/config/app'

(async () => {
  const app = await setupApp();

  app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
  });
})()
