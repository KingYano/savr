export interface Movement {
    id: number;
    name: string;
    amount: number;
    date: Date;
    type: "expense" | "income";
    isRecurrent: boolean;
    imageUrl?: string;
    isGeneratedRecurrence?: boolean;
    categoryId?: string;
    tags?: string[];
    description?: string;
}

export interface NewMovement {
    name: string;
    amount: number;
    date: string | Date;
    type: "expense" | "income";
    isRecurrent: boolean;
    imageUrl?: string;
    categoryId?: string;
    tags?: string[];
    description?: string;
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