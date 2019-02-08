import {RecallNotePair} from './recall-note-pair';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export class Note {
  name: string;
  createdOn: Timestamp;
  pinned: boolean;
  recallNotePairs: RecallNotePair[];
}
