import * as axios from "axios";

const BASE_URL = "https://archive.icjia.cloud";

function upload(formData) {
  const url = `${BASE_URL}/uploadFiles`;
  return (
    axios
      .post(url, formData)
      // get data
      .then((x) => {
        return x.data;
      })
  );
}

export { upload };
