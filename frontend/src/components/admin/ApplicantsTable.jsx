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
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useState } from "react";

const shortlistingStatus = ["Accepted", "Rejected"];

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

  return (
    <div className="w-full overflow-x-auto px-2 md:px-6">
      <Table className="min-w-[700px] text-sm md:text-base">
        <TableCaption className="text-xs md:text-sm">
          A list of applied users.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Full Name</TableHead>
            <TableHead className="whitespace-nowrap">Email</TableHead>
            <TableHead className="whitespace-nowrap">Contact</TableHead>
            <TableHead className="whitespace-nowrap">Resume</TableHead>
            <TableHead className="whitespace-nowrap">Date</TableHead>
            <TableHead className="text-right whitespace-nowrap">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <TableRow key={item._id} className="hover:bg-muted/50 transition">
              <TableCell className="whitespace-nowrap">
                {item?.applicant?.fullname}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {item?.applicant?.email}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {item?.applicant?.phoneNumber}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {item.applicant?.profile?.resume ? (
                  <a
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span>NA</span>
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {item?.applicant.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="text-right align-middle">
                <div className="flex justify-end">
                  {item.status === "pending" && !updatedStatusMap[item._id] ? (
                    <Popover>
                      <PopoverTrigger className="p-2 rounded hover:bg-muted/50 transition">
                        <MoreHorizontal className="w-6 h-6 text-gray-600 hover:text-primary cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {shortlistingStatus.map((status, index) => (
                          <div
                            key={index}
                            onClick={() => statusHandler(status, item._id)}
                            className="my-1 px-2 py-1 rounded hover:bg-muted cursor-pointer"
                          >
                            {status}
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <MoreHorizontal className="w-6 h-6 text-gray-400 cursor-not-allowed opacity-40" />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
