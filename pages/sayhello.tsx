import { useState, useEffect } from "react";

const SayHello = () => {
  // 内部で情報を持つためにuseStateを使用
  const [data, setData] = useState({ name: "" });
  // 外部のAPIにリクエストするのは副作用なのでuseEffect内で処理
  useEffect(() => {
    // pages/api/hell.tsの内容にリクエスト
    fetch("api/hello")
      .then((res) => res.json())
      .then((profile) => {
        setData(profile);
      });
  }, []);

  return <div>Hello {data.name}</div>;
};

export default SayHello;
