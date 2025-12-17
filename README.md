![Indonesia Wild Betta API Banner](./public/img/banner-api.svg)

# Indonesia Wild Betta API

Indonesia has a wealth of beautiful wild betta fish. Their colors are natural and vibrant. Many of them are still unknown to many people.

This API contains information about Indonesian wild betta fish, along with photos. I hope this is helpful and that you're interested in Indonesian wild betta fish.

## API Documentations

- Local: `http://localhost:3000`
- Production: `https://indonesiawildbetta.burhanudin.com`

| Endpoint        | HTTP     | Description          | status |
| --------------- | -------- | -------------------- | ------ |
| `/bettas`       | `GET`    | Get all Bettas       | ✅     |
| `/bettas/:slug` | `GET`    | Get Betta by slug    | ✅     |
| `/betta`        | `POST`   | Add new Betta        | ✅     |
| `/betta/:slug`  | `DELETE` | Delete Betts by slug | ✅     |
| `/bettas/{id}`  | `PATCH`  | Patch Betts by name  |        |
| `/bettas/{id}`  | `PUT`    | Update Betts by id   |        |
