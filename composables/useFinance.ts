import type { Movement, NewMovement } from '~/types/finance';

export const useFinance = () => {
    const movements = ref<Movement[]>([]);
    const defaultDate = new Date();
    const currentMonth = ref(defaultDate);
    const selectedDate = ref(defaultDate);

    const addMovement = (newMovement: NewMovement) => {
        const baseAmount = newMovement.type === 'expense'
            ? -Math.abs(parseFloat(newMovement.amount))
            : Math.abs(parseFloat(newMovement.amount));

        if (newMovement.recurrenceType === 'split') {
            // Calcul du montant par mois pour le paiement échelonné
            const monthlyAmount = baseAmount / newMovement.splitMonths;
            const startDate = new Date(newMovement.date);

            // Création des mouvements pour chaque mois
            for (let i = 0; i < newMovement.splitMonths; i++) {
                const paymentDate = new Date(startDate);
                paymentDate.setMonth(startDate.getMonth() + i);

                const movement: Movement = {
                    id: Date.now() + i,
                    name: `${newMovement.name} (${i + 1}/${newMovement.splitMonths})`,
                    amount: monthlyAmount,
                    date: paymentDate.toISOString().split('T')[0],
                    type: newMovement.type,
                    isRecurrent: false,
                };

                movements.value.push(movement);
            }
        } else {
            const movement: Movement = {
                id: Date.now(),
                name: newMovement.name,
                amount: baseAmount,
                date: newMovement.date,
                type: newMovement.type,
                isRecurrent: newMovement.recurrenceType === 'monthly',
            };

            movements.value.push(movement);
        }
    };

    const getMovementsForDate = (date: Date | null): Movement[] => {
        if (!date) return [];
        return movements.value.filter(movement => {
            const movementDate = new Date(movement.date);
            return movementDate.toDateString() === date.toDateString();
        });
    };

    const getMonthBalance = (date: Date): number => {
        if (!date) return 0;
        const year = date.getFullYear();
        const month = date.getMonth();

        return movements.value
            .filter(movement => {
                const movementDate = new Date(movement.date);
                return movementDate.getFullYear() === year &&
                    movementDate.getMonth() === month;
            })
            .reduce((acc, movement) => acc + movement.amount, 0);
    };

    return {
        movements,
        currentMonth,
        selectedDate,
        addMovement,
        getMovementsForDate,
        getMonthBalance
    };
};