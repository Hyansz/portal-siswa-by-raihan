import styles from '@/styles/Login.module.css';
import { dmSans } from '@/styles/fonts';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const [nis, setNis] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className={`${styles.container} ${dmSans.className}`}>
      <div className={styles.card}>
        <h1>Sign</h1>
        <div className={styles.summary}>
          Enter your email and password to sign in!
        </div>
        <div className={styles.fieldInput}>
          <div className={styles.label}>
            NIS<span className={styles.star}>*</span>
          </div>
          <input
            className={styles.input}
            placeholder="12345"
            onChange={(e) => {
              setNis(e.target.value);
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={styles.forgot}>
          <input
            placeholder="******"
            type="checkbox"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className={styles.forgot2}>
            Ingat Saya
          </div>
        </div>
        <button
          className={styles.buttonPrimary}
          onClick={async (e) => {
            const data = { nis, password };
            console.log('click daftar by: ', data);

            try {
              const res = await fetch('/api/login', {
                method: 'POST', // Corrected the typo in 'method'
                body: JSON.stringify(data), // Assuming 'data' is an object that you want to send as JSON
                headers: {
                  'Content-Type': 'application/json', // Specifying the content type as JSON
                },
              });
              const responseData = await res.json();
              if (res.ok) {
                // Periksa apakah respons memiliki status code 200 (OK)
                // Mendapatkan data JSON dari respons
                console.log('responseData: ', responseData);
                alert('sukses login');
                router.push('/dashboard');
              } else {
                console.error('Gagal melakukan permintaan:', res.status);
                console.log(responseData);
                alert(responseData.message);
              }
            } catch (error) {
              console.log('error: ', error);
              alert('Terjadi Kesalahan, harap hubungi team support');
            }
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
