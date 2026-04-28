export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { messages, system } = req.body;
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: system || 'You are a helpful assistant.',
        messages: messages
      })
    });
    const data = await response.json();
    console.log('API response:', JSON.stringify(data));
    const text = data?.content?.[0]?.text || 'No response received';
    return res.status(200).json({ text });
  } catch (e) {
    console.error('Error:', e);
    return res.status(500).json({ error: e.message, text: 'Error: ' + e.message });
  }
}
