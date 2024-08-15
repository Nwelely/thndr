'use client';
import Form from "./components/Form";
// import type { FormProps } from 'antd';
import styles from "./page.module.css";

export default function Home() {
  
  return (
    <main className={styles.main}>
   <Form name={"nour"} />
    </main>
  );
}
