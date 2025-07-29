import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import PageLayout from "app/components/PageLayout";

export default function ErrorPage() {
  return (
    <PageLayout>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        <div>
          <p>Sorry, an unexpected error has occurred.</p>
        </div>
      </Alert>
    </PageLayout>
  );
}
