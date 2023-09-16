import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Activity",
    selector: (row) => row.title,
    sortable: true,
  },

];



const ActivityTable = (props) => {
  const { data } = props;
  return <DataTable columns={columns} data={data} />;
};
export default ActivityTable;