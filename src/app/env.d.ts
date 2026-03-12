declare namespace NodeJS {
  interface ProcessEnv {
    RESEND_API_KEY: string;
    FORM_EMAIL_FROM: string;
    FORM_EMIAL_TO: string;
    RESEND_SEGMENT_ID: string;
  }
}