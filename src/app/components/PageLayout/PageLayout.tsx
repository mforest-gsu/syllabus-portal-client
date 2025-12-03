import { type PropsWithChildren, type CSSProperties, Suspense } from "react";
import type { Theme } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack, { type StackProps } from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider, type SxProps } from "@mui/material/styles";
import HelpIcon from "@mui/icons-material/HelpOutlineOutlined";
import IconButton from "@mui/material/IconButton";

import createPageTheme from "app/components/PageLayout/createPageTheme";

import logo from "app/assets/images/logo.jpg";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "app/assets/styles/PageFooter.css";

const appBarProps: SxProps<Theme> = { backgroundColor: "#0033a0" };
const imgProps: CSSProperties = {
  width: "64px",
  height: "64px",
  maxHeight: "64px",
  objectFit: "contain",
};
const titleProps: SxProps<Theme> = {
  flexGrow: 1,
};

const boxSx = {
  flexGrow: 1,
  margin: "16px",
  minHeight: "100%",
} as SxProps<Theme>;

export default function PageLayout(props: PropsWithChildren) {
  return (
    <ThemeProvider theme={createPageTheme()}>
      <CssBaseline />
      <PageHeader />
      <Box component="main" role="main" sx={boxSx}>
        <Toolbar />
        <Suspense>{props.children}</Suspense>
      </Box>
      <PageFooter />
    </ThemeProvider>
  );
}

function PageHeader() {
  return (
    <AppBar role="banner" position="fixed" sx={appBarProps}>
      <Toolbar>
        <PageHeaderLogo />
        <PageHeaderTitle />
        <IconButton
          id="help-button"
          disableRipple={true}
          sx={{ textAlign: "right", textTransform: "none" }}
          href="https://mygsu.sharepoint.com/:b:/t/SyllabiPublicAccessInitiative/IQDjz1UAXML1SYVgb7LOgz0YAYPijaKnLzEqfM1pwL19eKM"
          target="_blank"
          rel="noreferrer"
        >
          <HelpIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

function PageHeaderLogo() {
  return <img src={logo} alt="Georgia State University" width={64} height={64} style={imgProps} />;
}

function PageHeaderTitle() {
  return (
    <Typography component="h1" variant="h6" color="inherit" noWrap sx={titleProps}>
      Course Syllabus Portal
    </Typography>
  );
}

function PageFooter() {
  const divider = <Divider orientation="vertical" flexItem className="divider" />;

  return (
    <Toolbar component="footer" role="contentinfo">
      <Stack className="page-footer" spacing={2}>
        <PageFooterTop divider={divider} />
        <PageFooterCenter divider={divider} />
        <PageFooterBottom divider={divider} />
      </Stack>
    </Toolbar>
  );
}

function PageFooterTop(props: StackProps) {
  return (
    <Stack direction="row" spacing={2} divider={props.divider}>
      <img
        width="74"
        height="77"
        src="https://cetl.gsu.edu/wp-content/themes/gsu-core/img/logo-footer.png"
        alt="Georgia State University"
      ></img>
    </Stack>
  );
}

function PageFooterCenter(props: StackProps) {
  return (
    <Stack direction="row" spacing={2} divider={props.divider}>
      <span>Georgia State University</span>
      <span>
        <a
          href="https://map.concept3d.com/?id=1108#!m/295226?ce/0,22381,27051,27053?s/Sparks%20Hall?ct/0,22383,27114,27113,38302"
          target="_blank"
          rel="noreferrer"
        >
          33 Gilmer Street SE Atlanta, GA
        </a>
      </span>
      <span>
        <a href="tel:+14044132000">404-413-2000</a>
      </span>
    </Stack>
  );
}

function PageFooterBottom(props: StackProps) {
  const year = new Date().getFullYear();
  return (
    <Stack direction="row" spacing={2} divider={props.divider}>
      <a
        href="https://www.gsu.edu/contact-georgia-state/"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#fff", textDecoration: "none" }}
      >
        Contact Georgia State
      </a>
      <a href="https://www.gsu.edu/legal-statement" target="_blank" rel="noreferrer">
        View legal statement
      </a>
      <a href="https://www.gsu.edu/privacy-notices/" target="_blank" rel="noreferrer">
        Privacy Notices
      </a>
      <a href="https://gsu.edu/state-authorization" target="_blank" rel="noreferrer">
        State Authorization
      </a>
      <a href="https://gsu.uservoice.com" target="_blank" rel="noreferrer">
        Website Feedback
      </a>
      <span style={{ color: "#FFF" }}>&copy;{year} Georgia State University</span>
    </Stack>
  );
}
