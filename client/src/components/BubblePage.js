import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../Axios/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = props => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth()
    .get(`/colors`, colorList)
    .then(res => {
      console.log('res', res)
      setColorList(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <>
      <ColorList props={props} colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
