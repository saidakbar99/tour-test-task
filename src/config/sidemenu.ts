import { IScaffold2Group } from "react-declarative";

import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import PublicIcon from "@mui/icons-material/Public";

export const sidemenu: IScaffold2Group[] = [
  {
    id: "example_pages",
    label: "Example Pages",
    icon: PublicIcon,
    children: [
      {
        label: "List of users",
        id: "users",
        icon: PlaylistAddCheckIcon,
      }
    ],
  },
];

export default sidemenu;
