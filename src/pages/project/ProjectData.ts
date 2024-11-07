import { Timestamp } from "firebase/firestore";

export interface User {
  id: string;
  photoURL: string;
}

export interface Project {
  id: string;
  name: string;
  dateDue: {
    toDate: () => Date;
  };
  details: string;
  assignedUserList: User[];
  createdBy: {
    id: string;
  };
  comments?:
    | {
        displayName: string;
        photoURL: string;
        content: string;
        createdAt: Timestamp;
        id: number;
      }[];
}
