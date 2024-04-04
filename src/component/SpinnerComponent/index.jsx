const SpinnerComponent = () => {
  return (
    <div
      className="spinner-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
        zIndex: 9999, // Ensure the spinner is on top
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none", // Prevent interaction with underlying elements
      }}
    >
      <div className="spinner-border text-primary" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </div>
      <div className="spinner-border text-secondary" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </div>
      <div className="spinner-border text-success" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </div>
      <div className="spinner-border text-danger" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </div>
      <div className="spinner-border text-warning" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </div>
      <div className="spinner-border text-info" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </div>
      <div className="spinner-border text-light" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </div>
      <div className="spinner-border text-dark" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </div>
    </div>
  );
};

export default SpinnerComponent;
