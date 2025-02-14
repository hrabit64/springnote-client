# Node.js 18 기반 경량 이미지 사용
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 미리 빌드된 결과물을 복사 (.output 폴더)
COPY .output ./.output

# 애플리케이션이 사용하는 포트 노출
EXPOSE 3000

# 애플리케이션 실행 (Nuxt3 서버)
CMD ["node", ".output/server/index.mjs"]
