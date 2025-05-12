import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="w-full overflow-x-auto px-2 md:px-6">
      <Table className="min-w-[600px] text-sm md:text-base">
        <TableCaption className="text-xs md:text-sm">A list of your registered companies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Logo</TableHead>
            <TableHead className="whitespace-nowrap">Name</TableHead>
            <TableHead className="whitespace-nowrap">Date</TableHead>
            <TableHead className="text-right whitespace-nowrap">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow key={company._id} className="hover:bg-muted/50 transition">
              <TableCell>
                <Avatar className="h-8 w-8 md:h-10 md:w-10">
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell className="whitespace-nowrap">{company.name}</TableCell>
              <TableCell className="whitespace-nowrap">{company.createdAt.split('T')[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="p-2 hover:bg-accent rounded">
                    <MoreHorizontal className="w-5 h-5" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer hover:text-primary"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}; 

export default CompaniesTable;
