import React, { useEffect, useState } from "react";

const Save = (props) => {
  const [save, setSave] = useState(false);

  useEffect(() => {
    const checkSave = async () => {
      const respo = await fetch(
        `https://mediasy-backend.onrender.com/api/checkSave/${props.postId}`,
        {
          method: "GET",
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const json = await respo.json();
      return json;
    };
    checkSave().then((json) => setSave(json.message == "saved" ? true : false));
  }, [save]);

  const onSave = async () => {
    const response = await fetch(
      `https://mediasy-backend.onrender.com/api/save/${props.postId}`,
      {
        method: "PUT",
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    const data = await response.json();
    setSave(data.message == "saved" ? true : false);
  };

  return (
    <div className="button-action">
      <i
        className={save == false ? "bx bx-bookmark" : "bx bxs-bookmark"}
        onClick={onSave}
      ></i>
      <p>save</p>
    </div>
  );
};

export default Save;
