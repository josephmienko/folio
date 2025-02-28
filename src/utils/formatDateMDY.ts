// src/utils/formatDateMDY.ts

export function formatDateMDY(dateString: string): string {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date string received: ${dateString}`);
      return "Invalid Date";
    }
  
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }
  