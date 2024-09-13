import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import loginBanner from '../images/loginbanner.png';

// 로그인 및 회원가입 컴포넌트
const Login = (): JSX.Element => {
  // 패스 이동하기
  const navigate = useNavigate();
  // 현재 화면 상태 관리
  const [isScene, setIsScene] = useState<'login' | 'join'>('login');
  // 입력 항목 상태 관리
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  // 입력 에러 상태 관리
  const [error, setError] = useState<string>('');

  // 키보드로 로그인 시도시 처리
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleAuth();
    }
  };

  // 로그인 처리
  const handleAuth = () => {
    if (!email) {
      setError('이메일을 입력하세요.');
      return;
    }
    if (!pw) {
      setError('비밀번호를 입력하세요.');
      return;
    }
    fbLogin();
  };

  // Firebase 로그인 처리
  const fbLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      navigate('/todo');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
          setError('사용자를 찾을 수 없습니다.');
          break;
        case 'auth/wrong-password':
          setError('비밀번호가 틀렸습니다.');
          break;
        case 'auth/invalid-email':
          setError('유효하지 않은 이메일 주소입니다.');
          break;
        default:
          setError('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  // 회원가입 처리
  const handleJoin = () => {
    if (!name) {
      setError('닉네임을 입력하세요.');
      return;
    }
    if (!email) {
      setError('이메일을 입력하세요.');
      return;
    }
    if (!pw) {
      setError('비밀번호를 입력하세요.');
      return;
    }
    fbJoin();
  };

  // Firebase 회원가입 처리
  const fbJoin = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pw,
      );
      const user = userCredential.user;
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, { name, email });
      await signOut(auth);
      setError('');
      setName('');
      setEmail('');
      setPw('');
      setIsScene('login');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('이메일을 바르게 입력해주세요.');
          break;
        case 'auth/weak-password':
          setError('비밀번호가 너무 쉬워요.');
          break;
        case 'auth/email-already-in-use':
          setError('등록된 이메일 입니다.');
          break;
        default:
          setError('회원가입 실패');
      }
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-banner">
        <img src={loginBanner} alt="login-banner" />
      </div>
      {isScene === 'login' ? (
        <>
          <div className="login-inner-div email">
            <label>이메일</label>
            <input
              className="bottom-border no-border"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              onKeyDown={handleKeyPress}
              type="email"
              placeholder="예) example@gmail.com"
            />
          </div>
          <div className="login-inner-div pw">
            <label>비밀번호</label>
            <input
              className="bottom-border no-border"
              value={pw}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPw(e.target.value)
              }
              onKeyDown={handleKeyPress}
              type="password"
              placeholder="⁕⁕⁕"
            />
          </div>
          {error && <p>{error}</p>}
          <button className="loginbt" onClick={handleAuth}>
            로그인
          </button>
          <div className="join-find-div">
            <div
              className="go-joinbt"
              onClick={() => {
                setIsScene('join');
                setError('');
                setEmail('');
                setPw('');
              }}
            >
              회원가입
            </div>
            <div className="find-id">아이디 • 비밀번호 찾기</div>
          </div>
        </>
      ) : (
        <>
          <div>
            <label>이름</label>
            <input
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              type="text"
              placeholder="이름"
            />
          </div>

          <div>
            <label>이메일</label>
            <input
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              type="email"
              placeholder="이메일"
            />
          </div>

          <div>
            <label>비밀번호</label>
            <input
              value={pw}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPw(e.target.value)
              }
              type="password"
              placeholder="비밀번호"
            />
            <p>비밀번호는 최소 6자입니다.</p>
          </div>

          {error && <p>{error}</p>}
          <button onClick={handleJoin}>회원가입</button>
          <button
            onClick={() => {
              setError('');
              setName('');
              setEmail('');
              setPw('');
              setIsScene('login');
            }}
          >
            이미 계정이 있습니까?
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
