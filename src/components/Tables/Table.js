//use rafc for snippet shorcut
import React, { useState, useEffect, useMemo } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";



function Table() {
  //   console.log(datos);
  const data = useMemo(
    () => [
        {
          "color": "purple",
          "type": "minivan",
          "registration": new Date('2017-01-03'),
          "capacity": 7
        },
        {
          "color": "red",
          "type": "station wagon",
          "registration": new Date('2018-03-03'),
          "capacity": 5
        },
    ],
    []
  );
  const columns = useMemo(
    () => [
      { Header: "ID", accesor: "color" },
      { Header: "TITLE_", accesor: "type" },
      { Header: "PRICE", accesor: "registration" },
    ],
    []
  );
  //   console.log("-->",data);
  //   console.log("-->",columns);
  const tableInstance = useTable({ columns, data });

  //   console.log(getTableProps, getTableBodyProps, headerGroups, rows, prepareRow );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  // console.log('>>',rows.map((row)=>console.log(row)),'<<' )
  return (
    <>
       <h2> inside table</h2>
    
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  
    </>
  );
}

export default Table;

