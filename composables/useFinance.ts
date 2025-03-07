import { ref } from 'vue';
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

            const date = m.date instanceof Date ? m.date : new Date(m.date);

            return {
                ...m,
                date: isNaN(date.getTime()) ? new Date() : date,
                imageUrl
            };
        });
    }

    const addMovement = (newMovement: NewMovement) => {
        const date = typeof newMovement.date === 'string'
            ? new Date(newMovement.date)
            : newMovement.date;

        const safeDate = isNaN(date.getTime()) ? new Date() : date;

        const movement: Movement = {
            id: Date.now(),
            name: newMovement.name,
            amount: Number(newMovement.amount),
            date: safeDate,
            type: newMovement.type,
            isRecurrent: newMovement.isRecurrent,
            imageUrl: newMovement.imageUrl && newMovement.imageUrl.startsWith('blob:') ? '' : newMovement.imageUrl
        };

        movements.value = [...movements.value, movement];

        if (isClient) {
            localStorage.setItem('financeMovements', JSON.stringify(movements.value));
        }
    };

    const getAllMovementsWithRecurrences = (startDate: Date, endDate: Date) => {
        if (!startDate || !endDate || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.error('Dates invalides:', { startDate, endDate });
            return [...movements.value];
        }

        try {
            const result: Movement[] = [...movements.value];

            movements.value.forEach(movement => {
                if (movement.isRecurrent) {
                    const originalDate = movement.date instanceof Date
                        ? new Date(movement.date)
                        : new Date(movement.date);

                    if (isNaN(originalDate.getTime())) {
                        console.error('Date invalide pour le mouvement récurrent:', movement);
                        return;
                    }

                    let currentDate = new Date(originalDate);

                    currentDate.setMonth(currentDate.getMonth() + 1);

                    while (currentDate <= endDate) {
                        if (currentDate >= startDate) {
                            const clonedMovement: Movement = {
                                ...movement,
                                id: movement.id + currentDate.getTime(),
                                date: new Date(currentDate),
                                isGeneratedRecurrence: true
                            };
                            result.push(clonedMovement);
                        }

                        currentDate = new Date(currentDate);
                        currentDate.setMonth(currentDate.getMonth() + 1);
                    }
                }
            });

            return result;
        } catch (error) {
            console.error('Erreur lors de la génération des récurrences:', error);
            return [...movements.value];
        }
    };

    const getMonthMovements = (date: Date) => {
        if (!date || isNaN(date.getTime())) {
            console.error('Date invalide:', date);
            return [];
        }

        try {
            const year = date.getFullYear();
            const month = date.getMonth();
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, month + 1, 0);

            const allMovements = getAllMovementsWithRecurrences(startDate, endDate);

            return allMovements.filter(movement => {
                const movementDate = movement.date instanceof Date
                    ? movement.date
                    : new Date(movement.date);

                if (isNaN(movementDate.getTime())) {
                    return false;
                }

                return movementDate.getMonth() === date.getMonth() &&
                    movementDate.getFullYear() === date.getFullYear();
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des mouvements du mois:', error);
            return [];
        }
    };

    const getDayMovements = (date: Date) => {
        if (!date || isNaN(date.getTime())) {
            console.error('Date invalide:', date);
            return [];
        }

        try {
            const sixMonthsLater = new Date(date);
            sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

            const allMovements = getAllMovementsWithRecurrences(date, sixMonthsLater);

            return allMovements.filter(movement => {
                const movementDate = movement.date instanceof Date
                    ? movement.date
                    : new Date(movement.date);

                if (isNaN(movementDate.getTime())) {
                    return false;
                }

                return movementDate.getDate() === date.getDate() &&
                    movementDate.getMonth() === date.getMonth() &&
                    movementDate.getFullYear() === date.getFullYear();
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des mouvements du jour:', error);
            return [];
        }
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
        if (!date || isNaN(date.getTime())) {
            console.error('Date invalide pour getMonthBalance:', date);
            return 0;
        }

        try {
            const monthMovements = getMonthMovements(date);
            return monthMovements.reduce((total, movement) => {
                const amount = movement.type === 'expense'
                    ? -Math.abs(movement.amount)
                    : Math.abs(movement.amount);
                return total + amount;
            }, 0);
        } catch (error) {
            console.error('Erreur lors du calcul du solde mensuel:', error);
            return 0;
        }
    };

    const getIncomeExpenseForMonth = (date: Date) => {
        if (!date || isNaN(date.getTime())) {
            console.error('Date invalide pour getIncomeExpenseForMonth:', date);
            return { income: 0, expense: 0 };
        }

        try {
            const monthMovements = getMonthMovements(date);

            const income = monthMovements
                .filter(m => m.type === 'income')
                .reduce((total, m) => total + Number(m.amount), 0);

            const expense = monthMovements
                .filter(m => m.type === 'expense')
                .reduce((total, m) => total + Number(m.amount), 0);

            return { income, expense };
        } catch (error) {
            console.error('Erreur lors du calcul des revenus et dépenses:', error);
            return { income: 0, expense: 0 };
        }
    };

    return {
        movements,
        addMovement,
        getMonthMovements,
        getDayMovements,
        getTotalBalance,
        getMonthBalance,
        getIncomeExpenseForMonth
    };
}