import { createRoot } from 'react-dom/client'
import './index.css'
// Uncomment this import in case, you would like to develop the application even outside
// the Telegram application, just in your browser.
import './mockEnv.ts';

import '@telegram-apps/telegram-ui/dist/styles.css';
import {Root} from "./Root.tsx";

createRoot(document.getElementById('root')!).render(<Root/>);
