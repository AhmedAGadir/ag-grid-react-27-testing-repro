import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.css';
import { GridApi, GridReadyEvent } from 'ag-grid-community';

const App = () => {
  const [api, setApi] = useState<GridApi>();

   const [rowData] = useState([
       {make: "Toyota", model: "Celica", price: 35000},
       {make: "Ford", model: "Mondeo", price: 32000},
       {make: "Porsche", model: "Boxter", price: 72000}
   ]);
   
   const [columnDefs] = useState([
       { field: 'make' },
       { field: 'model' },
       { field: 'price' }
   ])

   const onGridReady = (params: GridReadyEvent) => {
     setApi(params.api);
   }

   const handleSelectAll = () => {
    api?.selectAll()
  };

  const handleDeselectAll = () => {
    api?.deselectAll()
  };

   return (
     <>
      <p data-testid="api">{api ? 'the grid API has been loaded' : null}</p>
      <button data-testid="selectAll" onClick={handleSelectAll}>Select All Rows</button>
      <button data-testid="deselectAll" onClick={handleDeselectAll}>Deselect All Rows</button>
      <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
           <AgGridReact
               rowData={rowData}
               columnDefs={columnDefs}
               onGridReady={onGridReady}
               rowSelection='multiple'
               >
           </AgGridReact>
       </div>
       </>
   );
};

export default App;