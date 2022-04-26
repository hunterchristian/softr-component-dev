import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

interface OwnProps {
  env: string;
}

const RENDER_DELAY_MILLIS = 1000;

const styles = (
  // @ts-ignore
  <style jsx>{`
    .dev-panel-container {
      position: relative;
      z-index: 99999;
    }
    .dismiss {
      position: absolute;
      padding: 2px 5px;
      top: 0;
      right: 0;
      transition: background-color 0.2s ease-out;
    }
    .dismiss:hover {
      background-color: rgba(186, 11, 11, 0.75);
    }
    .toggle-panel {
      padding: 20px;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      right: 0;
      top: 60px;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease-out;
      color: white;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px,
        inset rgba(0, 0, 0, 0.2) 0px -5px 20px;
    }
    .toggle-panel:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
    .dev-panel {
      position: fixed;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      top: 0;
      left: -491px;
      bottom: 0;
      background: rgba(51, 51, 51, 0.75);
      z-index: 9999;
      transition: left 0.2s ease-out;
      color: white;
    }
    .dev-panel.isRendered {
      left: -399px;
    }
    .dev-panel.isOpen {
      left: 0;
    }
    .dev-panel-body {
      display: flex;
      flex-direction: column;
      width: 430px;
      padding-right: 40px;
    }
  `}</style>
);

// tslint:disable-next-line: cyclomatic-complexity
const DevPanel = () => {
  const [isRendered, setIsRendered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => setIsRendered(true), RENDER_DELAY_MILLIS);
    const intervalID = setInterval(() => {
      if (
        (window as any).records &&
        (window as any).records[
          window.location.search.substring(
            window.location.search.indexOf("=") + 1
          )
        ].record
      ) {
        setData(
          (window as any).records[
            window.location.search.substring(
              window.location.search.indexOf("=") + 1
            )
          ].record
        );
        clearInterval(intervalID);
      }
    }, 500);
  }, []);

  return (
    <>
      {!isDismissed ? (
        <div
          className={`dev-panel${isOpen ? " isOpen" : ""}${
            isRendered ? " isRendered" : ""
          }`}
        >
          <div className="dev-panel-body">
            <Typography variant="h6">
              {data ? (data as any).fields["Name"] : null}
            </Typography>
            <Typography variant="body1">
              {data ? (data as any).fields["Description"] : null}
            </Typography>
            {/* {data ? <div dangerouslySetInnerHTML={(data as any).fields["Figma Embed"]}/> : null} */}
          </div>
          <div className="toggle-panel" onClick={() => setIsOpen(!isOpen)}>
            <div>{isOpen ? "<" : ">"}</div>
            <div>{isOpen ? "<" : ">"}</div>
            <div>{isOpen ? "<" : ">"}</div>
          </div>
          {styles}
        </div>
      ) : null}
    </>
  );
};

export default DevPanel;
