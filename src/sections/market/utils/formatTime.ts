import { Timestamp } from 'firebase/firestore';

export const formattedDate = (writeTime: Timestamp) =>
  writeTime.toDate().toLocaleDateString('ko-KR');
