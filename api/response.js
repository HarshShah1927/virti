const recipient = 'harshmumbai1927@gmail.com';
const allowedPlaces = new Set(['Coffee', 'Dinner', 'Movie', 'Long drive', 'Surprise me']);

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

function isRealDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day;
}

function todayInIndia() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);

    const length = Number(request.headers.get('content-length') || 0);
    if (length > 4000) return json({ error: 'Request is too large.' }, 413);

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ error: 'Please choose a date, time, and activity.' }, 400);
    }

    // Quietly accept bot submissions without sending them.
    if (typeof payload.website === 'string' && payload.website.trim()) return json({ ok: true });

    const { date, time, place } = payload && typeof payload === 'object' ? payload : {};
    const validTime = typeof time === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
    const validPlace = typeof place === 'string' && place.length <= 100 && (allowedPlaces.has(place) || (place.startsWith('Custom: ') && place.slice(8).trim().length > 0));

    if (!isRealDate(date) || date < todayInIndia() || !validTime || !validPlace) {
      return json({ error: 'Please choose a valid future date, time, and activity.' }, 400);
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;
    if (!apiKey || !from) return json({ error: 'Email delivery is not configured yet.' }, 503);

    const formattedDate = new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', {
      timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
    const [hours, minutes] = time.split(':').map(Number);
    const formattedTime = new Date(Date.UTC(2000, 0, 1, hours, minutes)).toLocaleTimeString('en-US', {
      timeZone: 'UTC', hour: 'numeric', minute: '2-digit',
    });
    const activity = place.startsWith('Custom: ') ? place.slice(8).trim() : place;

    try {
      const delivery = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: [recipient],
          subject: 'Virti said yes! ❤️',
          text: `Virti said yes to a date!\n\nDate: ${formattedDate}\nTime: ${formattedTime}\nPlan: ${activity}\n\nSent from your date invitation.`,
        }),
      });

      if (!delivery.ok) {
        console.error('Email provider rejected the response:', delivery.status);
        return json({ error: 'The email could not be delivered. Please try again later.' }, 502);
      }
      return json({ ok: true });
    } catch (error) {
      console.error('Email provider request failed:', error);
      return json({ error: 'The email service could not be reached. Please try again later.' }, 502);
    }
  },
};
