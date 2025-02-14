# Node.js 기반 이미지 사용
FROM node:18-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사
COPY package.json yarn.lock ./

# 의존성 설치
RUN yarn install --frozen-lockfile

# 소스 코드 복사
COPY . .

# Nuxt3 애플리케이션 빌드
RUN yarn build

# 최종 이미지 생성
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# .output 디렉토리 복사
COPY --from=builder /app/.output ./.output

# 필요한 포트 노출
EXPOSE 3000

# 애플리케이션 실행
CMD ["node", ".output/server/index.mjs"]