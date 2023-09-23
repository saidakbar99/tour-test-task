import {
  List,
  ColumnType,
  ActionType,
  IColumn,
  IListAction,
  useArrayPaginator,
  SelectionMode,
} from "react-declarative";

import Delete from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";

import useLoader from "../../hooks/useLoader";

const columns: IColumn[] = [
  {
    type: ColumnType.Text,
    headerName: "Имя",
    primary: true,
    field: "firstName",
    width: "100",
  },
  {
    type: ColumnType.Text,
    headerName: "Фамилия",
    primary: true,
    field: "lastName",
    width: "100",
  },
  {
    type: ColumnType.Text,
    headerName: "Возраст",
    primary: true,
    field: "age",
    width: "100",
  },
  {
    type: ColumnType.Text,
    headerName: "Фамилия",
    primary: true,
    field: "lastName",
    width: "100",
  },
  {
    type: ColumnType.Text,
    headerName: "Должность",
    primary: true,
    field: "jobTitle",
    width: "100",
  },
  {
    type: ColumnType.Text,
    headerName: "Место работы",
    primary: true,
    field: "jobArea",
    width: "100",
  },
  {
    type: ColumnType.Text,
    headerName: "Страна",
    primary: true,
    field: "country",
    width: "100",
  },
  {
    type: ColumnType.Action,
    headerName: "Actions",
    sortable: false,
    width: () => 100,
  },
];

const actions: IListAction[] = [
  {
    type: ActionType.Add,
  },
  {
    type: ActionType.Menu,
    options: [
      {
        action: "add-action",
        label: "Create new row",
        icon: Add,
      },
      {
        action: "update-now",
      },
      {
        action: "resort-action",
      },
    ],
  },
];

const rowActions = [
  {
    label: "Remove action",
    action: "remove-action",
    icon: Delete,
  },
];

const heightRequest = () => window.innerHeight - 75;

export const UsersListPage = () => {
  const { setLoader } = useLoader();

  const handler = useArrayPaginator(
    async () => await fetchApi("/users"),
    {
      onLoadStart: () => setLoader(true),
      onLoadEnd: () => setLoader(false),
    }
  );

  const handleRowActionsClick = (action: string, row: any) => {
    fetchApi(`/users/${row?.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  };

  const handleAction = (action: string) => {
    if (action === 'add-action') {
      fetchApi(`/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => history.push(`/users/${res?.id}`))
    }
  };

  const handleClick = (row: any) => {
    history.push(`/users/${row.id}`);
  };

  return (
    <List
      title="Список профилей"
      filterLabel="Filters"
      heightRequest={heightRequest}
      rowActions={rowActions}
      actions={actions}
      columns={columns}
      handler={handler}
      onRowAction={handleRowActionsClick}
      onRowClick={handleClick}
      onAction={handleAction}
      selectionMode={SelectionMode.Multiple}
    />
  );
};

export default UsersListPage;
