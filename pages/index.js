export default function Home() {
  return (
    <div style={{
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#e6f7ff",
      minHeight: "100vh",
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h1>Welcome to Chaicode</h1>
      <p>Website designed by Anuj Jain for Demo.</p>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        marginTop: "40px"
      }}>
        {/* Piyush Garg Card */}
        <div style={{
          width: "800px",   // same as chat box
          height: "1000px",  // same as chat box
          border: "2px solid #99d6ff",
          borderRadius: "12px",
          padding: "20px",
          backgroundColor: "#cceeff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div>
          <img src="/images/Piyush.png" alt="Piyush Garg" style={{ width: "100%", borderRadius: "10px" }} />
            <h3 style={{ marginTop: "15px" }}>Piyush Garg</h3>
            <p>Technical Educator & Live Coder — teaches by live coding in real time.</p>
            <div style={{ marginTop: "10px" }}>
              <span style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                backgroundColor: "#4caf50",
                borderRadius: "50%",
                marginRight: "5px"
              }}></span>
              Online
            </div>
          </div>
          <button
            style={{
              padding: "12px 20px",
              borderRadius: "6px",
              backgroundColor: "#0070f3",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              marginTop: "auto"
            }}
            onClick={() => window.location.href = "/frontend_flow?username=Anuj Jain&persona=Piyush Garg"}
          >
            Start Chatting →
          </button>
        </div>

        {/* Hitesh Choudhary Card */}
        <div style={{
          width: "800px",
          height: "1000px",
          border: "2px solid #99d6ff",
          borderRadius: "12px",
          padding: "20px",
          backgroundColor: "#cceeff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div>
          <img src="/images/Hitesh.png" alt="Hitesh Choudhary" style={{ width: "100%", borderRadius: "10px" }} />
            <h3 style={{ marginTop: "15px" }}>Hitesh Choudhary</h3>
            <p>Coding Mentor & Tech Educator — known for Chai aur Code channel.</p>
            <div style={{ marginTop: "10px" }}>
              <span style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                backgroundColor: "#4caf50",
                borderRadius: "50%",
                marginRight: "5px"
              }}></span>
              Online
            </div>
          </div>
          <button
            style={{
              padding: "12px 20px",
              borderRadius: "6px",
              backgroundColor: "#0070f3",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              marginTop: "auto"
            }}
            onClick={() => window.location.href = "/frontend_flow?username=Anuj Jain&persona=Hitesh Choudhary"}
          >
            Start Chatting →
          </button>
        </div>
      </div>
    </div>
  );
}
