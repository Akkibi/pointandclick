import "./style.css";

const IsLandscape: React.FC = () => {
  return (
    <div className="is-landscape">
      <div className="is-landscape_inner">
        <div className="is-landscape_icon"></div>
        <p className="is-landscape_text">
          Please put your device in landscape mode
        </p>
      </div>
    </div>
  );
};

export default IsLandscape;
