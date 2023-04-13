import React from "react";
import "./styles.scss";

const style1 = {
  backgroundColor: "#A5753D",
  color: "#FFFFFF",
  width: "300",
  borderRadius: "40",
};
class RecoverAccount extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div id="popup">
        <h2 className="spacer">Add Password</h2>
        <div className="mb-3">
          <div className="col text-center spacer">
            <button className="btn" style={style1} type="button">
              Save Password
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RecoverAccount;
