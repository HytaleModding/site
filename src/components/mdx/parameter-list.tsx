import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ParameterListProps {
  name: string;
  description: string;
}

export function ParameterList({
  parameters,
}: {
  parameters: ParameterListProps[];
}) {
  return (
    <Table className="w-full table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-48">Name</TableHead>

          <TableHead className="grow">Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parameters.map((parameter) => (
          <TableRow key={parameter.name}>
            <TableCell className="font-medium">{parameter.name}</TableCell>
            <TableCell className="whitespace-normal!">
              {parameter.description}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
