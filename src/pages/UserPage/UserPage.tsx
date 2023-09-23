import {
  FetchView,
  Breadcrumbs,
  One,
  FieldType,
  TypedField,
  usePreventLeave,
} from "react-declarative";

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";

import Avatar from "../../components/common/Avatar"

interface ITodoOnePageProps {
  id: string;
}

const fields: TypedField[] = [
  {
    type: FieldType.Div,
    style: {
      display: "flex",
      justifyContent: "center"
    },
    fields: [
      {
        type: FieldType.Group,
        desktopColumns: '2',
        style: {
          marginInlineEnd: 50
        },
        fields: [
          {
            type: FieldType.Component,
            element: () => (
              <Avatar />
            )
          },
          {
            type: FieldType.Rating,
          },
        ]
      },
      {
        type: FieldType.Group,
        desktopColumns: '10',
        fields: [
          {
            type: FieldType.Line,
            title: "Профиль",
          },
          {
            type: FieldType.Combo,
            itemList: ["Mr.", "Mrs."],
            name: "prefix",
            title: "Пол",
          },
          {
            type: FieldType.Combo,
            title: "Списки",
          },
          {
            type: FieldType.Div,
            style: {
              display: "grid",
              gridTemplateColumns: "1fr auto",
            },
            fields: [
              {
                type: FieldType.Text,
                name: "keyword",
                title: "Кодовая фраза",
                outlined: false,
                disabled: true,
              },
              {
                type: FieldType.Checkbox,
                title: "Кодовая фраза",
                disabled: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: FieldType.Line,
    title: "Общая информация",
  },
  {
    type: FieldType.Text,
    name: "firstName",
    title: "Имя",
  },
  {
    type: FieldType.Text,
    name: "lastName",
    title: "Фамилия",
  },
  {
    type: FieldType.Text,
    name: "age",
    title: "Возраст",
  },
  {
    type: FieldType.Expansion,
    title: "Подписка",
    description: "Подписка на уведомления",
    fields: [
      {
        type: FieldType.Switch,
        name: "subscribed",
        title: "Подписан?",
      },
    ],
  },
  {
    type: FieldType.Group,
    desktopColumns: '6',
    fields: [
      {
        type: FieldType.Line,
        title: "Работа",
      },
      {
          type: FieldType.Text,
          title: 'Должность',
          name: 'jobTitle',
      },
      {
          type: FieldType.Text,
          title: 'Место работы',
          name: 'jobArea',
      },
    ],
  },
  {
    type: FieldType.Group,
    desktopColumns: '6',
    fields: [
      {
        type: FieldType.Line,
        title: "Домашний адрес",
      },
      {
        type: FieldType.Text,
        title: 'Страна',
        name: 'country',
      },
      {
        type: FieldType.Text,
        title: 'Город',
        name: 'city',
      },
      {
      type: FieldType.Text,
      title: 'Область',
      name: 'state',
    },
    {
      type: FieldType.Text,
      title: 'Адрес',
      name: 'address',
    },
    ],
  },
];

export const UserPage = ({ id }: ITodoOnePageProps) => {
  const fetchState = () => [
    fetchApi(`/users/${id}`)
  ] as const;

  const Content = (props: any) => {
    const { data, oneProps, beginSave } = usePreventLeave({
      history,
      onSave: () => {
        fetchApi(`/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        return true;
      },
    });

    return (
      <div
        // использовать style плохо
        style={{
          paddingInline: 150
        }}
      >
        <Breadcrumbs
          withSave
          title="Список профилей"
          subtitle={`Профиль ${props.user.id}`}
          onSave={beginSave}
          onBack={() => history.push("/users")}
          saveDisabled={!data}
        />
        <One
          handler={() => props.user}
          fields={fields}
          {...oneProps}
        />
      </div>
    );
  };

  return (
    <FetchView state={fetchState}>
      {(user) => <Content user={user} />}
    </FetchView>
  );
};

export default UserPage;
