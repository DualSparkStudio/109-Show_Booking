export const formatCurrency = (cents: number, currency = 'usd'): string => {
  const value = cents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(value);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDateTime = (dateString: string): string => {
  return `${formatDate(dateString)} at ${formatTime(dateString)}`;
};

export const calculateRemainingSeats = (total: number, sold: number): number => {
  return Math.max(0, total - sold);
};

export const getRemainingPercentage = (total: number, sold: number): number => {
  if (total === 0) return 0;
  return Math.round(((total - sold) / total) * 100);
};
