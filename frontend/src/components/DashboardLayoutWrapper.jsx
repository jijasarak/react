import { createTheme } from "@mui/material/styles";
import CodeIcon from "@mui/icons-material/Code";
import LanguageIcon from "@mui/icons-material/Language";
import HtmlIcon from "@mui/icons-material/Html"; // Better fit than LanguageIcon
import CssIcon from "@mui/icons-material/Style";
import ReactIcon from "@mui/icons-material/DeveloperMode";
import NodeIcon from "@mui/icons-material/Memory";

import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { useRoutes } from "react-router-dom";

import JavaScript from "./JavaScript.jsx";
import HTML from "./HTML.jsx";
import CSS from "./CSS.jsx";
import ReactPage from "./React.jsx";
import English from "./English.jsx";
import NodeJS from "./NodeJS.jsx";
import LoginPage from "./LoginPage.jsx";
import { useAuth } from "./useAuth.js";

import "./DashboardLayoutWrapper.css";

const NAVIGATION = [
  { segment: "javascript", title: "JavaScript", icon: <CodeIcon /> },
  { segment: "html", title: "HTML", icon: <HtmlIcon /> },
  { segment: "css", title: "CSS", icon: <CssIcon /> },
  { segment: "react", title: "React", icon: <ReactIcon /> },
  { segment: "english", title: "English", icon: <LanguageIcon /> },
  { segment: "nodejs", title: "NodeJS", icon: <NodeIcon /> },
];

const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: "data-toolpad-color-scheme" },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

function DashboardLayoutWrapper() {
  const { session, authentication } = useAuth();
  const router = useDemoRouter("/javascript");

  const routes = useRoutes([
    { path: "/javascript", element: <JavaScript user={session.user} /> },
    { path: "/html", element: <HTML user={session.user} /> },
    { path: "/css", element: <CSS user={session.user} /> },
    { path: "/react", element: <ReactPage user={session.user} /> },
    { path: "/english", element: <English user={session.user} /> },
    { path: "/nodejs", element: <NodeJS user={session.user} /> },
  ]);

  if (!session.user) {
    return <LoginPage onSignIn={authentication.signIn} />;
  }

  return (
    <AppProvider
      branding={{ title: "" }}
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>{routes}</DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutWrapper;
