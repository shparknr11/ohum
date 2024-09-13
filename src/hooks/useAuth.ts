import { useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, DocumentData } from 'firebase/firestore';

interface UserData {
  //name: string;
}

const useAuth = () => {
  // 사용자 유무 상태
  const [user, setUser] = useState<boolean>(false);
  // 사용자 정보를 저장하는 상태
  const [userData, setUserData] = useState<UserData | null>(null);

  // 사용자 정보를 읽어들이는 함수
  const fetchUserData = async (who: FirebaseUser) => {
    if (!who) {
      return;
    }
    // 사용자 문서 참조 생성
    const userInfoGetDoc = doc(db, 'users', who.uid);
    const docSnap = await getDoc(userInfoGetDoc);

    if (docSnap.exists()) {
      setUserData(docSnap.data() as UserData);
    } else {
      console.log('No such document!');
    }
  };

  // Firebase 인증 상태 변경을 감지
  useEffect(() => {
    // 인증 상태 변경 리스너 등록
    const unsubscribe = onAuthStateChanged(auth, async (who) => {
      if (who) {
        setUser(true);
        await fetchUserData(who);
      } else {
        setUserData(null);
        setUser(false);
      }
    });

    // 클린업 함수
    return () => unsubscribe();
  }, []);

  return { user, setUser, userData, setUserData };
};

export default useAuth;
