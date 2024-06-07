import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import NewsList from "@/components/News/NewsList";
import { Link } from "react-router-dom";

const NewsPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Alert
        className={cn("rounded-xl bg-red-400 text-white border mb-[20px]")}
      >
        <WarningAmberOutlinedIcon style={{ color: "white" }} />
        <AlertTitle>Chú ý !</AlertTitle>

        <div className="flex gap-1">
          <AlertDescription>Cảnh báo</AlertDescription>
          <AlertDescription>
            <Link to="/scam-warning" className="underline font-medium">
              lừa đảo
            </Link>
          </AlertDescription>
        </div>
      </Alert>

      <NewsList />
    </div>
  );
};

export default NewsPage;
