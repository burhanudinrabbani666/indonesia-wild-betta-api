![Indonesia Wild Betta API Banner](./public/img/banner-api.svg)

# Indonesia Wild Betta API

Indonesia has a wealth of beautiful wild betta fish. Their colors are natural and vibrant. Many of them are still unknown to many people.

This API contains information about Indonesian wild betta fish, along with photos. I hope this is helpful and that you're interested in Indonesian wild betta fish.

## API Documentations

- Local: `http://localhost:3000`
- Production: `https://indonesiawildbetta.burhanudin.com`

| Endpoint        | HTTP     | Description          | status |
| --------------- | -------- | -------------------- | ------ |
| `/bettas`       | `GET`    | Get all bettas       | ✅     |
| `/bettas/:slug` | `GET`    | Get betta by slug    | ✅     |
| `/bettas`       | `POST`   | Add new betta        | ✅     |
| `/bettas/:slug` | `DELETE` | Delete betta by slug | ✅     |
| `/bettas/{id}`  | `PATCH`  | Patch betta by name  |        |
| `/bettas/{id}`  | `PUT`    | Update betta by id   |        |
