"use client";
import { useState, useRef, useEffect } from "react";




export default function Home() {
  const ultimoNumeroRef = useRef(0);
  const [valorExibido, setValorExibido] = useState(0);
  
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/aviao");
    ws.onopen = () => {
    console.log("Conexão WebSocket estabelecida.");
  }
  

  ws.onmessage = (event) => {
    const numero = parseFloat(event.data);
    ultimoNumeroRef.current = numero;
    

    const intervaloRender = setInterval(() => {
      setValorExibido(ultimoNumeroRef.current);
      console.log("Valor exibido atualizado:", valorExibido);
    }, 100);

    

    return () => {
      ws.close();
      clearInterval(intervaloRender);}
  }
  }, []);
  
  return (
    <div>
      <h1>Valor recebido do WebSocket:</h1>
      <p>{valorExibido.toFixed(2)+ "x"}</p>
    </div>
  );
}

//ws://localhost:8080/aviao
