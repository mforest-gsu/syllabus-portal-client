import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Link from "@mui/material/Link";
import PageLayout from "app/components/PageLayout";

const loginUrl = `${import.meta.env.VITE_API_URL}/auth/login`;

export default function LoginPage() {
  return (
    <PageLayout>
      <Alert severity="info">
        <AlertTitle>Not Authenticated</AlertTitle>
        <div>
          <p>
            You are not logged in. Please <Link href={loginUrl}>login</Link> to access this site.
          </p>
          <p>
            If you are seeing this page by mistake,&nbsp;
            <Link
              href="mailto:help@gsu.edu"
              target="_blank"
              rel="noreferrer"
              aria-label="Opens email to help desk in new tab"
            >
              contact the GSU Help Desk
            </Link>
            , and we&apos;ll try to help you out!
          </p>
        </div>
      </Alert>
    </PageLayout>
  );
}
