import React from "react";

const MetaDataComponent = () => {
  // Sample metadata
  const metaData = [
    { title: "Meta 1", value: 20 },
    { title: "Meta 2", value: 20 },
    { title: "Meta 3", value: 20 },
    { title: "Meta 4", value: 20 },
  ];

  return (
    <div className="container ash-box">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <h2 className="text-center">Meta Data</h2>
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="row mt-3">
        {metaData.map((meta, index) => (
          <div key={index} className="col-md-6 col-lg-3 mb-4">
            <div className="card">
              <div className="card-body">
                <p className="card-text text-center">{meta.value}</p>
                <h5 className="card-title text-center">{meta.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetaDataComponent;
