"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface filterProps {
  filters: {
    name: string;
    value: string;
  }[];
  additionalClasses: string;
  containerClasses: string;
}

const Filter = ({
  filters,
  additionalClasses,
  containerClasses,
}: filterProps) => {
  return (
    <div className={`relative ${containerClasses}`}>
      <Select>
        <SelectTrigger
          className={`body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5 ${additionalClasses}`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Selecter a filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
