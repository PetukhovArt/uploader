import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";

import s from "./file-list.module.scss";
import { FileType } from "@/components/ui/file-input";

type FileListPropsType = {
  files: FileType[];
};
export const FileList = ({ files }: FileListPropsType) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} size="small">
        <TableHead className={s.head}>
          <TableRow>
            <TableCell className={s.cellName}>Name</TableCell>
            <TableCell className={s.cellProgress}></TableCell>
            <TableCell align="right" className={s.cellStatus}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file) => (
            <TableRow
              key={file.file.name}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
              className={file.isUploading ? s.uploadingRow : s.defaultRow}
            >
              <TableCell component="th" scope="row">
                {file.file.name}
              </TableCell>
              <TableCell align="right">
                {file.isUploading && <LinearProgress />}
              </TableCell>
              <TableCell align="right">{file.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
