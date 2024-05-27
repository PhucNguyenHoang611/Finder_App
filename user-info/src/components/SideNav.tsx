import { useNavigate, useLocation, Link } from "react-router-dom";

// shadcn/ui
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

// Material UI
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAtomValue } from "jotai";
import { signedInUserAtomWithPersistence } from "@/store";

const menuItems: MenuItemProps[] = [
  {
    title: "Thông tin chung",
    to: "user-info",
    icon: <InfoOutlinedIcon />
  },
  {
    title: "Bài viết của tôi",
    to: "my-posts",
    icon: <NewspaperOutlinedIcon />
  },
  {
    title: "Cập nhật thông tin",
    to: "update-info",
    icon: <FeedOutlinedIcon />
  },
  {
    title: "Đăng ký nhận tin",
    to: "register-newsletter",
    icon: <MailOutlinedIcon />
  },
  {
    title: "Đổi mật khẩu",
    to: "change-password",
    icon: <KeyOutlinedIcon />
  }
];

const MenuItem = (props: MenuItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ListItem
      disablePadding
      sx={{
        backgroundColor:
          location.pathname === props.to ? "#E5E5E5" : "transparent"
      }}
    >
      <ListItemButton onClick={() => navigate(props.to)}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText
          primary={props.title}
          primaryTypographyProps={{ style: { fontFamily: "Montserrat" } }}
        />
      </ListItemButton>
    </ListItem>
  );
};

const SideNav = () => {
  const signedInUser = useAtomValue(signedInUserAtomWithPersistence);

  return (
    <Card className={cn("w-full h-max rounded-xl")}>
      <aside>
        <Link to={"/"}>
          <button className="p-2 m-1 flex justify-start items-center hover:bg-slate-200 hover:border-0 rounded-xl gap-2">
            <ArrowBackIcon />
            <span className="font-medium">Trở về trang chủ</span>
          </button>
        </Link>
      </aside>
      {/* Card Header */}
      <CardHeader
        className={cn("flex flex-col justify-center items-center gap-4")}
      >
        {/* User Avatar */}
        <Avatar className={cn("w-40 h-40")}>
          <AvatarImage src={signedInUser.avatar} />
          <AvatarFallback>FD</AvatarFallback>
        </Avatar>

        {/* User Basic Information */}
        <CardTitle>{signedInUser.displayName}</CardTitle>
        <CardDescription>{signedInUser.email}</CardDescription>
      </CardHeader>

      <div className="w-full flex justify-center items-center">
        <Separator className={cn("w-[90%] mb-4 bg-slate-200")} />
      </div>

      {/* Card Content */}
      <CardContent className={cn("flex flex-col justify-center items-center")}>
        <List sx={{ width: "100%" }}>
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default SideNav;
