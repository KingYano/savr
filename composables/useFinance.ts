import type { Movement, NewMovement } from '~/types/finance';

export function useFinance() {
    const isClient = process.client;

    const storedMovements = isClient
        ? localStorage.getItem('financeMovements')
        : null;

    const movements = ref<Movement[]>(
        isClient && storedMovements ? JSON.parse(storedMovements) : []
    );

    if (isClient && movements.value.length > 0) {
        movements.value = movements.value.map(m => {
            const imageUrl = m.imageUrl && m.imageUrl.startsWith('blob:')
                ? ''
                : m.imageUrl;

            return {
                ...m,
                date: new Date(m.date),
                imageUrl
            };
        });
    }

    const addMovement = (newMovement: NewMovement) => {
        const movement: Movement = {
            id: Date.now(),
            name: newMovement.name,
            amount: Number(newMovement.amount),
            date: typeof newMovement.date === 'string' ? new Date(newMovement.date) : newMovement.date,
            type: newMovement.type,
            isRecurrent: newMovement.isRecurrent,
            imageUrl: newMovement.imageUrl && newMovement.imageUrl.startsWith('blob:') ? '' : newMovement.imageUrl
        };

        movements.value.push(movement);

        if (isClient) {
            localStorage.setItem('financeMovements', JSON.stringify(movements.value));
        }
    };

    const getMonthMovements = (date: Date) => {
        return movements.value.filter(movement => {
            const movementDate = new Date(movement.date);
            return movementDate.getMonth() === date.getMonth() &&
                movementDate.getFullYear() === date.getFullYear();
        });
    };

    const getTotalBalance = () => {
        return movements.value.reduce((total, movement) => {
            const amount = movement.type === 'expense'
                ? -Math.abs(movement.amount)
                : Math.abs(movement.amount);
            return total + amount;
        }, 0);
    };

    const getMonthBalance = (date: Date) => {
        const monthMovements = getMonthMovements(date);
        return monthMovements.reduce((total, movement) => {
            const amount = movement.type === 'expense'
                ? -Math.abs(movement.amount)
                : Math.abs(movement.amount);
            return total + amount;
        }, 0);
    };

    const getIncomeExpenseForMonth = (date: Date) => {
        const monthMovements = getMonthMovements(date);

        const income = monthMovements
            .filter(m => m.type === 'income')
            .reduce((total, m) => total + Number(m.amount), 0);

        const expense = monthMovements
            .filter(m => m.type === 'expense')
            .reduce((total, m) => total + Number(m.amount), 0);

        return { income, expense };
    };

    return {
        movements,
        addMovement,
        getMonthMovements,
        getTotalBalance,
        getMonthBalance,
        getIncomeExpenseForMonth
    };
}