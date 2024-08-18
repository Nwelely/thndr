'use client';
import Movies from "./components/Movies";
import Form from "./components/Movies";
// import type { FormProps } from 'antd';
import styles from "./page.module.css";

export default function Home() {
  
  return (
    <main className={styles.main}>
   <Movies />
    </main>
  );
}
