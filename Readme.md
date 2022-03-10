**plex-tdarr-busy** is s container that checks if there are any transcodes happening on a [tdarr.io](https://tdarr.io) node and adds a [preroll to Plex](https://support.plex.tv/articles/202920803-extras/).

## Environment Variables
|                | Description                                                               | Value                                 | Defaults        |
|---------------:|---------------------------------------------------------------------------|---------------------------------------|-----------------|
|           CRON | The Cron expression (how often the script executes)                       | `string`                              | `0 0 */1 * * *` |
|      TDARR_URL | The URL of the TDARR Server                                               | ip/url without schema (http or https) |                 |
|     TDARR_NODE | Name of the TDARR Node that is going to checked for activity              | `string`                              |                 |
|       PLEX_URL | The URL of the Plex server                                                | ip/url without schema (http or https) |                 |
|     PLEX_TOKEN | The Plex token to be used when issuing a request                          | `string`                              |                 |
| BUSY_VIDEO_URL | The URL (relative to plex) of the video that should be used as a preroll. | `string`                              |                 |
