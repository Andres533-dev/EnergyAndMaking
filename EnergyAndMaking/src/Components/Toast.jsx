import { useEffect } from "react";

function Toast({ msg, type = "default", onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, []);
  return <div className={`toast ${type}`}>{msg}</div>;
}

export default Toast;
