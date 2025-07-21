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

  await uploadBytes(storageRef, blob);

  const imageUrl = await getDownloadURL(storageRef);

  await addDoc(collection(db, 'apples'), {
    name: appleName,
    sugarContent: sugarContent,
    imgURL: imageUrl,
    writeTime: serverTimestamp(),
  });

  return imageUrl;
}
