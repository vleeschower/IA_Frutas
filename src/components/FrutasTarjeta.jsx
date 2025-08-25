import React from "react";
import { FRUITS_INFO } from "./FrutasInfo";

export default function FruitCard({ bestPrediction }) {
  if (!bestPrediction || !FRUITS_INFO[bestPrediction]) return null;

  const fruit = FRUITS_INFO[bestPrediction];

  return (
    <div
      style={{
        backgroundColor: fruit.color,
        color: "#fff",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
        width: "100%",
        maxWidth: "320px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        animation: "fadeInUp 0.5s ease forwards",
      }}
    >
      <img
        src={fruit.imagen}
        alt={bestPrediction}
        style={{
          width: "120px",
          marginBottom: "20px",
          filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.3))",
        }}
      />
      <h2 style={{ marginBottom: "15px", fontSize: "1.8rem", fontWeight: "700" }}>
        {bestPrediction}
      </h2>
      <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>{fruit.descripcion}</p>

      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
