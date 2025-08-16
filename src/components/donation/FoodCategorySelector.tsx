import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FOOD_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  selectedValue: string | undefined;
  onSelect: (value: 'perishable' | 'non-perishable') => void;
}

export const FoodCategorySelector = ({ selectedValue, onSelect }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {FOOD_CATEGORIES.map((category) => (
      <Card
        key={category.id}
        onClick={() => onSelect(category.id)}
        className={cn(
          "cursor-pointer transition-all hover:shadow-lg",
          selectedValue === category.id && "ring-2 ring-primary"
        )}
      >
        <CardHeader>
          <div className="flex items-center gap-4">
            <category.icon className="w-10 h-10 text-primary" />
            <CardTitle>{category.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>{category.description}</CardDescription>
        </CardContent>
      </Card>
    ))}
  </div>
);