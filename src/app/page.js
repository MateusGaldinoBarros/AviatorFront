"use client";
import { useState, useRef, useEffect } from "react";
import styles from './page.module.css'  



export default function Home() {
  const ultimoNumeroRef = useRef(0);
  const [valorExibido, setValorExibido] = useState(0);
  const [crash, setCrash] = useState(false);
  
  useEffect(() => {
    
    const ws = new WebSocket("ws://localhost:8080/aviao");
    ws.onopen = () => {
    console.log("Conexão WebSocket estabelecida.");
  }
  

  ws.onmessage = (event) => {
    setCrash(false);

    const mensagem = JSON.parse(event.data);
    let numero = 0;
    if (mensagem.tipo === "numero") {
      numero = parseFloat(mensagem.valor);
    }
    ultimoNumeroRef.current = numero;
    
    if (mensagem.tipo === "CRASH") {
      setCrash(true);
    }
  }

  const intervaloRender = setInterval(() => {
      setValorExibido(ultimoNumeroRef.current);
      console.log("Valor exibido atualizado:", valorExibido);
    }, 100);

  return () => {
      ws.close();
      clearInterval(intervaloRender);}


  }, []);
  
  return (
    <div className={styles.container}>
      <p className={styles.valorExibido + (crash ? ' ' + styles.valorExibido_crash : '')}>
        {valorExibido.toFixed(2) + "x"}
      </p>
    </div>
  );
}

//ws://localhost:8080/aviao
//