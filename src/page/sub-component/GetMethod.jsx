import axios from "axios";

const GetMethod = async (url) => {
  console.log(url);
  let mainurl = "http://localhost:3000/api/v1/" + url ;
//   const config = {
//     url: mainurl,
//     method: "GET",
//   };
  console.log(mainurl);
  try {
    const response = await axios.get(mainurl);
    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error during GET request:", error);
    return {
      status: false,
      data: [],
    };
  }
};

export default GetMethod;



