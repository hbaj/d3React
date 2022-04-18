//use rafc for snippet shorcut
import React, { useState, useEffect, useMemo } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";



function Table() {
  //   console.log(datos);

  const data = useMemo(
    () => [
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        age: 9,
        gender: 'F',
        grade: 4,
      },
      {
        firstName: 'Mike',
        lastName: 'Ford',
        age: 5,
        gender: 'M',
        grade: 1,
      },
      {
        firstName: 'John',
        lastName: 'Smith',
        age: 8,
        gender: 'M',
        grade: 4,
      },
      {
        firstName: 'Joe',
        lastName: 'Johnson',
        age: 11,
        gender: 'M',
        grade: 6,
      },
      {
        firstName: 'Linda',
        lastName: 'Ford',
        age: 8,
        gender: 'F',
        grade: 5,
      },
      {
        firstName: 'Noah',
        lastName: 'Wilson',
        age: 9,
        gender: 'M',
        grade: 3,
      },
      {
        firstName: 'Emma',
        lastName: 'Lee',
        age: 7,
        gender: 'F',
        grade: 3,
      },
      {
        firstName: 'James',
        lastName: 'Jones',
        age: 10,
        gender: 'M',
        grade: 5,
      },
      {
        firstName: 'Mia',
        lastName: 'Brown',
        age: 8,
        gender: 'F',
        grade: 5,
      },
      {
        firstName: 'William',
        lastName: 'Davis',
        age: 11,
        gender: 'M',
        grade: 6,
      },
    ],
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'Grade',
        accessor: 'grade',
      },
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
       <h2>  table example</h2>
    
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

