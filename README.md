# Sam AI

A simple web chatbot. Frontend in `public/index.html`, backend API key handled
safely by the serverless function in `api/chat.js`.

## Deploy (GitHub + Vercel, both free)

### 1. Push this folder to GitHub
1. Create a new repository on https://github.com/new (e.g. `sam-ai-chat`)
2. In this folder, run:
   ```
   git init
   git add .
   git commit -m "Sam AI chatbot"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sam-ai-chat.git
   git push -u origin main
   ```

### 2. Deploy on Vercel
1. Go to https://vercel.com and sign up/log in with your GitHub account
2. Click **Add New → Project**
3. Select your `sam-ai-chat` repository and click **Import**
4. Before deploying, open **Environment Variables** and add:
   - Name: `OPENROUTER_API_KEY`
   - Value: your key from https://openrouter.ai/keys
5. Click **Deploy**

After a minute, Vercel gives you a live URL like `sam-ai-chat.vercel.app`.
Anyone can open that link in a normal browser — no API key needed on their
end.

### Updating later
Any time you push new commits to the `main` branch on GitHub, Vercel
automatically redeploys the site.

## Notes
- The API key lives only in Vercel's environment variables (server-side) —
  it's never sent to visitors' browsers.
- Each visitor's chat history is saved in their own browser (`localStorage`),
  not shared between people.
- Model used: `openai/gpt-4o-mini` via OpenRouter — you can swap this for any
  model id listed at https://openrouter.ai/models (edit the `model` line in
  `api/chat.js`).
- OpenRouter charges per model based on the credits in your account; some
  models on their list are free.
