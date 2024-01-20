const MetaDataComponent = () => {
  // Sample metadata
  const metaData = [
    { title: "Meta 1", value: 20 },
    { title: "Meta 2", value: 20 },
    { title: "Meta 3", value: 20 },
    { title: "Meta 4", value: 20 },
  ];

  return (
    <div className="container white-box rounded-2">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <h3 className="text-center">Meta Data</h3>
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="row mt-3">
        {metaData.map((meta, index) => (
          <div key={index} className="col-md-6 col-lg-3 mb-4 pt-2">
            <div className="box rounded-2 p-2">
              <div className="card-body  p-2">
                <p className="card-text text-center">{meta.value}</p>
                <h6 className="card-title text-center">{meta.title}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetaDataComponent;
