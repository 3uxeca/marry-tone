# MarryTone

MarryTone monorepo (Phase 0 baseline).

## Ports

- Web: `3003` (fixed)
- API: `4000`
- ML Sidecar: `8000`
- MySQL: `3306`
- Redis: `6379`
- MinIO Console: `9001`

## Local Run (Recommended)

1. Prepare env

```bash
cd /Users/dasha/Desktop/code/merry-tone
cp .env.example .env
```

2. Start infra with Docker

```bash
docker compose up -d mysql redis minio
```

3. Install Node dependencies

```bash
pnpm install
```

4. Run API and Web (separate terminals)

```bash
pnpm --filter @marrytone/api start:dev
```

```bash
pnpm --filter @marrytone/web dev
```

5. Run ML sidecar (separate terminal)

```bash
cd services/ml
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## Health Checks

```bash
curl -f http://localhost:4000/health
curl -f http://localhost:4000/internal/ml/health
curl -f http://localhost:8000/health
curl -f http://localhost:3003
```

## Optional: Full Docker Compose

```bash
docker compose up -d --build
```

