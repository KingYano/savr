export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
};

export const formatDate = (date?: Date): string => {
    if (!date) return '';
    return date.toLocaleDateString('fr-FR');
};

export const formatMonthYear = (date?: Date): string => {
    if (!date) return '';
    return date.toLocaleDateString('fr-FR', {
        month: 'long',
        year: 'numeric'
    });
};

export const formatFullDate = (date?: Date): string => {
    if (!date) return '';
    return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};