import { BUSY_VIDEO_URL, PLEX_TOKEN, PLEX_URL } from './envs';
import axios from 'axios';
import exp from 'constants';

interface Setting {
  [x: string]: any;

  id: string;
}

interface MediaContainer {
  Size: number;
  Setting: Setting[];
}

interface PlexPrefs {
  MediaContainer: MediaContainer;
}

const defaultConfig = {
  baseURL: `http://${PLEX_URL}/`,
  params: {
    'X-Plex-Token': PLEX_TOKEN,
  },
  headers: {
    'Accept': 'application/json',
  },
};

const plex = axios.create(defaultConfig);

const PrerollKey = 'CinemaTrailersPrerollID';

export const setPlexPrerollVideo = (video: string) => plex.put(':/prefs', {}, { params: { [PrerollKey]: video } });
export const plexGetPrefs = () => plex.get<PlexPrefs>(':/prefs');

export const plexGetCurrentPreRoll = async () => {
  const prefs = await plexGetPrefs();
  const currentPreRolls = prefs.data.MediaContainer.Setting.find(({ id }) => id === PrerollKey);

  if (!currentPreRolls) throw new Error('Settings not found');

  return currentPreRolls.value as string;
};

export const plexPrerollGroupStringToGroups = (prerolls: string) => prerolls.split(';').map((group) => group.split(','));
export const plexPrerollGroupsToString = (groups: string[][]) => groups.map((group) => group.join(',')).join(';');

export const removePreRollFromGroups = (preroll: string, groups: string[][]) => groups.map((group) => group.filter((item) => preroll !== item));

export const addPreRollToGroups = (preroll: string, groups: string[][]) => groups.map((group) => {
  if (!group.includes(preroll)) group.unshift(preroll);
  return group;
});

export const plexAddBusyPreroll = async () => {
  const currentPrerolls = await plexGetCurrentPreRoll();

  const currentPrerollsWithBusy = await Promise.resolve(currentPrerolls)
    .then(plexPrerollGroupStringToGroups)
    .then((groups) => addPreRollToGroups(BUSY_VIDEO_URL, groups));

  const newPrerolls = plexPrerollGroupsToString(currentPrerollsWithBusy);

  if (currentPrerolls === newPrerolls) return true;

  console.log('Setting new prerolls', newPrerolls);

  return setPlexPrerollVideo(newPrerolls);
};

export const plexRemoveBusyPreroll = async () => {
  const currentPrerolls = await plexGetCurrentPreRoll();

  const currentPrerollsWithBusy = await Promise.resolve(currentPrerolls)
    .then(plexPrerollGroupStringToGroups)
    .then((groups) => removePreRollFromGroups(BUSY_VIDEO_URL, groups));

  const newPrerolls = plexPrerollGroupsToString(currentPrerollsWithBusy);

  if (currentPrerolls === newPrerolls) return true;

  console.log('Setting new prerolls', newPrerolls);

  return setPlexPrerollVideo(newPrerolls);
};
