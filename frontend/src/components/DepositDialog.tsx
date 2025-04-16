
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"

interface DepositDialogProps {
  open: boolean;
  onClose: () => void;
  onDeposit: (amount: number) => void;
}

export const DepositDialog: React.FC<DepositDialogProps> = ({ open, onClose, onDeposit }) => {
  const [depositAmount, setDepositAmount] = useState('');

  const handleConfirmDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      onDeposit(amount);
      setDepositAmount('');
    } else {
      alert('Please enter a valid deposit amount.');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogTitle>Deposit Funds</AlertDialogTitle>
        <AlertDialogDescription>
          Enter the amount you would like to deposit into your account.
        </AlertDialogDescription>
        <Input
          type="number"
          placeholder="Amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          className="mt-4"
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDeposit}>Confirm</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
