import React, { useRef, useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";
import CameraPanel from "./components/CamaraTarjeta"; // Panel de cámara
import FruitCard from "./components/FrutasTarjeta"; // Tarjeta de fruta

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/aBYpSNoF_/";

export default function App() {
  const webcamContainerRef = useRef(null);
  const [isStarted, setIsStarted] = useState(false);
  const [bestPrediction, setBestPrediction] = useState(null);

  const modelRef = useRef(null);
  const webcamRef = useRef(null);

  // Inicia el modelo
  const init = async () => {
    if (isStarted) return;
    setIsStarted(true);

    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";

    const model = await tmImage.load(modelURL, metadataURL);
    modelRef.current = model;

    const flip = true;
    const webcam = new tmImage.Webcam(300, 300, flip);
    await webcam.setup();
    await webcam.play();
    webcamRef.current = webcam;

    if (webcamContainerRef.current) {
      webcamContainerRef.current.innerHTML = "";
      webcamContainerRef.current.appendChild(webcam.canvas);
    }

    window.requestAnimationFrame(loop);
  };

  const loop = async () => {
    if (webcamRef.current) {
      webcamRef.current.update();
      await predict();
      window.requestAnimationFrame(loop);
    }
  };

  const predict = async () => {
    if (!modelRef.current || !webcamRef.current) return;
    const prediction = await modelRef.current.predict(webcamRef.current.canvas);

    const best = prediction.reduce((prev, current) =>
      prev.probability > current.probability ? prev : current
    );

    if (best.probability > 0.8) {
      setBestPrediction(best.className);
    } else {
      setBestPrediction(null);
    }
  };

  const closeCard = () => setBestPrediction(null);

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, #b52ac2ff, #2d10d3ff)",
        minHeight: "100vh",
        width: "100vw",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Título fijo arriba */}
      <h1
        style={{
          color: "#ffffffff",
          fontSize: "2.5rem",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "40px",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        Identificador de frutas
      </h1>

      {/* Contenedor principal: cámara y tarjeta */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        {/* Cámara */}
        <CameraPanel
          init={init}
          isStarted={isStarted}
          webcamContainerRef={webcamContainerRef}
        />

        {/* Tarjeta de fruta */}
        {bestPrediction && (
          <FruitCard bestPrediction={bestPrediction} onClose={closeCard} />
        )}
      </div>
    </div>
  );
}
