export type GetUploadUrlRes = {
  operation_id: string;
  method: string;
  href: string;
  templated: boolean;
};

export type GetUploadUrlArgs = {
  token: string | null;
  path: string;
};

export type UploadArgsType = {
  method: string;
  url: string;
  data: File;
};
