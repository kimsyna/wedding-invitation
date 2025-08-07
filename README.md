# Wedding Invitation

This project uses API keys for Naver Map and Kakao services. The keys are not committed to version control.

## API keys

1. Copy `config.example.js` to `config.js`:
   ```bash
   cp config.example.js config.js
   ```
2. Edit `config.js` and replace the placeholders with your real keys:
   ```js
   window.env = {
     NAVER_MAP_API_KEY: "your-naver-map-api-key",
     KAKAO_API_KEY: "your-kakao-api-key",
   };
   ```
3. For automated tests or local development, you can also supply the keys via environment variables:
   ```bash
   export NAVER_MAP_API_KEY=your-naver-map-api-key
   export KAKAO_API_KEY=your-kakao-api-key
   ```

The application reads the keys from `window.env` or from the environment variables when running under Node.

## Tests

Run all tests with:

```bash
npm test
```
