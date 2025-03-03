export interface Movement {
    id: number;
    name: string;
    amount: number;
    date: string;
    type: 'expense' | 'income';
    isRecurrent: boolean;
}

export interface NewMovement {
    name: string;
    amount: string;
    date: string;
    type: 'expense' | 'income';
    recurrenceType: 'none' | 'monthly' | 'split';
    splitMonths: number;
}

export interface BalanceProps {
    movements: Movement[];
    selectedMonth: Date;
    isDarkMode: boolean;
}

export interface CalendarProps {
    movements: Movement[];
    selectedDate: Date;
    currentMonth: Date;
    isDarkMode: boolean;
}

export interface MovementsListProps {
    movements: Movement[];
    selectedDate: Date;
    isDarkMode: boolean;
}

export interface AddMovementDialogProps {
    isOpen: boolean;
    isDarkMode: boolean;
}