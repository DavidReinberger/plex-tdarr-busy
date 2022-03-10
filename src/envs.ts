export const CRON = process.env.CRON || '0 0 */1 * * *' // By default it runs the task every hour
export const TDARR_URL = process.env.TDARR_URL!;
export const TDARR_NODE = process.env.TDARR_NODE!;
export const PLEX_URL = process.env.PLEX_URL!;
export const PLEX_TOKEN = process.env.PLEX_TOKEN!;
export const BUSY_VIDEO_URL = process.env.BUSY_VIDEO_URL!; // This needs to be relative to the plex container
// export const KEEP_OTHER_PRE_ROLLS = process.env.KEEP_OTHER_PRE_ROLLS ?? true;
// export const INSERT_INTO_ALL_GROUPS = process.env.INSERT_INTO_ALL_GROUPS ?? true;
