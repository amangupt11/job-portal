import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
  } from './ui/table';
  import { Badge } from './ui/badge';
  import { useSelector } from 'react-redux';

  const statusVariant = {
    rejected: 'destructive',
    pending: 'warning',
    accepted: 'success',
  };

  const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store) => store.job);

    return (
      <div className="w-full overflow-x-auto rounded-lg border border-border">
        <Table className="min-w-[600px]">
          <TableCaption className="pb-4">A list of your applied jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs.length <= 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                  You haven&apos;t applied to any job yet.
                </TableCell>
              </TableRow>
            ) : (
              allAppliedJobs.map((appliedJob) => (
                <TableRow key={appliedJob._id}>
                  <TableCell className="text-muted-foreground">{appliedJob?.createdAt?.split('T')[0]}</TableCell>
                  <TableCell className="font-medium">{appliedJob.job?.title}</TableCell>
                  <TableCell>{appliedJob.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusVariant[appliedJob?.status] || 'secondary'}>
                      {appliedJob.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  };

  export default AppliedJobTable;
