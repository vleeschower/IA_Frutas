export default function CameraPanel({ init, isStarted, webcamContainerRef }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
        textAlign: "center",
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <button
        onClick={init}
        style={{
          background: "linear-gradient(135deg, #b52ac2ff, #2d10d3ff)",
          color: "white",
          border: "none",
          padding: "16px 32px",
          fontSize: "1.1rem",
          fontWeight: "600",
          borderRadius: "50px",
          cursor: "pointer",
          marginBottom: "25px",
          boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
          transition: "all 0.3s ease",
          width: "100%",
          maxWidth: "300px",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
      >
        {isStarted ? "En Funcionamiento" : "Iniciar Cámara"}
      </button>

      <div
        ref={webcamContainerRef}
        style={{
          border: "5px solid #2d10d3ff",
          borderRadius: "10%",
          overflow: "hidden",
          width: "300px",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        }}
      >
        {!isStarted && (
          <div
            style={{
              color: "#2d10d3ff",
              fontSize: "1rem",
              textAlign: "center",
              padding: "20px",
            }}
          >
            Presiona "Iniciar Cámara" para comenzar
          </div>
        )}
      </div>
    </div>
  );
}
