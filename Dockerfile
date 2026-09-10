FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM python:3.11-slim
WORKDIR /app
COPY backend/requirements.txt backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt
COPY --from=frontend-builder /app/dist ./dist
COPY . .
ENV PORT=8000
EXPOSE 8000
CMD ["sh", "-c", "python backend/run_server.py --host 0.0.0.0 --port ${PORT:-8000}"]
