import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private reloadPage = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <h3 className="p-4 text-nowrap">
          Lỗi!
          <a
            style={{
              padding: "5px",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline"
            }}
            onClick={this.reloadPage}
          >
            Tải lại trang
          </a>
        </h3>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
