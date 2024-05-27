
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button, ButtonProps } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface TooltipComponentProps  extends ButtonProps {
  icon: LucideIcon;
  message: string;
  disabled?: boolean;
  onClick?:() => void;
  className?: string;
}

const TooltipComponent: React.FC<TooltipComponentProps> = ({ icon: Icon, message, onClick ,disabled = false, className,...props }) => {
  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={onClick} disabled={disabled} className={`rounded-lg ${className}`} {...props}>
          <Icon className="h-4 w-4" />
          <span className="sr-only">{message}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{message}</p>
      </TooltipContent>
    </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipComponent;