![Indonesia Wild Betta](./public/img/banner-api.svg)

<p align="center">
  <img 
    src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white" 
    alt="git"
  />
  <img 
    src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" 
    alt="TypeScript"
  />
  <img 
    src="https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white" 
    alt="bun"
  />
  <img 
    src="https://img.shields.io/badge/hono-%23E36002.svg?style=for-the-badge&logo=hono&logoColor=white" 
    alt="hono"
  />
  <img 
    src="https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white" 
    alt="zod"
  />
  <img 
    src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" 
    alt="docker"
  />
  <img 
      src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" 
      alt="postgres"
    />
  <img 
    src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" 
    alt="prisma"
  />

</p>

# INDONESIA WILDBETTA API

Indonesia has a wealth of beautiful wild betta fish. Their colors are natural and vibrant. Many of them are still unknown to many people. This API contains information about Indonesian wild betta fish, along with photos. I hope this is helpful and that you're interested in Indonesian wild betta fish.

## API Documentations

- Production: [Indonesia Wildbetta API](https://indonesia-wild-betta-api-production.up.railway.app/)

| Endpoint                | HTTP     | Description                 | status |
| ----------------------- | -------- | --------------------------- | ------ |
| `/bettas`               | `GET`    | Get all Bettas              | ✅     |
| `/bettas/{slug}`        | `GET`    | Get Betta by slug           | ✅     |
| `/bettas/id/{id}`       | `GET`    | Get Betta by id             | ✅     |
| `/complex/{compleSlug}` | `GET`    | Get Bettas by complexSlug   | ✅     |
| `/category/{category}`  | `GET`    | Get Bettas by category name | ✅     |
| `/betta`                | `POST`   | Add new Betta               | ✅     |
| `/betta/{id}`           | `DELETE` | Delete Betta by id          | ✅     |
| `/bettas/{id}`          | `PATCH`  | Patch Betta by id           | ✅     |
| `/bettas/{id}`          | `PUT`    | Put Betts by id             | ✅     |

## Tech Stack

| Category      | Technology     | Description                                            |
| ------------- | -------------- | ------------------------------------------------------ |
| Language      | **TypeScript** | Strongly typed JavaScript for better maintainability   |
| Runtime       | **Bun**        | Fast JavaScript runtime for modern backend development |
| Web Framework | **Hono**       | Lightweight and high-performance web framework         |
| Validation    | **Zod**        | Type-safe schema validation                            |
| API Spec      | **OpenAPI**    | Standardized API documentation                         |
| API Docs UI   | **Scalar**     | Clean and modern OpenAPI documentation UI              |
| Database      | **PostgreSQL** | Reliable and scalable relational database              |
| ORM           | **Prisma**     | Type-safe database ORM                                 |
| Deployment    | **Railway**    | Simple cloud deployment and infrastructure             |

## Thanks

Finally, version one of this REST API is complete.

In the next development phase, more betta fish variants may be added — such as **Thai splendens** or other **non–wild betta species** — to expand the dataset and features further.

Thank you to everyone who supported and contributed to this project 🚀
