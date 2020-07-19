## 安装

### 使用 Docker

```shell
docker run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 \
  -p 5775:5775/udp \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 14268:14268 \
  -p 14250:14250 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.18
```

访问: http://localhost:16686 https://16686.preview.lowcode.com

> docker ps -a

### 服务介绍

| Port  | Protocol | Component | Function                                          |
| ----- | -------- | --------- | ------------------------------------------------- |
| 5775  | UDP      | agent     | accept zipkin.thrift over compact thrift protocol |
| 6831  | UDP      | agent     | accept jaeger.thrift over compact thrift protocol |
| 6832  | UDP      | agent     | accept jaeger.thrift over binary thrift protocol  |
| 5778  | HTTP     | agent     | serve configs                                     |
| 16686 | HTTP     | query     | serve frontend                                    |
| 14268 | HTTP     | collector | accept jaeger.thrift directly from clients        |
| 14250 | HTTP     | collector | accept model.proto                                |
| 9411  | HTTP     | collector | Zipkin compatible endpoint (optional)             |

## 使用

### 采样率 sampler

- const 常量: 0 关闭采样 1 全部采样
- probabilistic 概率采样
- rateLimiting 每秒采样率上限
- remote 遵循远程设置
