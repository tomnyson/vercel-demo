import React, { useState } from "react";
import styled from "styled-components";
const { create, urlSource } = require("ipfs-http-client");
// khởi tạo connection
const client = create("/ip4/127.0.0.1/tcp/5001");
// sử dụng pinata gateway để truy xuất tài nguyên 
const getwayIPFS = "https://gateway.pinata.cloud/ipfs";

// UploadIPFS đây là một hàm onchange để upload file và tạo một preview image
const UploadIPFS = () => {
  // hàm setSate cho react 
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  const onFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      // create image url kiểu base64
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  // thự hiện upload lên mạng network
  const onUploadFile = async () => {
    // ham upload source lên ipfs network
    const content = await client.add(urlSource(image), { pin: true });
    // thực hiện get content hash CID duy nhất trả về từ network
    const cid = content.cid.toString();
    setUrl(`${getwayIPFS}/${cid}`);
  };
  console.log("url", url);
  return (
    <WrapperFormStyled>
      <h1>Upload Image to IPFS</h1>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        onChange={onFileChange}
      />
      <PreViewStyled>
        {image && <img src={image} alt="#" id="target" />}
      </PreViewStyled>
      <ButtonBuyStyled onClick={onUploadFile}>Upload IFS</ButtonBuyStyled>
      {url && <img alt="" src={url} />}
    </WrapperFormStyled>
  );
};
// sử dụng styled-component để styled css cho site
const WrapperFormStyled = styled.div`
  width: 400px;
  margin: 0 auto;
  height: 300px;
`;
const PreViewStyled = styled.div`
  margin-top: 30px;
  width: 300px;
  height: auto;
  img {
    width: 100%;
  }
`;
const ButtonBuyStyled = styled.button`
  width: 200px;
  height: 50px;
  background: green;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  :hover {
    background: #333;
  }
`;
export default UploadIPFS;
