import React from "react";

import PivotGrid, { FieldChooser } from "devextreme-react/pivot-grid";
import PivotGridDataSource from "devextreme/ui/pivot_grid/data_source";

import { sales } from "./data.js";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="long-title">
          <h3>Sales Amount by Region</h3>
        </div>
        <PivotGrid
          id="sales"
          dataSource={dataSource}
          allowSortingBySummary={true}
          allowSorting={true}
          allowFiltering={true}
          allowExpandAll={false}
          height={440}
          showBorders={true}
          onCellClick={function (e) {
            //console.log(e);
            if (e.cell.text == "Africa") e.cancel = true;
          }}
          onCellPrepared={(e) => {
            if (e.cell.text == "Africa") {
              console.log(e);
              e.cellElement.innerHTML = e.cell.text;
            }
          }}
        >
          <FieldChooser enabled={false} />
        </PivotGrid>
      </React.Fragment>
    );
  }
}

const dataSource = new PivotGridDataSource({
  fields: [
    {
      caption: "Region",
      width: 120,
      dataField: "region",
      area: "row",
      allowExpand: false
    },
    {
      caption: "City",
      dataField: "city",
      width: 150,
      area: "row",
      selector: function (data) {
        return `${data.city} (${data.country})`;
      }
    },
    {
      dataField: "date",
      dataType: "date",
      area: "column"
    },
    {
      caption: "Sales",
      dataField: "amount",
      dataType: "number",
      summaryType: "sum",
      format: "currency",
      area: "data"
    }
  ],
  store: sales
});

export default App;
