import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { FileText, MoreHorizontal, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useState } from "react";

const shortlistingStatus = ["Accepted", "Rejected"];

const statusVariant = {
  rejected: "destructive",
  pending: "warning",
  accepted: "success",
};

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const [updatedStatusMap, setUpdatedStatusMap] = useState({});

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setUpdatedStatusMap((prev) => ({ ...prev, [id]: status }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[760px]">
        <TableCaption className="pb-4">A list of users who applied for this role.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(!applicants?.applications || applicants.applications.length === 0) ? (
            <TableRow>
              <TableCell colSpan={6} className="py-12 text-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Users className="h-8 w-8 opacity-60" />
                  <span>No applicants yet.</span>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            applicants.applications.map((item) => {
              const effectiveStatus = updatedStatusMap[item._id]?.toLowerCase() || item.status;
              return (
                <TableRow key={item._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={item?.applicant?.profile?.profilePhoto} />
                        <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                          {getInitials(item?.applicant?.fullname) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{item?.applicant?.fullname}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{item?.applicant?.email}</span>
                      <span className="text-xs text-muted-foreground">{item?.applicant?.phoneNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.applicant?.profile?.resume ? (
                      <a
                        href={item?.applicant?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                      >
                        <FileText className="h-4 w-4" />
                        <span className="max-w-[10rem] truncate">{item?.applicant?.profile?.resumeOriginalName}</span>
                      </a>
                    ) : (
                      <span className="text-muted-foreground">NA</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[effectiveStatus] || "secondary"}>
                      {effectiveStatus?.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item?.applicant.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.status === "pending" && !updatedStatusMap[item._id] ? (
                      <Popover>
                        <PopoverTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-accent">
                          <MoreHorizontal className="h-5 w-5" />
                        </PopoverTrigger>
                        <PopoverContent className="w-36 p-1" align="end">
                          {shortlistingStatus.map((status, index) => (
                            <button
                              key={index}
                              onClick={() => statusHandler(status, item._id)}
                              className="flex w-full items-center rounded-md px-2.5 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              {status}
                            </button>
                          ))}
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <MoreHorizontal className="ml-auto h-5 w-5 text-muted-foreground/40" />
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
