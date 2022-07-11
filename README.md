# speerBackEnd
 
## Getting Started
Assuming you’ve already installed Node.js.

To setup you need to install it globally first:
```
$npm install
```
Afer that, you must create table in your mysql server.

Then, you need to create ```.env``` file, follow:

```
DB_HOST = *database host*
DB_USER = *database user*
DB_PASSWORD = *database password*
DB_DATABASE = *database name*
DB_PORT = *database port*
PORT = *server port* 
```
Run ``` db-migrate up ``` setup database table.

Use ```npm run dev``` start servre.

## API Documentation

### Registration
```
POST /api/user/
```
With the following parameters:
| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `username`     | string   | required   | The username we will use for login. |
| `password`         | string   | required   | The password we will use for login.|


### Login
```
POST /api/user/login

```
With the following parameters:
| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `username`     | string   | required   | The username we will use for login. |
| `password`         | string   | required   | The password we will use for login.|



### Add balance
This API must login before using
```
POST /api/user/addBalance
```
With the following parameters:
| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `username`     | string   | required   | The username we will use for login. |
| `password`         | string   | required   | The password we will use for login.|



### Create Tweet
This API must login before using
```
POST /api/tweet/
```
With the following parameters:
| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `content`     | string   | required   | The content use want to post. |

### Read All Tweet
```
GET /api/tweet/
```

### Update Tweet
This API must login before using
```
PUT /api/tweet/{{tweet id}}
```
With the following parameters:
| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `content`     | string   | required   | The content use want to update. |

### Update Tweet
This API must login before using
```
DELETE /api/tweet/{{tweet id}}
```

### Like/unlike Tweet
This API must login before using
```
PUT /api/tweet/like/{{tweet id}}
```

### Buy stock
This API must login before using
```
POST /api/stock/buy
```
With the following parameters:
| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `instrument`     | string   | required   |  Instrument user order with. |
| `share`     | string   | required   | Share of the instrument user want to order. |
| `trade_price`     | string   | required   | Current trading price. |



### Sell stock
This API must login before using
```
DELETE /api/stock/buy
```
With the following parameters:
| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `instrument`     | string   | required   |  Instrument user sell with. |
| `share`     | string   | required   | Share of the instrument user want to sell. |
| `trade_price`     | string   | required   | Current trading price. |

### Portfolio
This API must login before using
```
GET /api/stock/
```
