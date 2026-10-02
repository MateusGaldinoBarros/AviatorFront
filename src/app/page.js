"use client";
import styles from './page.module.css'  
import Multiplicador from './multiplicador';



export default function Home() {
  
  return (
    <main className={styles.main}>
      <Multiplicador />
    </main>
  );
}

