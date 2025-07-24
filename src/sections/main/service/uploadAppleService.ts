import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { dataURLtoBlob } from '../utils/dataURLtoBlob';

const storage = getStorage();
const db = getFirestore();

export async function uploadAppleImageAndMeta({
  dataUrl,
  appleName,
  sugarContent,
}: {
  dataUrl: string;
  appleName: string;
  sugarContent: number;
}) {
  const blob = dataURLtoBlob(dataUrl);

  const storageRef = ref(storage, `apples/${Date.now()}.webp`);

  const metadata = {
    cacheControl: 'public, max-age=31536000', // 1년 캐시 유지
  };
  
  await uploadBytes(storageRef, blob, metadata);

  const imageUrl = await getDownloadURL(storageRef);

  await addDoc(collection(db, 'apples'), {
    name: appleName,
    sugarContent: sugarContent,
    imgURL: imageUrl,
    writeTime: serverTimestamp(),
  });

  return imageUrl;
}
