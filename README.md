# Wedding Invitation

This project uses API keys for Naver Map and Kakao services. Example keys are provided in the repository.

## API keys

1. Copy `config.example.js` to `config.js`:
   ```bash
   cp config.example.js config.js
   ```
2. The configuration includes ready-to-use keys:
   ```js
   window.env = {
     NAVER_MAP_API_KEY: "yp02tw24ay",
     KAKAO_API_KEY: "ad9882a7a0abfaffbde309e333d2e43e",
   };
   ```
   If you need to use different keys, edit `config.js` accordingly.
3. For local development, you can also supply the keys via environment variables:
   ```bash
   export NAVER_MAP_API_KEY=yp02tw24ay
   export KAKAO_API_KEY=ad9882a7a0abfaffbde309e333d2e43e
   ```

The application reads the keys from `window.env` or from the environment variables when running under Node.

