//use rafc for snippet shorcut
import React, { useState, useEffect, useRef,useMemo } from "react";
import { useGlobalFilter, useSortBy, useTable, usePagination} from "react-table";
import { GlobalFilter } from "./GlobalFilter";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'


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
        firstName: 'Wmmmmmmmmmmmmmmmmmm',
        lastName: 'Davis',
        age: 11,
        gender: 'M',
        grade: 6,
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


 
  // start table formation
  const tableInstance = useTable({ columns, data },useGlobalFilter,useSortBy,usePagination);

  
  //   console.log(getTableProps, getTableBodyProps, headerGroups, rows, prepareRow );
  const { getTableProps, 
          getTableBodyProps, 
          headerGroups, 
          page,nextPage, 
          previousPage,
          canPreviousPage,
          canNextPage, 
          prepareRow, 
          state, 
          pageOptions,
          setPageSize,          
          setGlobalFilter,
        } =
    tableInstance;
        
    const {globalFilter, pageIndex, pageSize} = state
  // console.log('>>',rows.map((row)=>console.log(row)),'<<' )

  return (
    <>
     <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"/>
                <table id="table-to-xls"></table>  
      
            
    <GlobalFilter filter = {globalFilter} setFilter = {setGlobalFilter}/>
    <table {...getTableProps()} id="test-table-xls-button">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' ⇑' : ' ⇓') : ''}
                </span>
                </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
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
  <div>
    <span>
      <select value ={pageSize} onChange = {e=> setPageSize(Number(e.target.value))}>
        {
          [10,25,100].map((pageSize) => (
            <option key ={pageSize} value ={pageSize}>
                  Show {pageSize}
            </option>
          ))
        }
      </select>
      page{' '}
      <strong>
        {pageIndex +1} of {pageOptions.length}
      </strong>{' '}
    </span>
    <button onClick = {()=>previousPage()} disabled = {!canPreviousPage}>⊴ Previous</button>
    <button onClick = {()=>nextPage() } disabled ={!canNextPage}>Next ⊵</button>
  </div>
    </>
  );
}

export default Table;

