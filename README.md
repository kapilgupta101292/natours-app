# natours-app



## Deleting complete Data
```js
    node dev-data/data/import-dev-data.js --delete
```


## Importing Sample Data
```js
    node dev-data/data/import-dev-data.js --import
```

API's have support for filtering, sorting and selecting specific fields.


### Selecting

Example-1
```js
curl --location --request GET 'localhost:3000/api/v1/tours?fields=-name,-duration,-price'
```

### Pagination
Limit -> number of results per page
Page -> page number

```js
curl --location --request GET 'localhost:3000/api/v1/tours?limit=3&page=3'
```