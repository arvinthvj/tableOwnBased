import React, { useEffect, useState } from "react";
import oscarData from "../Dataset/oscars";

export default function CustomTable() {
  const [originalData, setOriginalData] = useState(oscarData);
  const [processedTotalData, setProcessedTotalData] = useState({});
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(7);
  
  useEffect(() => {
    prepareData();
  }, []);



  const handlePaginationClick=(pageNumber)=>{
    setCurrentPageNumber(pageNumber);
  }

  const RenderCustomPagination = ({currentdata}) => {
    return Object.keys(currentdata)
            .map((e, i) => {
                return <button onClick={()=>{handlePaginationClick(i + 1)}}> {i + 1} </button>;
            });
  };

  const prepareData = () => {
    
    let data = Array(Math.round(originalData.length / limitPerPage))
      .fill("")
      .reduce((acc, curr, index) => {
        let currentPageNumber = index +1;
        acc[currentPageNumber] =
          index == 0
            ? oscarData.slice(index, limitPerPage)
            : oscarData.slice(
                currentPageNumber * limitPerPage,
                currentPageNumber * limitPerPage + limitPerPage
              );
        return acc;
      }, {});
      
    setProcessedTotalData(data);
  };

  const RenderTable = ({currentdata}) => {
      
    return (
      <table>
        <tr>
          {
            currentdata.length && Object.keys(currentdata[0]).map((e) => {
              return <th>{e}</th>;
            })}
        </tr>
        {
        currentdata.map((e) => {
          return (
            <tr>
              {Object.keys(e).map(a=>{
                  return (
                      <td>{e[a]}</td>
                  )
              })}
            </tr>
          );
        })}
      </table>
    );
  };

  return (
    <div>
      {<RenderTable currentdata = {Object.keys(processedTotalData).length ? processedTotalData[currentPageNumber] : []}/>}
      {<RenderCustomPagination currentdata = { processedTotalData }/>}
    </div>
  );
}
