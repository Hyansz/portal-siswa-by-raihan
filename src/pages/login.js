import styles from '@/styles/Login.module.css';
import { dmSans } from '@/styles/fonts';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';

export default function Login() {
  const router = useRouter();

  const [nis, setNis] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isKeepLogin, setKeepLogin] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const myCookieValue = getCookie('token');
      if (myCookieValue) {
        router.push('/dashboard');
      }
    };

    checkLoginStatus();
  }, [router]);

  useEffect(() => {
    const lastInput = JSON.parse(localStorage.getItem('lastInput'));
  
    if (lastInput) {
      setNis(lastInput.nis);
      setPassword(lastInput.password);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { nis, password };

    setIsLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const responseData = await res.json();
        alert('Sukses login');

        console.log('responseData: ', responseData); //ex: {token: 'Id2Qs257T0', isKeepLogin: true}
        localStorage.setItem('keepLogin', responseData.isKeepLogin);
        if (!responseData.isKeepLogin) {
          sessionStorage.setItem('token', responseData.token);
        }

        localStorage.setItem('lastInput', JSON.stringify({ nis, password, isKeepLogin }));

        router.push('/dashboard');
      } else {
        console.error('Gagal melakukan permintaan:', res.status);
        const responseData = await res.json();
        if (responseData.message === 'Password not found') {
          alert('Password tidak ditemukan');
        } else if (responseData.message === 'nis not found') {
          alert('nis tidak ditemukan');
        } else {
          alert(responseData.message);
        }
      }
    } catch (error) {
      console.log('error: ', error);
      alert('Terjadi Kesalahan, harap hubungi tim support');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={`${styles.container} ${dmSans.className}`}>
      <div className={styles.card}>
        <h1>Sign In</h1>
        <div className={styles.summary}>
          Enter your nis and password to sign in!
        </div>
        <div className={styles.fieldInput}>
          <div className={styles.label}>
            NIS<span className={styles.star}>*</span>
          </div>
          <input
            className={styles.input}
            placeholder="12345"
            onChange={(e) => setNis(e.target.value)}
          />
        </div>
        <div className={styles.fieldInput}>
          <div className={styles.label}>
            Password<span className={styles.star}>*</span>
          </div>
          <input
            className={styles.input}
            placeholder="******"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.boxForgot}>
            <div className={styles.forgot}>
              <input
                type="checkbox"
                onChange={(e) => {
                  console.log(e.target.checked);
                  let isChecked = e.target.checked;
                  localStorage.setItem('keepLogin', isChecked);
                  setKeepLogin(isChecked);
                }}
              />
              <span> Keep Me Logged In</span>
            </div>
        </div>
        <button
          className={styles.buttonPrimary}
          onClick={handleLogin}
        >
          {isLoading ? 'Loading...' : 'Sign In'}
        </button>
        <div className={styles.boxForgot2}>
          <div className={styles.forgot2}>
            <a href='./daftar'>Belum Punya Akun?</a>
          </div>
        </div>
      </div>
      
      <div className={styles.card2}>
        <div className={styles.text2}>
          <h1>Selamat Datang</h1>
          <p>Silahkan <b>Login</b> terlebih dahulu <br/> sebelum masuk ke dalam web.</p>
        </div>
      </div>
    </div>
  );
}
