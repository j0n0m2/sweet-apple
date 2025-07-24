import { db } from '@/lib/firebase';
import { useSuspenseQuery } from '@tanstack/react-query';
import { collection, getDocs, Timestamp } from 'firebase/firestore';

interface AppleItem {
  id: string;
  name: string;
  sugarContent: number;
  imgURL: string;
  writeTime: Timestamp;
}

export const useMarketItems = () => {
  return useSuspenseQuery<AppleItem[]>({
    queryKey: ['marketItems'],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, 'apples'));
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<AppleItem, 'id'>),
      }));
    },
    staleTime: 1000 * 60 * 5,
  });
};
