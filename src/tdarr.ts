import axios from 'axios';
import { TDARR_NODE, TDARR_URL } from './envs';


interface WorkerJob {
  [x: string]: any;
}

interface Node {
  [x: string]: any;
  workers: { [name: string]: WorkerJob }
}

interface Nodes {
  [x: string]: Node;
}

const tdarr = axios.create({
  baseURL: `http://${TDARR_URL}/api/v2`,
});

export const tdarrGetNodesStatus = () => tdarr.get<Nodes>('/get-nodes');

export const tdarrCheckIfBusy = async () => {
  const tdarrStatus = await tdarrGetNodesStatus();
  const worker = tdarrStatus.data[TDARR_NODE];

  return !!(Object.keys(worker.workers).length);
}
