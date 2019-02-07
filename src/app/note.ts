import {RecallNotePair} from './recall-note-pair';

export class Note {
  name: string;
  createdOn: Date;
  pinned: boolean;
  recallNotePairs: RecallNotePair[];
}
