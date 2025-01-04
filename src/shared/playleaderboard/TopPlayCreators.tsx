import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './leaderBoard.css';
import Image from 'next/image';
import { BadgeUserProfile } from '@/shared/badges-dashboard/types';

type Props = {
  topPlayCreators: BadgeUserProfile[];
};

const TopPlayCreators = ({ topPlayCreators }: Props) => (
  <TableContainer className="leaderboard-container">
    <Table aria-label="leader board">
      <TableHead>
        <TableRow>
          <TableCell align="left" className="leaderboard-table-header">
            Name
          </TableCell>
          <TableCell align="center" className="leaderboard-table-header">
            Number of plays
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {topPlayCreators.map((creator) => (
          <TableRow
            key={creator.displayName}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="left" className="leaderboard-table-cell" component="th" scope="row">
              <div className="flex flex-row items-center gap-4">
                <Image
                  alt={creator.displayName}
                  className="rounded-full border-solid h-8 w-8"
                  height={32}
                  src={creator.avatarUrl}
                  title={creator.displayName}
                  width={32}
                />
                <div className="leaderboard-table-cell">{creator.displayName}</div>
              </div>
            </TableCell>
            <TableCell align="center" className="leaderboard-table-cell">
              {creator.count}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TopPlayCreators;
