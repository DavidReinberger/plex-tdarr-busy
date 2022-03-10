import cron from 'node-cron';
import { BUSY_VIDEO_URL, CRON, PLEX_TOKEN, PLEX_URL, TDARR_NODE, TDARR_URL } from './envs';
import { tdarrCheckIfBusy } from './tdarr';
import { plexAddBusyPreroll, plexRemoveBusyPreroll, setPlexPrerollVideo } from './plex';

if (!CRON) throw new Error('CRON is required');
if (!TDARR_URL) throw new Error('TDARR_URL is required');
if (!TDARR_NODE) throw new Error('TDARR_NODE is required');
if (!PLEX_URL) throw new Error('PLEX_URL is required');
if (!PLEX_TOKEN) throw new Error('PLEX_TOKEN is required');
if (!BUSY_VIDEO_URL) throw new Error('BUSY_VIDEO_URL is required');

console.log('Server Started!');
console.log(`Current Setup:
CRON: ${CRON}
TDARR_URL: ${TDARR_URL}
TDARR_NODE: ${TDARR_NODE}
PLEX_URL: ${PLEX_URL}
PLEX_TOKEN: ${PLEX_TOKEN}
BUSY_VIDEO_URL: ${BUSY_VIDEO_URL}`);

console.log(cron.validate(CRON));

cron.schedule(CRON, async () => {
  console.log('Checking if server is busy...');
  try {
    const isTdarrBusy = await tdarrCheckIfBusy();

    if (isTdarrBusy) {
      console.log(`${new Date().toDateString()} - Server IS busy!`);
      await plexAddBusyPreroll();
    } else {
      console.log(`${new Date().toDateString()} - Server is NOT busy!`);
      await plexRemoveBusyPreroll();
    }
  } catch (e) {
    console.log(e);
  }
}).on('error', console.log);
