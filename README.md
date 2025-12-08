![Indonesia Wild Betta API Banner](./public/img/banner-api.svg)

# Indonesia Wild Betta API

Indonesia has a wealth of beautiful wild betta fish. Their colors are natural and vibrant. Many of them are still unknown to many people.

This API contains information about Indonesian wild betta fish, along with photos. I hope this is helpful and that you're interested in Indonesian wild betta fish.

## API Documentations

- Local: `http://localhost:3000` (common default)
- Production: `https://indonesiawildbetta.burhanudin.com`

| Endpoint       | HTTP     | Description       | status |
| -------------- | -------- | ----------------- | ------ |
| `/items`       | `GET`    | Get all items     | ✅     |
| `/items/:slug` | `GET`    | Get item by slug  | ✅     |
| `/items`       | `POST`   | Add new item      | ✅     |
| `/items`       | `DELETE` | Delete all items  |        |
| `/items/{id}`  | `PATCH`  | Patch item by id  |        |
| `/items/{id}`  | `PUT`    | Update item by id |        |
