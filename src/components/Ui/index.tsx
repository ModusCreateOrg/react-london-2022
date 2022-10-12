import { useContext, FC } from "react";
import { GlobalContext } from "../../contexts";
import PlayerHealth from "../PlayerHealth";
import "./style.css";

const Ui: FC = () => {
  const { score } = useContext(GlobalContext);
  return (
    <div className="ui">
      <PlayerHealth />
      <div className="score">SCORE: {score}</div>
    </div>
  );
};

export default Ui;
