import React from "react";
import "./styles.css";
interface Props {}
const PageHeader: React.FC<Props> = (props: Props) => {
  return (
    <div className="pageHeader">
      <div className="headingStyle">Word Search Game</div>
    </div>
  );
};

export default PageHeader;
