export async function GET() {
  const currentDate = new Date();
  
  const response = {
    timestamp: currentDate.getTime(), // Unix timestamp in milliseconds
    iso: currentDate.toISOString(), // ISO format with milliseconds
    formatted: currentDate.toLocaleString('en-US', {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3
    })
  };

  return Response.json(response);
}