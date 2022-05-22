import type { NextPage } from "next";
import * as Sentry from "@sentry/react";

const CreateError: NextPage = () => {
  return (
    <>
      <p>Create Error</p>
      <button
        onClick={() => {
          throw new Error("Error is created");
        }}
      >
        Create Error
      </button>
      <button
        onClick={() => {
          try {
            throw new Error("Error is created");
          } catch (_) {
            Sentry.captureMessage("info", Sentry.Severity.Info);
            Sentry.captureMessage("warning", Sentry.Severity.Warning);
            Sentry.captureMessage("error", Sentry.Severity.Error);
            Sentry.captureMessage("fatal", Sentry.Severity.Fatal);

            // error levelは `error`
            // Sentry.captureException("Something went wrong");
          }
        }}
      >
        Create Error
      </button>
    </>
  );
};

export default CreateError;
